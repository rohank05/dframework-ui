import React from 'react';
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
    let formData = new FormData();
    for (let key in props) {
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
    for (let key in query) {
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
    const contentType = response.headers.get('content-type');
    const responseData = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
        throw {
            response: {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            }
        };
    }

    return {
        status: response.status,
        data: responseData,
        headers: Object.fromEntries(response.headers.entries())
    };
};

const request = async ({ url, params = {}, history, jsonPayload = false, additionalParams = {}, additionalHeaders = {}, disableLoader = false, dispatchData }) => {
    if (params.exportData) {
        return exportRequest(url, params);
    }
    if (!disableLoader) {
        dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: true });
    }
    pendingRequests++;

    let reqParams = {
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
        let response = await transport(reqParams);
        pendingRequests--;
        let data = response.data;
        
        if (response) {
            if (pendingRequests === 0 && !disableLoader) {
                dispatchData({ type: 'UPDATE_LOADER_STATE', loaderOpen: false })
            }
            if (response.status === 200) {
                let json = response.data;
                if (json.success === false) {
                    if (json.info === 'Session has expired!') {
                        history('/login');
                        return;
                    }
                    else if (response.status === 200) {
                        return data;
                    }
                }
                else {
                    return data;
                }
            }
        } else {
            dispatchData({ type: actionsStateProvider.UPDATE_LOADER_STATE, payload: false });
            return data;
        }
    } catch (ex) {
        pendingRequests--;
        if (pendingRequests === 0) {
            dispatchData({ type: 'UPDATE_LOADER_STATE', loaderOpen: false })
        }
        if (ex?.response?.status === 401) {
            dispatchData({ type: actions.SET_USER_DATA, userData: {} });
            history('/login');
        } else if (ex?.response?.status === 500) {

        }
        else {
            console.error(ex);
            return { error: ex.response };
        }
    }

    return <></>
}

export {
    HTTP_STATUS_CODES,
    transport
};

export default request;