"use strict";

require("core-js/modules/es.error.cause.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRecord = exports.getRecord = exports.getLookups = exports.getList = exports.deleteRecord = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _actions = _interopRequireDefault(require("../useRouter/actions"));
var _httpRequest = require("./httpRequest");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const dateDataTypes = ['date', 'dateTime'];
const lookupDataTypes = ['singleSelect'];
const timeInterval = 200;
const isLocalTime = dateValue => new Date().getTimezoneOffset() === new Date(dateValue).getTimezoneOffset();

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
  if (response.status === _httpRequest.HTTP_STATUS_CODES.SESSION_EXPIRED) {
    setError('Session Expired!');
    setTimeout(() => {
      window.location.href = '/';
    }, timeInterval);
    return true;
  } else if (response.status === _httpRequest.HTTP_STATUS_CODES.FORBIDDEN) {
    setError('Access Denied!');
    setTimeout(() => {
      window.location.href = '/';
    }, timeInterval);
    return true;
  } else if (response.status === _httpRequest.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
    setError('Internal Server Error');
  }
  return false;
};
function shouldApplyFilter(filter) {
  const {
    operator,
    value,
    type
  } = filter;
  const isUnaryOperator = ["isEmpty", "isNotEmpty"].includes(operator);
  const hasValidValue = value !== undefined && value !== null && (value !== '' || type === 'number' && value === 0 || type === 'boolean' && value === false);
  return isUnaryOperator || hasValidValue;
}
const getList = async _ref => {
  var _filterModel$items;
  let {
    gridColumns,
    setIsLoading,
    setData,
    page,
    pageSize,
    sortModel,
    filterModel,
    api,
    parentFilters,
    action = 'list',
    setError,
    extraParams,
    contentType,
    columns,
    controllerType = 'node',
    template = null,
    configFileName = null,
    dispatchData,
    showFullScreenLoader = false,
    model,
    baseFilters = null,
    isElasticExport
  } = _ref;
  if (!contentType) {
    if (showFullScreenLoader) {
      dispatchData({
        type: _actions.default.UPDATE_LOADER_STATE,
        payload: true
      });
    }
  }
  const lookups = [];
  const dateColumns = [];
  gridColumns.forEach(_ref2 => {
    let {
      lookup,
      type,
      field,
      keepLocal = false,
      keepLocalDate,
      filterable = true
    } = _ref2;
    if (dateDataTypes.includes(type)) {
      dateColumns.push({
        field,
        keepLocal,
        keepLocalDate
      });
    }
    if (!lookup) {
      return;
    }
    if (!lookups.includes(lookup) && lookupDataTypes.includes(type) && filterable) {
      lookups.push(lookup);
    }
  });
  const where = [];
  if (filterModel !== null && filterModel !== void 0 && (_filterModel$items = filterModel.items) !== null && _filterModel$items !== void 0 && _filterModel$items.length) {
    filterModel.items.forEach(filter => {
      if (shouldApplyFilter(filter)) {
        var _column$;
        const {
          field,
          operator,
          filterField
        } = filter;
        let {
          value
        } = filter;
        const column = gridColumns.filter(item => (item === null || item === void 0 ? void 0 : item.field) === filter.field);
        const type = (_column$ = column[0]) === null || _column$ === void 0 ? void 0 : _column$.type;
        if (type === 'boolean') {
          value = value === 'true' || value === true ? 1 : 0;
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
  const requestData = _objectSpread(_objectSpread({
    start: page * pageSize,
    limit: isElasticExport ? model.exportSize : pageSize
  }, extraParams), {}, {
    logicalOperator: filterModel.logicOperator,
    sort: sortModel.map(sort => (sort.filterField || sort.field) + ' ' + sort.sort).join(','),
    where,
    isElasticExport,
    model: model.module,
    fileName: model.overrideFileName
  });
  if (lookups) {
    requestData.lookups = lookups.join(',');
  }
  if (model !== null && model !== void 0 && model.limitToSurveyed) {
    requestData.limitToSurveyed = model === null || model === void 0 ? void 0 : model.limitToSurveyed;
  }
  const headers = {};
  let url = controllerType === 'cs' ? "".concat(api, "?action=").concat(action, "&asArray=0") : "".concat(api, "/").concat(action);
  if (template !== null) {
    url += "&template=".concat(template);
  }
  if (configFileName !== null) {
    url += "&configFileName=".concat(configFileName);
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
      headers: _objectSpread({
        "Content-Type": "application/json"
      }, headers),
      credentials: 'include'
    };
    setData(prevData => _objectSpread(_objectSpread({}, prevData), {}, {
      records: [] // reset records to empty array before fetching new data
    }));
    const response = await (0, _httpRequest.transport)(params);
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      const {
        records
      } = response.data;
      if (records) {
        records.forEach(record => {
          dateColumns.forEach(column => {
            const {
              field,
              keepLocal,
              keepLocalDate
            } = column;
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
          model.columns.forEach(_ref3 => {
            let {
              field,
              displayIndex
            } = _ref3;
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
      dispatchData({
        type: _actions.default.UPDATE_LOADER_STATE,
        payload: false
      });
    }
  }
};
exports.getList = getList;
const getRecord = async _ref4 => {
  var _Object$keys;
  let {
    api,
    id,
    setIsLoading,
    setActiveRecord,
    model,
    parentFilters,
    where = {},
    setError
  } = _ref4;
  api = api || model.api;
  setIsLoading(true);
  const searchParams = new URLSearchParams();
  const url = "".concat(api, "/").concat(id === undefined || id === null ? '-' : id);
  const lookupsToFetch = [];
  const fields = model.formDef || model.columns;
  fields === null || fields === void 0 || fields.forEach(field => {
    if (field.lookup && !lookupsToFetch.includes(field.lookup) && !([null, 0].includes(id) && field.parentComboField)) {
      lookupsToFetch.push(field.lookup);
    }
  });
  searchParams.set("lookups", lookupsToFetch);
  if (where && (_Object$keys = Object.keys(where)) !== null && _Object$keys !== void 0 && _Object$keys.length) {
    searchParams.set("where", JSON.stringify(where));
  }
  try {
    const response = await (0, _httpRequest.transport)({
      url: "".concat(url, "?").concat(searchParams.toString()),
      method: 'GET',
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      const {
        data: record,
        lookups
      } = response.data;
      let title = record[model.linkColumn];
      const columnConfig = model.columns.find(a => a.field === model.linkColumn);
      if (columnConfig && columnConfig.lookup) {
        var _lookups$columnConfig;
        if (lookups && lookups[columnConfig.lookup] && (_lookups$columnConfig = lookups[columnConfig.lookup]) !== null && _lookups$columnConfig !== void 0 && _lookups$columnConfig.length) {
          const lookupValue = lookups[columnConfig.lookup].find(a => a.value === title);
          if (lookupValue) {
            title = lookupValue.label;
          }
        }
      }
      const defaultValues = _objectSpread({}, model.defaultValues);
      setActiveRecord({
        id,
        title: title,
        record: _objectSpread(_objectSpread(_objectSpread({}, defaultValues), record), parentFilters),
        lookups
      });
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
exports.getRecord = getRecord;
const deleteRecord = exports.deleteRecord = async function deleteRecord(_ref5) {
  let {
    id,
    api,
    setIsLoading,
    setError
  } = _ref5;
  const result = {
    success: false,
    error: ''
  };
  if (!id) {
    setError('Deleted failed. No active record.');
    return;
  }
  setIsLoading(true);
  try {
    const response = await (0, _httpRequest.transport)({
      url: "".concat(api, "/").concat(id),
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
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
const saveRecord = exports.saveRecord = async function saveRecord(_ref6) {
  let {
    id,
    api,
    values,
    setIsLoading,
    setError
  } = _ref6;
  let url, method;
  if (id !== 0) {
    url = "".concat(api, "/").concat(id);
    method = 'PUT';
  } else {
    url = api;
    method = 'POST';
  }
  try {
    setIsLoading(true);
    const response = await (0, _httpRequest.transport)({
      url,
      method,
      data: values,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
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
const getLookups = async _ref7 => {
  let {
    api,
    setIsLoading,
    setActiveRecord,
    model,
    setError,
    lookups,
    scopeId
  } = _ref7;
  api = api || model.api;
  setIsLoading(true);
  const searchParams = new URLSearchParams();
  const url = "".concat(api, "/lookups");
  searchParams.set("lookups", lookups);
  searchParams.set("scopeId", scopeId);
  try {
    const response = await (0, _httpRequest.transport)({
      url: "".concat(url, "?").concat(searchParams.toString()),
      method: 'GET',
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
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
exports.getLookups = getLookups;