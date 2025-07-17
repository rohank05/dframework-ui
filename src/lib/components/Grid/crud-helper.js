import actionsStateProvider from "../useRouter/actions";
import { transport, HTTP_STATUS_CODES } from "./httpRequest";

const dateDataTypes = ['date', 'dateTime'];
const lookupDataTypes = ['singleSelect'];
const timeInterval = 200;

const isLocalTime = (dateValue) => new Date().getTimezoneOffset() === new Date(dateValue).getTimezoneOffset();

/**
 * Handles common HTTP error responses such as session expiration and forbidden access.
 * If an error is detected, sets an appropriate error message and redirects the user after a delay.
 * Returns true if a common error was handled, otherwise false.
 * 
 * @param {Object} response - The HTTP response object containing the status code.
 * @param {Function} setError - Callback function to set the error message.
 * @returns {boolean} Returns true if a common error was handled and a redirect is triggered, otherwise false.
 */
const handleCommonErrors = (response, setError) => {
    if (response.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
        setError('Session Expired!');
        setTimeout(() => {
            window.location.href = '/';
        }, timeInterval);
        return true;
    } else if (response.status === HTTP_STATUS_CODES.FORBIDDEN) {
        setError('Access Denied!');
        setTimeout(() => {
            window.location.href = '/';
        }, timeInterval);
        return true;
    } else if (response.status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
        setError('Internal Server Error');
    }
    return false;
};

function shouldApplyFilter(filter) {
    const { operator, value, type } = filter;

    const isUnaryOperator = ["isEmpty", "isNotEmpty"].includes(operator);
    const hasValidValue = value !== undefined &&
        value !== null &&
        (value !== '' || (type === 'number' && value === 0) || (type === 'boolean' && value === false));

    return isUnaryOperator || hasValidValue;
}

const getList = async ({ gridColumns, setIsLoading, setData, page, pageSize, sortModel, filterModel, api, parentFilters, action = 'list', setError, extraParams, contentType, columns, controllerType = 'node', template = null, configFileName = null, dispatchData, showFullScreenLoader = false, model, baseFilters = null, isElasticExport }) => {
    if (!contentType) {
        if (showFullScreenLoader) {
            dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: true });
        }
    }

    const lookups = [];
    const dateColumns = [];
    gridColumns.forEach(({ lookup, type, field, keepLocal = false, keepLocalDate, filterable = true }) => {
        if (dateDataTypes.includes(type)) {
            dateColumns.push({ field, keepLocal, keepLocalDate });
        }
        if (!lookup) {
            return;
        }
        if (!lookups.includes(lookup) && lookupDataTypes.includes(type) && filterable) {
            lookups.push(lookup);
        }
    });

    const where = [];
    if (filterModel?.items?.length) {
        filterModel.items.forEach(filter => {
            if (shouldApplyFilter(filter)) {
                const { field, operator, filterField } = filter;
                let { value } = filter;
                const column = gridColumns.filter((item) => item?.field === filter.field);
                const type = column[0]?.type;
                if (type === 'boolean') {
                    value = (value === 'true' || value === true) ? 1 : 0;
                } else if (type === 'number') {
                    value = Array.isArray(value) ? value.filter(e => e) : value;
                }
                value = filter.filterValues || value;
                where.push({
                    field: filterField || field,
                    operator,
                    value,
                    type
                });
            }
        });
    }
    if (parentFilters) {
        where.push(...parentFilters);
    }

    if (baseFilters) {
        where.push(...baseFilters);
    }
    const requestData = {
        start: page * pageSize,
        limit: isElasticExport ? model.exportSize : pageSize,
        ...extraParams,
        logicalOperator: filterModel.logicOperator,
        sort: sortModel.map(sort => (sort.filterField || sort.field) + ' ' + sort.sort).join(','),
        where,
        isElasticExport,
        model: model.module,
        fileName: model.overrideFileName
    };

    if (lookups) {
        requestData.lookups = lookups.join(',');
    }

    if (model?.limitToSurveyed) {
        requestData.limitToSurveyed = model?.limitToSurveyed;
    }

    const headers = {};
    let url = controllerType === 'cs' ? `${api}?action=${action}&asArray=0` : `${api}/${action}`;

    if (template !== null) {
        url += `&template=${template}`;
    }
    if (configFileName !== null) {
        url += `&configFileName=${configFileName}`;
    }
    if (contentType) {
        const form = document.createElement("form");
        requestData.responseType = contentType;
        requestData.columns = columns;
        form.setAttribute("method", "POST");
        form.setAttribute("id", "exportForm");
        form.setAttribute("target", "_blank");
        if (template === null) {
            for (const key in requestData) {
                let v = requestData[key];
                if (v === undefined || v === null) {
                    continue;
                } else if (typeof v !== 'string') {
                    v = JSON.stringify(v);
                }
                const hiddenTag = document.createElement('input');
                hiddenTag.type = "hidden";
                hiddenTag.name = key;
                hiddenTag.value = v;
                form.append(hiddenTag);
            }
        }
        form.setAttribute('action', url);
        document.body.appendChild(form);
        form.submit();
        setTimeout(() => {
            document.getElementById("exportForm").remove();
        }, 3000);
        return;
    }
    try {
        setIsLoading(true);
        const params = {
            url,
            method: 'POST',
            data: requestData,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            credentials: 'include'
        };
        setData(prevData => ({
            ...prevData,
            records: [] // reset records to empty array before fetching new data
        }));
        const response = await transport(params);
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { records } = response.data;
            if (records) {
                records.forEach(record => {
                    dateColumns.forEach(column => {
                        const { field, keepLocal, keepLocalDate } = column;
                        if (record[field]) {
                            record[field] = new Date(record[field]);
                            if (keepLocalDate) {
                                const userTimezoneOffset = record[field].getTimezoneOffset() * 60000;
                                record[field] = new Date(record[field].getTime() + userTimezoneOffset);
                            }
                            if (keepLocal && !isLocalTime(record[field])) {
                                const userTimezoneOffset = record[field].getTimezoneOffset() * 60000;
                                record[field] = new Date(record[field].getTime() + userTimezoneOffset);
                            }
                        }
                    });
                    model.columns.forEach(({ field, displayIndex }) => {
                        if (!displayIndex) return;
                        record[field] = record[displayIndex];
                    });
                });
            }
            setData(response.data);
        } else if (!handleCommonErrors(response, setError)) {
            setError(response.statusText);
        }
    } catch (error) {
        if (error.response && !handleCommonErrors(error.response, setError)) {
            setError('Could not list record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
        if (!contentType && showFullScreenLoader) {
            dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: false });
        }
    }
};

const getRecord = async ({ api, id, setIsLoading, setActiveRecord, model, parentFilters, where = {}, setError }) => {
    api = api || model.api;
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    const url = `${api}/${id === undefined || id === null ? '-' : id}`;
    const lookupsToFetch = [];
    const fields = model.formDef || model.columns;
    fields?.forEach(field => {
        if (field.lookup && !lookupsToFetch.includes(field.lookup) && !([null, 0].includes(id) && field.parentComboField)) {
            lookupsToFetch.push(field.lookup);
        }
    });
    searchParams.set("lookups", lookupsToFetch);
    if (where && Object.keys(where)?.length) {
        searchParams.set("where", JSON.stringify(where));
    }
    try {
        const response = await transport({
            url: `${url}?${searchParams.toString()}`,
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { data: record, lookups } = response.data;
            let title = record[model.linkColumn];
            const columnConfig = model.columns.find(a => a.field === model.linkColumn);
            if (columnConfig && columnConfig.lookup) {
                if (lookups && lookups[columnConfig.lookup] && lookups[columnConfig.lookup]?.length) {
                    const lookupValue = lookups[columnConfig.lookup].find(a => a.value === title);
                    if (lookupValue) {
                        title = lookupValue.label;
                    }
                }
            }
            const defaultValues = { ...model.defaultValues };
            setActiveRecord({ id, title: title, record: { ...defaultValues, ...record, ...parentFilters }, lookups });
        } else if (!handleCommonErrors(response, setError)) {
            setError('Could not load record', response.body.toString());
        }
    } catch (error) {
        if (error.response && handleCommonErrors(error.response, setError)) {
            setError('Could not load record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }
};

const deleteRecord = async function ({ id, api, setIsLoading, setError }) {
    const result = { success: false, error: '' };
    if (!id) {
        setError('Deleted failed. No active record.');
        return;
    }
    setIsLoading(true);
    try {
        const response = await transport({
            url: `${api}/${id}`,
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            if (response.data && !response.data.success) {
                result.success = false;
                setError('Delete failed', response.data.message);
                return false;
            }
            result.success = true;
            return true;
        } else if (!handleCommonErrors(response, setError)) {
            setError('Delete failed', response.body);
        }
    } catch (error) {
        if (error.response && !handleCommonErrors(error.response, setError)) {
            setError('Could not delete record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }
    return result;
};

const saveRecord = async function ({ id, api, values, setIsLoading, setError }) {
    let url, method;

    if (id !== 0) {
        url = `${api}/${id}`;
        method = 'PUT';
    } else {
        url = api;
        method = 'POST';
    }


    try {
        setIsLoading(true);
        const response = await transport({
            url,
            method,
            data: values,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const data = response.data;
            if (data.success) {
                return data;
            }
            setError('Save failed', data.err || data.message);
        } else if (!handleCommonErrors(response, setError)) {
            setError('Save failed', response.body);
        }
    } catch (error) {
        if (error.response && !handleCommonErrors(error.response, setError)) {
            setError('Could not save record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }

    return false;
};

const getLookups = async ({ api, setIsLoading, setActiveRecord, model, setError, lookups, scopeId }) => {
    api = api || model.api;
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    const url = `${api}/lookups`;
    searchParams.set("lookups", lookups);
    searchParams.set("scopeId", scopeId);
    try {
        const response = await transport({
            url: `${url}?${searchParams.toString()}`,
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            setActiveRecord(response.data);
        } else if (!handleCommonErrors(response, setError)) {
            setError('Could not load lookups', response.statusText);
        }
    } catch (error) {
        if (error.response && !handleCommonErrors(error.response, setError)) {
            setError('Could not load lookups', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }
};
export {
    getList,
    getRecord,
    deleteRecord,
    saveRecord,
    getLookups
};
