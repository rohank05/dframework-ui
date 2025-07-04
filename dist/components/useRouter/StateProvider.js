"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateContext = exports.useRouter = exports.StateProvider = exports.RouterProvider = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.unshift.js");
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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

  /**
   * Returns the system date and/or time format string based on user preferences and options.
   *
   * @param {boolean} isDateFormatOnly - If true, returns only the date format; otherwise, returns date and time format.
   * @param {boolean} showOnlyDate - If true and isDateFormatOnly is false, returns only the date part in uppercase.
   * @param {string|null|undefined} state - The user-defined date/time format string (e.g., "dd-mm-yyyy hh:mm A").
   * @returns {string} The formatted date/time format string.
   */
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

  /**
   * Fetches all saved preferences for a given grid and user, and updates the state.
   * Optionally adds a default preference to the list.
   *
   * @param {Object} params - The parameters object.
   * @param {string} params.preferenceName - The name of the grid or preference.
   * @param {string} params.Username - The username for which to fetch preferences.
   * @param {object} params.history - The history object for navigation.
   * @param {function} params.dispatchData - The dispatch function to update state.
   * @param {string} params.preferenceApi - The API endpoint for preferences.
   * @param {Object} [params.defaultPreferenceEnums={}] - Default preferences mapping.
   * @param {boolean} [params.addDefaultPreference=false] - Whether to add a default preference.
   */
  async function getAllSavedPreferences(_ref2) {
    let {
      preferenceName,
      Username,
      history,
      dispatchData,
      preferenceApi,
      defaultPreferenceEnums = {},
      addDefaultPreference = false
    } = _ref2;
    const response = (await (0, _httpRequest.default)({
      url: preferenceApi,
      params: {
        action: 'list',
        id: preferenceName,
        Username
      },
      history,
      dispatchData
    })) || {};
    const preferences = response.preferences || [];
    if (addDefaultPreference) {
      preferences.unshift({
        prefName: "Default",
        prefId: 0,
        GridId: preferenceName,
        GridPreferenceId: 0,
        prefValue: defaultPreferenceEnums[preferenceName]
      });
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

  /**
   * Applies the default grid preference if it exists for the user, otherwise applies the default enum.
   * Updates the grid and state accordingly.
   *
   * @param {Object} params - The parameters object.
   * @param {Object} params.gridRef - Reference to the grid component.
   * @param {Object} params.history - History object for navigation.
   * @param {Function} params.dispatchData - Dispatch function to update state.
   * @param {string} params.Username - Username for which to fetch preferences.
   * @param {string} params.preferenceName - Name of the grid or preference.
   * @param {Function} params.setIsGridPreferenceFetched - Callback to set grid preference fetched state.
   * @param {string} params.preferenceApi - API endpoint for preferences.
   * @param {Object} [params.defaultPreferenceEnums={}] - Default preferences mapping.
   */
  async function applyDefaultPreferenceIfExists(_ref4) {
    let {
      gridRef,
      history,
      dispatchData,
      Username,
      preferenceName,
      setIsGridPreferenceFetched,
      preferenceApi,
      defaultPreferenceEnums = {}
    } = _ref4;
    const params = {
      action: 'default',
      id: preferenceName,
      Username
    };
    const response = (await (0, _httpRequest.default)({
      url: preferenceApi,
      params,
      history,
      dispatchData
    })) || {};
    const userPreferenceCharts = response.prefValue ? JSON.parse(response.prefValue) : defaultPreferenceEnums[preferenceName];
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

  /**
   * Removes the current preference name from the state.
   *
   * @param {Object} params - The parameters object.
   * @param {Function} params.dispatchData - Dispatch function to update state.
   */
  function removeCurrentPreferenceName(_ref5) {
    let {
      dispatchData
    } = _ref5;
    dispatchData({
      type: _actions.default.SET_CURRENT_PREFERENCE_NAME,
      payload: null
    });
  }

  /**
   * Formats a date value using the system or user-defined format and optional timezone.
   *
   * @param {Object} params - The parameters object.
   * @param {string|Date} params.value - The date value to format.
   * @param {boolean} params.useSystemFormat - Whether to use the system date format.
   * @param {boolean} [params.showOnlyDate=false] - Whether to show only the date part.
   * @param {string|null|undefined} params.state - The user-defined date/time format string.
   * @param {string} [params.timeZone] - The timezone to use for formatting.
   * @returns {string} The formatted date string or '-' if value is falsy.
   */
  function formatDate(_ref6) {
    let {
      value,
      useSystemFormat,
      showOnlyDate = false,
      state,
      timeZone
    } = _ref6;
    if (!value) return '-';
    const format = systemDateTimeFormat(useSystemFormat, showOnlyDate, state); // Pass 'state' as an argument
    if (!timeZone) {
      return (0, _dayjs.default)(value).format(format);
    }
    return (0, _dayjs.default)(value).tz(timeZone).format(format);
  }

  /**
   * Provides localization utilities for the current locale.
   *
   * @returns {Object} An object with a getLocalizedString function.
   */
  function useLocalization() {
    const currentLocaleData = stateData.dataLocalization;
    const localeData = _localization.locales[currentLocaleData];
    function getLocalizedString(key) {
      return currentLocaleData === 'pt-PT' || currentLocaleData === 'ptPT' ? localeData.components.MuiDataGrid.defaultProps.localeText[key] || key : localeData[key] || key;
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