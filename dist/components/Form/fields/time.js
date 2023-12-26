"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _TimePicker = require("@mui/x-date-pickers/TimePicker");
var _dayjs = _interopRequireDefault(require("dayjs"));
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
  let inputValue = formik.values[field];
  if (column.isUtc) {
    inputValue = _dayjs.default.utc(inputValue).utcOffset((0, _dayjs.default)().utcOffset(), true).format();
  }
  return /*#__PURE__*/_react.default.createElement(_TimePicker.TimePicker, _extends({}, otherProps, {
    variant: "standard",
    readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
    key: field,
    fullWidth: true,
    name: field,
    value: (0, _dayjs.default)(inputValue),
    onChange: value => {
      if (column.isUtc) {
        value = value && value.isValid() ? value.format('YYYY-MM-DDTHH:mm:ss') + '.000Z' : null;
      }
      return formik.setFieldValue(field, value);
    },
    onBlur: formik.handleBlur,
    helperText: formik.touched[field] && formik.errors[field],
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