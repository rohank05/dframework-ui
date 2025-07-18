"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _StateProvider = require("../../useRouter/StateProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    fieldConfigs,
    model,
    mode
  } = _ref;
  let isDisabled;
  const {
    systemDateTimeFormat,
    stateData
  } = (0, _StateProvider.useStateContext)(); //provider
  if (mode !== 'copy') {
    isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  }
  const _shouldDisableDate = column.shouldDisableDate ? column.shouldDisableDate : null;
  let helperText;
  if (isDisabled && column.showErrorText) {
    helperText = model === null || model === void 0 ? void 0 : model.helperText;
  } else if (formik.touched[field] && formik.errors[field]) {
    helperText = formik.errors[field];
  }
  const showError = !!helperText;
  const props = {
    variant: "standard",
    error: showError
  };
  return /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({}, otherProps, {
    variant: "standard",
    readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
    key: field,
    fullWidth: true,
    format: systemDateTimeFormat(true, false, stateData.dateTime),
    name: field,
    value: (0, _dayjs.default)(formik.values[field]),
    onChange: value => {
      const adjustedDate = (0, _dayjs.default)(value).hour(12);
      const isoString = adjustedDate.toISOString();
      formik.setFieldValue(field, isoString);
    },
    onBlur: formik.handleBlur,
    helperText: formik.touched[field] && formik.errors[field],
    disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
    disabled: isDisabled,
    shouldDisableDate: date => _shouldDisableDate ? _shouldDisableDate(date, formik) : false,
    slotProps: {
      textField: _objectSpread({
        fullWidth: true,
        helperText
      }, props)
    }
  }));
};
var _default = exports.default = field;