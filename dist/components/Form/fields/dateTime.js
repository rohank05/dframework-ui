"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _DateTimePicker = require("@mui/x-date-pickers/DateTimePicker");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _StateProvider = require("../../useRouter/StateProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes
  } = _ref;
  const {
    systemDateTimeFormat,
    stateData
  } = (0, _StateProvider.useStateContext)();
  return /*#__PURE__*/_react.default.createElement(_DateTimePicker.DateTimePicker, _extends({}, otherProps, {
    variant: "standard",
    readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
    key: field,
    fullWidth: true,
    format: systemDateTimeFormat(false, false, stateData.dateTime),
    name: field,
    value: (0, _dayjs.default)(formik.values[field]),
    onChange: value => formik.setFieldValue(field, value),
    onBlur: formik.handleBlur,
    helperText: formik.touched[field] && formik.errors[field],
    disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
    slotProps: {
      textField: {
        fullWidth: true,
        helperText: formik.errors[field],
        variant: "standard"
      }
    }
  }));
};
var _default = exports.default = field;