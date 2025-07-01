import actionsStateProvider from '../useRouter/actions';
let pendingRequests = 0;

const HTTP_STATUS_CODES = {
    OK: 200,
    SESSION_EXPIRED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

const getFormData = (props) => {
    const formData = new FormData();
    for (const key in props) {
        if (typeof props[key] == "object") {
            formData.append(key, JSON.stringify(props[key]));
        } else {
            formData.append(key, props[key]);
        }
    }
    return formData;
}

const exportRequest = (url, query) => {
    const newURL = new URL(url);
    for (const key in query) {
        const value = typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key];
        newURL.searchParams.append(key, value);
    }
    window.open(newURL, '_blank').focus();
}

const transport = async (config) => {
    const {
        method = 'GET',
        url,
        data,
        headers = {},
        credentials = 'include',
        ...rest
    } = config;

    const fetchOptions = {
        method,
        credentials,
        headers: {
            ...headers,
        },
        ...rest
    };

    if (data) {
        if (headers['Content-Type'] === 'multipart/form-data') {
            delete fetchOptions.headers['Content-Type']; // Let browser set it
            fetchOptions.body = data instanceof FormData ? data : getFormData(data);
        } else {
            fetchOptions.headers['Content-Type'] = headers['Content-Type'] || 'application/json';
            fetchOptions.body = typeof data === 'string' ? data : JSON.stringify(data);
        }
    }

    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get('content-type') || {};
    const repsonseObj = {
        status: response.status,
        data: contentType.includes('application/json') ? await response.json() : await response.text(),
        headers: Object.fromEntries(response.headers.entries())
    }
    if (!response.ok) {
        repsonseObj.status = response.INTERNAL_SERVER_ERROR
    }

    return repsonseObj;
};

const request = async ({ url, params = {}, history, jsonPayload = false, additionalParams = {}, additionalHeaders = {}, disableLoader = false, dispatchData }) => {
    if (params.exportData) {
        return exportRequest(url, params);
    }
    if (!disableLoader) {
        dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: true });
    }
    pendingRequests++;

    const reqParams = {
        method: 'POST',
        credentials: 'include',
        url: url,
        headers: jsonPayload ? { ...additionalHeaders } : { 'Content-Type': 'multipart/form-data', ...additionalHeaders },
        ...additionalParams
    };

    if (params) {
        reqParams.data = jsonPayload ? params : getFormData(params);
    }

    try {
        const response = await transport(reqParams);
        pendingRequests--;
        const data = response.data;

        if (!response) {
            dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: false });
            return data;
        }
        if (pendingRequests === 0 && !disableLoader) {
            dispatchData({ type: 'UPDATE_LOADER_STATE', loaderOpen: false })
        }
        if (response.status === HTTP_STATUS_CODES.OK) {
            const json = response.data;
            if (json.success === false && json.info === 'Session has expired!') {
                history('/login');
                return;
            }
            return data;
        }
    } catch (ex) {
        pendingRequests--;
        if (pendingRequests === 0) {
            dispatchData({ type: 'UPDATE_LOADER_STATE', loaderOpen: false })
        }
        if (ex?.response?.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
            dispatchData({ type: actionsStateProvider.SET_USER_DATA, userData: {} });
            history('/login');
        }
        else {
            console.error(ex);
            return { error: ex.response };
        }
    }
}

export {
    HTTP_STATUS_CODES,
    transport
};

export default request;