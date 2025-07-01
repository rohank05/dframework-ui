import actionsStateProvider from "../useRouter/actions";
import { transport, HTTP_STATUS_CODES } from "./httpRequest";

const dateDataTypes = ['date', 'dateTime'];
const lookupDataTypes = ['singleSelect']
const timeInterval = 200;

const getList = async ({ gridColumns, setIsLoading, setData, page, pageSize, sortModel, filterModel, api, parentFilters, action = 'list', setError, extraParams, contentType, columns, controllerType = 'node', template = null, configFileName = null, dispatchData, showFullScreenLoader = false, modelConfig = null, baseFilters = null, isElasticExport, model }) => {
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
            if (["isEmpty", "isNotEmpty"].includes(filter.operator) || filter.value || (filter.value === false && filter.type === 'boolean')) {
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
        limit: isElasticExport ? modelConfig.exportSize : pageSize,
        ...extraParams,
        logicalOperator: filterModel.logicOperator,
        sort: sortModel.map(sort => (sort.filterField || sort.field) + ' ' + sort.sort).join(','),
        where,
        isElasticExport,
        model: model.module,
        fileName: modelConfig.overrideFileName
    };

    if (lookups) {
        requestData.lookups = lookups.join(',');
    }

    if (modelConfig?.limitToSurveyed) {
        requestData.limitToSurveyed = modelConfig?.limitToSurveyed
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
        form.setAttribute("target", "_blank")
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
        }, 3000)
        return;
    }
    try {
        setIsLoading(true);
        let params = {
            url,
            method: 'POST',
            data: requestData,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            credentials: 'include'
        };

        const response = await transport(params);
        function isLocalTime(dateValue) {
            const date = new Date(dateValue);
            const localOffset = new Date().getTimezoneOffset();
            const dateOffset = date.getTimezoneOffset();
            return localOffset === dateOffset;
        }
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { records, userCurrencySymbol } = response.data;
            if (records) {
                records.forEach(record => {
                    if (record.hasOwnProperty("TotalOrder")) {
                        record["TotalOrder"] = `${userCurrencySymbol}${record["TotalOrder"]}`;
                    }
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
                    modelConfig.columns.forEach(({ field, displayIndex }) => {
                        if (!displayIndex) return;
                        record[field] = record[displayIndex];
                    });
                });
            }
            setData(response.data);
        } else {
            setError(response.statusText);
        }
    } catch (error) {
        switch (error.response?.status) {
            case HTTP_STATUS_CODES.SESSION_EXPIRED:
                setError('Session Expired!');
                setTimeout(() => {
                    window.location.href = '/';
                }, timeInterval);
                break;
            case HTTP_STATUS_CODES.FORBIDDEN:
                window.location.href = '/';
                break;
            default:
                setError('Could not list record', error.message || error.toString());
                break;
        }
    } finally {
        setIsLoading(false);
        if (!contentType && showFullScreenLoader) {
            dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: false });
        }
    }
};

const getRecord = async ({ api, id, setIsLoading, setActiveRecord, modelConfig, parentFilters, where = {}, setError }) => {
    api = api || modelConfig.api;
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    const url = `${api}/${id === undefined || id === null ? '-' : id}`;
    const lookupsToFetch = [];
    const fields = modelConfig.formDef || modelConfig.columns;
    fields?.forEach(field => {
        if (field.lookup && !lookupsToFetch.includes(field.lookup) && !([null, 0].includes(id) && field.parentComboField)) {
            lookupsToFetch.push(field.lookup);
        }
    });
    searchParams.set("lookups", lookupsToFetch);
    if (where && Object.keys(where)?.length) {
        searchParams.set("where", JSON.stringify(where));
    };
    try {
        const response = await transport({
            url: `${url}?${searchParams.toString()}`,
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { data: record, lookups } = response.data;
            let title = record[modelConfig.linkColumn];
            const columnConfig = modelConfig.columns.find(a => a.field === modelConfig.linkColumn);
            if (columnConfig && columnConfig.lookup) {
                if (lookups && lookups[columnConfig.lookup] && lookups[columnConfig.lookup]?.length) {
                    const lookupValue = lookups[columnConfig.lookup].find(a => a.value === title);
                    if (lookupValue) {
                        title = lookupValue.label;
                    }
                }
            }
            const defaultValues = { ...modelConfig.defaultValues };

            setActiveRecord({ id, title: title, record: { ...defaultValues, ...record, ...parentFilters }, lookups });
        }
        else {
            setError('Could not load record', response.body.toString());
        }
    } catch (error) {
        // Handle 401 specifically in the error block
        if (error.response && error.response.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
            setError('Session Expired!');
            setTimeout(() => {
                window.location.href = '/';
            }, timeInterval);
        }
        else {
            setError('Could not load record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }
};

const deleteRecord = async function ({ id, api, setIsLoading, setError, setErrorMessage }) {
    let result = { success: false, error: '' };
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
        } else {
            setError('Delete failed', response.body);
        }
    } catch (error) {
        if (error.response?.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
            setError('Session Expired!');
            setTimeout(() => {
                window.location.href = '/';
            }, timeInterval);
        } else {
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
        } else {
            setError('Save failed', response.body);
        }
    } catch (error) {
        if (error.response && error.response.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
            setError('Session Expired!');
            setTimeout(() => {
                window.location.href = '/';
            }, timeInterval);
        } else {

            setError('Could not save record', error.message || error.toString());
        }
    } finally {
        setIsLoading(false);
    }

    return false;
};

const getLookups = async ({ api, setIsLoading, setActiveRecord, modelConfig, setError, lookups, scopeId }) => {
    api = api || modelConfig.api
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
        } else if (response.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
            window.location.href = '/';
        }
    } catch (error) {
        setError('Could not delete record', error.message || error.toString());
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
