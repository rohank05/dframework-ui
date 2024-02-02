"use strict";

require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _react = _interopRequireDefault(require("react"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _DateTimePicker = require("@mui/x-date-pickers/DateTimePicker");
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _utc = _interopRequireDefault(require("dayjs/plugin/utc.js"));
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _AdapterDayjs = _interopRequireDefault(require("@mui/x-date-pickers/AdapterDayjs"));
var _StateProvider = require("../useRouter/StateProvider");
var _utils = _interopRequireDefault(require("../utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
_dayjs.default.extend(_utc.default);
const componentMap = {
  date: _DatePicker.DatePicker,
  datetime: _DateTimePicker.DateTimePicker,
  dateTimeLocal: _DateTimePicker.DateTimePicker
};
const LocalizedDatePicker = props => {
  const {
    fixedFilterFormat
  } = _utils.default;
  const {
    item,
    applyValue,
    convert
  } = props;
  const {
    systemDateTimeFormat,
    stateData
  } = (0, _StateProvider.useStateContext)();
  const columnType = (props === null || props === void 0 ? void 0 : props.type) || 'date';
  const filterFormat = fixedFilterFormat[columnType];
  const isValidDate = date => {
    const parsedDate = (0, _dayjs.default)(date);
    return parsedDate.isValid() && parsedDate.year() > 1900;
  };
  const format = systemDateTimeFormat((columnType !== "datetime" && columnType !== "dateTimeLocal", false, stateData.dateTime));
  const handleFilterChange = newValue => {
    if (columnType !== "date" && columnType !== "datetime" && columnType !== "dateTimeLocal") return;
    const isPartialDate = value => {
      if (typeof value !== 'string') return false;
      return !(0, _dayjs.default)(value, format, true).isValid();
    };
    if (isPartialDate(newValue)) {
      return;
    }
    if (convert) {
      newValue = (0, _dayjs.default)(newValue).utc();
      applyValue(_objectSpread(_objectSpread({}, item), {}, {
        value: newValue
      }));
      return;
    }
    if (!isValidDate(newValue)) {
      applyValue(_objectSpread(_objectSpread({}, item), {}, {
        value: null
      }));
      return;
    }
    applyValue(_objectSpread(_objectSpread({}, item), {}, {
      value: newValue.format(filterFormat)
    }));
  };
  const getMonthAbbreviation = format => {
    if (format && format === fixedFilterFormat.OverrideDateFormat) {
      const parts = format.split('-');
      return parts.length === 3 ? parts[1] : null;
    }
  };
  const ComponentToRender = componentMap[columnType];
  const Dateformatvalue = columnType === "dateTimeLocal" ? item !== null && item !== void 0 && item.value ? (0, _dayjs.default)(item === null || item === void 0 ? void 0 : item.value.$d) : null : item !== null && item !== void 0 && item.value ? (0, _dayjs.default)(item.value) : null;
  return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.default
  }, /*#__PURE__*/_react.default.createElement(ComponentToRender, {
    fullWidth: true,
    format: format,
    value: Dateformatvalue,
    onChange: handleFilterChange,
    slotProps: {
      textField: {
        variant: "standard",
        label: "Value"
      }
    },
    localeText: {
      fieldMonthPlaceholder: () => {
        const monthAbbreviation = getMonthAbbreviation(format);
        return monthAbbreviation === "MMM" ? 'MMM' : 'MM';
      }
    }
  }));
};
const localizedDateFormat = colProps => (0, _xDataGridPremium.getGridDateOperators)().map(operator => _objectSpread(_objectSpread({}, operator), {}, {
  InputComponent: operator.InputComponent ? props => /*#__PURE__*/_react.default.createElement(LocalizedDatePicker, _extends({}, props, colProps)) : undefined
}));
var _default = exports.default = localizedDateFormat;