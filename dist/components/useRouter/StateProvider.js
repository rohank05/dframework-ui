"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateContext = exports.useRouter = exports.StateProvider = exports.RouterProvider = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _stateReducer = _interopRequireDefault(require("./stateReducer"));
var _initialState = _interopRequireDefault(require("./initialState"));
var _httpRequest = _interopRequireDefault(require("../Grid/httpRequest"));
var _localization = require("../mui/locale/localization");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _actions = _interopRequireDefault(require("./actions"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _timezone = _interopRequireDefault(require("dayjs/plugin/timezone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Extend dayjs with the plugins
_dayjs.default.extend(_utc.default);
_dayjs.default.extend(_timezone.default);
const StateContext = /*#__PURE__*/(0, _react.createContext)();
const RouterContext = /*#__PURE__*/(0, _react.createContext)(null);
const StateProvider = _ref => {
  let {
    children
  } = _ref;
  const [stateData, dispatchData] = (0, _react.useReducer)(_stateReducer.default, _initialState.default);
  function systemDateTimeFormat(isDateFormatOnly, showOnlyDate, state) {
    if (state !== undefined && state !== null) {
      const userData = state; // Access 'state' 
      let userDateFormat = isDateFormatOnly ? 'DD-MM-YYYY' : 'DD-MM-YYYY hh:mm:ss A';
      if (userData) {
        userDateFormat = userData.split(' ');
        userDateFormat[0] = userDateFormat[0].toUpperCase();
        if (!isDateFormatOnly) {
          if (showOnlyDate) {
            userDateFormat = userDateFormat[0].toUpperCase();
          } else {
            userDateFormat[1] += ':ss';
            userDateFormat = userDateFormat.join(" ");
          }
        } else {
          userDateFormat = userDateFormat[0];
        }
      }
      ;
      return userDateFormat;
    }
    return isDateFormatOnly ? 'DD-MM-YYYY' : 'DD-MM-YYYY hh:mm:ss A';
  }
  async function getAllSavedPreferences(_ref2) {
    let {
      preferenceName,
      Username,
      history,
      dispatchData,
      preferenceApi,
      tablePreferenceEnums = {},
      addDefaultPreference = false
    } = _ref2;
    const params = {
      action: 'list',
      id: preferenceName,
      Username
    };
    const response = await (0, _httpRequest.default)({
      url: preferenceApi,
      params,
      history,
      dispatchData
    });
    let preferences = (response === null || response === void 0 ? void 0 : response.preferences) || [];
    if (addDefaultPreference) {
      const defaultPref = {
        "prefName": "Default",
        "prefId": 0,
        "GridId": preferenceName,
        "GridPreferenceId": 0,
        "prefValue": tablePreferenceEnums[preferenceName]
      };
      preferences = [defaultPref, ...preferences];
    }
    dispatchData({
      type: _actions.default.UDPATE_PREFERENCES,
      payload: preferences
    });
    dispatchData({
      type: _actions.default.TOTAL_PREFERENCES,
      payload: preferences.length
    });
  }

  /**
  * Filters out data elements whose fields do not exist in the grid's columns.
  *
  * @param {Object} params - The parameters object.
  * @param {Object} params.gridRef - A reference to the grid component.
  * @param {Array} params.data - The data array to filter.
  * @returns {Array} The filtered array containing only elements with existing columns in the grid.
  */
  const filterNonExistingColumns = _ref3 => {
    let {
      gridRef,
      data
    } = _ref3;
    return data.filter(ele => gridRef.current.getColumnIndex(ele.field) !== -1);
  };
  async function applyDefaultPreferenceIfExists(_ref4) {
    let {
      gridRef,
      history,
      dispatchData,
      Username,
      preferenceName,
      setIsGridPreferenceFetched,
      preferenceApi,
      tablePreferenceEnums = {}
    } = _ref4;
    const params = {
      action: 'default',
      id: preferenceName,
      Username
    };
    const response = await (0, _httpRequest.default)({
      url: preferenceApi,
      params,
      history,
      dispatchData
    });
    let userPreferenceCharts = response !== null && response !== void 0 && response.prefValue ? JSON.parse(response.prefValue) : tablePreferenceEnums[preferenceName];
    if (userPreferenceCharts && Object.keys(userPreferenceCharts).length) {
      userPreferenceCharts.gridColumn = filterNonExistingColumns({
        gridRef,
        data: userPreferenceCharts.gridColumn
      });
      userPreferenceCharts.sortModel = filterNonExistingColumns({
        gridRef,
        data: userPreferenceCharts.sortModel
      });
      userPreferenceCharts.filterModel.items = filterNonExistingColumns({
        gridRef,
        data: userPreferenceCharts.filterModel.items
      });
      gridRef.current.setColumnVisibilityModel(userPreferenceCharts.columnVisibilityModel);
      gridRef.current.setPinnedColumns(userPreferenceCharts.pinnedColumns);
      gridRef.current.setSortModel(userPreferenceCharts.sortModel || []);
      gridRef.current.setFilterModel(userPreferenceCharts === null || userPreferenceCharts === void 0 ? void 0 : userPreferenceCharts.filterModel);
      dispatchData({
        type: _actions.default.SET_CURRENT_PREFERENCE_NAME,
        payload: response !== null && response !== void 0 && response.prefValue ? response.prefName : 'Default'
      });
    }
    if (setIsGridPreferenceFetched) {
      setIsGridPreferenceFetched(true);
    }
  }
  function removeCurrentPreferenceName(_ref5) {
    let {
      dispatchData
    } = _ref5;
    dispatchData({
      type: _actions.default.SET_CURRENT_PREFERENCE_NAME,
      payload: null
    });
  }
  function formatDate(_ref6) {
    let {
      value,
      useSystemFormat,
      showOnlyDate = false,
      state,
      timeZone
    } = _ref6;
    console.log("TimeZone ", timeZone, stateData);
    if (value) {
      const format = systemDateTimeFormat(useSystemFormat, showOnlyDate, state); // Pass 'state' as an argument
      return (0, _dayjs.default)(value).tz(timeZone).format(format);
    }
    return '-';
  }
  function useLocalization() {
    const currentLocaleData = stateData.dataLocalization;
    const localeData = _localization.locales[currentLocaleData];
    function getLocalizedString(key) {
      return stateData.dataLocalization === 'pt-PT' || stateData.dataLocalization === 'ptPT' ? localeData.components.MuiDataGrid.defaultProps.localeText[key] || key : localeData[key] || key;
    }
    return {
      getLocalizedString
    };
  }
  return /*#__PURE__*/_react.default.createElement(StateContext.Provider, {
    value: {
      stateData,
      dispatchData,
      systemDateTimeFormat,
      formatDate,
      removeCurrentPreferenceName,
      getAllSavedPreferences,
      applyDefaultPreferenceIfExists,
      useLocalization
    }
  }, children);
};
exports.StateProvider = StateProvider;
const RouterProvider = exports.RouterProvider = RouterContext.Provider;
const useRouter = () => {
  return (0, _react.useContext)(RouterContext);
};
exports.useRouter = useRouter;
const useStateContext = () => {
  const context = (0, _react.useContext)(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
exports.useStateContext = useStateContext;