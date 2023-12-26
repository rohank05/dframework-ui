"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStateContext = exports.StateProvider = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.error.cause.js");
var _react = _interopRequireWildcard(require("react"));
var _stateReducer = _interopRequireDefault(require("./stateReducer"));
var _initialState = _interopRequireDefault(require("./initialState"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const StateContext = /*#__PURE__*/(0, _react.createContext)();
const StateProvider = _ref => {
  let {
    children
  } = _ref;
  const [stateData, dispatchData] = (0, _react.useReducer)(_stateReducer.default, _initialState.default);
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
      }
      ;
      return userDateFormat;
    }
    return isDateFormatOnly ? 'DD-MM-YYYY' : 'DD-MM-YYYY hh:mm:ss A';
  }
  function formatDate(value, useSystemFormat) {
    let showOnlyDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let state = arguments.length > 3 ? arguments[3] : undefined;
    if (value) {
      const format = systemDateTimeFormat(useSystemFormat, showOnlyDate, state); // Pass 'state' as an argument
      return (0, _dayjs.default)(value).format(format);
    }
    return '-';
  }
  return /*#__PURE__*/_react.default.createElement(StateContext.Provider, {
    value: {
      stateData,
      dispatchData,
      systemDateTimeFormat,
      formatDate
    }
  }, children);
};
exports.StateProvider = StateProvider;
const useStateContext = () => {
  const context = (0, _react.useContext)(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
exports.useStateContext = useStateContext;