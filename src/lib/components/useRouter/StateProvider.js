import React, { createContext, useReducer, useContext } from 'react';
import stateReducer from './stateReducer';
import initialState from './initialState';
import dayjs from 'dayjs';

const StateContext = createContext();

const StateProvider = ({ children }) => {

  const [stateData, dispatchData] = useReducer(stateReducer, initialState);
  function systemDateTimeFormat(isDateFormatOnly, showOnlyDate, state) {
    if (state !== undefined && state !== null) {
      const userData = state; 
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
      };
      return userDateFormat;
    }
    return isDateFormatOnly ? 'DD-MM-YYYY' : 'DD-MM-YYYY hh:mm:ss A';
  }

  function formatDate(value, useSystemFormat, showOnlyDate = false, state) {
    if (value) {
      const format = systemDateTimeFormat(useSystemFormat, showOnlyDate, state); // Pass 'state' as an argument
      return dayjs(value).format(format);
    }
    return '-';
  }

  return (
    <StateContext.Provider value={{ stateData, dispatchData, systemDateTimeFormat, formatDate }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export { StateProvider, useStateContext };
