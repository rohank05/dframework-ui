import React, { createContext, useReducer, useContext } from 'react';
import stateReducer from './stateReducer';
import initialState from './initialState';
import request from '../Grid/httpRequest';
import { locales } from '../mui/locale/localization';
import dayjs from 'dayjs';
import actionsStateProvider from './actions';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const StateContext = createContext();
const RouterContext = createContext(null);

const StateProvider = ({ children }) => {

  const [stateData, dispatchData] = useReducer(stateReducer, initialState);

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
            userDateFormat[1] += !userDateFormat[1].includes(':ss') ? ':ss' : '';
            userDateFormat = userDateFormat.join(" ");
          }
        } else {
          userDateFormat = userDateFormat[0];
        }
      };
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
  async function getAllSavedPreferences({ preferenceName, Username, history, dispatchData, preferenceApi, defaultPreferenceEnums = {}, addDefaultPreference = false }) {
    const response = await request({ url: preferenceApi, params: { action: 'list', id: preferenceName, Username }, history, dispatchData }) || {};
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
    dispatchData({ type: actionsStateProvider.UDPATE_PREFERENCES, payload: preferences });
    dispatchData({ type: actionsStateProvider.TOTAL_PREFERENCES, payload: preferences.length });
    return preferences;
  }

  /**
   * Filters out data elements whose fields do not exist in the grid's columns.
   *
   * @param {Object} params - The parameters object.
   * @param {Object} params.gridRef - A reference to the grid component.
   * @param {Array} params.data - The data array to filter.
   * @returns {Array} The filtered array containing only elements with existing columns in the grid.
   */
  const filterNonExistingColumns = ({ gridRef, data }) => {
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
  async function applyDefaultPreferenceIfExists({ preferences = [], gridRef, dispatchData, preferenceName, setIsGridPreferenceFetched, defaultPreferenceEnums = {} }) {
    const defaultPreference = preferences.find(pref => pref.isDefault && pref.GridId === preferenceName);
    const userPreferenceCharts = defaultPreference ? JSON.parse(defaultPreference.prefValue) : defaultPreferenceEnums[preferenceName];
    if (userPreferenceCharts && Object.keys(userPreferenceCharts).length) {
      userPreferenceCharts.gridColumn = filterNonExistingColumns({ gridRef, data: userPreferenceCharts.gridColumn });
      userPreferenceCharts.sortModel = filterNonExistingColumns({ gridRef, data: userPreferenceCharts.sortModel });
      userPreferenceCharts.filterModel.items = filterNonExistingColumns({ gridRef, data: userPreferenceCharts.filterModel.items });
      gridRef.current.setColumnVisibilityModel(userPreferenceCharts.columnVisibilityModel);
      gridRef.current.setPinnedColumns(userPreferenceCharts.pinnedColumns);
      gridRef.current.setSortModel(userPreferenceCharts.sortModel || []);
      gridRef.current.setFilterModel(userPreferenceCharts?.filterModel);
      dispatchData({ type: actionsStateProvider.SET_CURRENT_PREFERENCE_NAME, payload: defaultPreference?.prefValue ? defaultPreference.prefName : 'Default' });
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
  function removeCurrentPreferenceName({ dispatchData }) {
    dispatchData({ type: actionsStateProvider.SET_CURRENT_PREFERENCE_NAME, payload: null });
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
  function formatDate({ value, useSystemFormat, showOnlyDate = false, state, timeZone }) {
    if (!value) return '-';
    const format = systemDateTimeFormat(useSystemFormat, showOnlyDate, state); // Pass 'state' as an argument
    if (!timeZone) {
      return dayjs(value).format(format);
    }
    return dayjs(value).tz(timeZone).format(format);
  }

  /**
   * Provides localization utilities for the current locale.
   *
   * @returns {Object} An object with a getLocalizedString function.
   */
  function useLocalization() {
    const currentLocaleData = stateData.dataLocalization;
    const localeData = locales[currentLocaleData];
    function getLocalizedString(key) {
      return currentLocaleData === 'pt-PT' || currentLocaleData === 'ptPT' ? localeData.components.MuiDataGrid.defaultProps.localeText[key] || key : localeData[key] || key;
    }
    return { getLocalizedString };
  }

  return (
    <StateContext.Provider value={{ stateData, dispatchData, systemDateTimeFormat, formatDate, removeCurrentPreferenceName, getAllSavedPreferences, applyDefaultPreferenceIfExists, useLocalization }}>
      {children}
    </StateContext.Provider>
  );
};

const RouterProvider = RouterContext.Provider;

const useRouter = () => {
  return useContext(RouterContext);
};

const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export { StateProvider, useStateContext, useRouter, RouterProvider };
