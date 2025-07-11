"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transport = exports.default = exports.HTTP_STATUS_CODES = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _actions = _interopRequireDefault(require("../useRouter/actions"));
const _excluded = ["method", "url", "data", "headers", "credentials"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
let pendingRequests = 0;
const HTTP_STATUS_CODES = exports.HTTP_STATUS_CODES = {
  OK: 200,
  SESSION_EXPIRED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};
const getFormData = props => {
  const formData = new FormData();
  for (const key in props) {
    if (typeof props[key] === "object") {
      formData.append(key, JSON.stringify(props[key]));
    } else {
      formData.append(key, props[key]);
    }
  }
  return formData;
};
const exportRequest = (url, query) => {
  const newURL = new URL(url);
  for (const key in query) {
    const value = typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key];
    newURL.searchParams.append(key, value);
  }
  window.open(newURL, '_blank').focus();
};
const transport = async config => {
  const {
      method = 'GET',
      url,
      data,
      headers = {},
      credentials = 'include'
    } = config,
    rest = _objectWithoutProperties(config, _excluded);
  const fetchOptions = _objectSpread({
    method,
    credentials,
    headers: _objectSpread({}, headers)
  }, rest);
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
  const responseObj = {
    status: response.status,
    data: contentType.includes('application/json') ? await response.json() : await response.text(),
    headers: Object.fromEntries(response.headers.entries())
  };
  if (!response.ok) {
    responseObj.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
  return responseObj;
};
exports.transport = transport;
const request = async _ref => {
  let {
    url,
    params = {},
    history,
    jsonPayload = false,
    additionalParams = {},
    additionalHeaders = {},
    disableLoader = false,
    dispatchData
  } = _ref;
  if (params.exportData) {
    return exportRequest(url, params);
  }
  if (!disableLoader) {
    dispatchData({
      type: _actions.default.UPDATE_LOADER_STATE,
      payload: true
    });
  }
  pendingRequests++;
  const reqParams = _objectSpread({
    method: 'POST',
    credentials: 'include',
    url: url,
    headers: jsonPayload ? _objectSpread({}, additionalHeaders) : _objectSpread({
      'Content-Type': 'multipart/form-data'
    }, additionalHeaders)
  }, additionalParams);
  if (params) {
    reqParams.data = jsonPayload ? params : getFormData(params);
  }
  try {
    const response = await transport(reqParams);
    pendingRequests--;
    const data = response.data;
    if (pendingRequests === 0 && !disableLoader) {
      dispatchData({
        type: 'UPDATE_LOADER_STATE',
        loaderOpen: false
      });
    }

    // Handle HTTP errors here
    if (response.status === HTTP_STATUS_CODES.SESSION_EXPIRED) {
      history('/login');
      return;
    }
    if (response.status !== HTTP_STATUS_CODES.OK) {
      // You can return the error object or handle as needed
      return {
        data: {
          message: data.message || 'An error occurred'
        }
      };
    }
    return data;
  } catch (ex) {
    pendingRequests--;
    if (pendingRequests === 0) {
      dispatchData({
        type: 'UPDATE_LOADER_STATE',
        loaderOpen: false
      });
    }
    // Only network errors will be caught here
    return {
      data: {
        message: ex.message || 'Network error'
      }
    };
  }
};
var _default = exports.default = request;