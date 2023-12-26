"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    onChange
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
    type: "text",
    variant: "standard",
    InputProps: {
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true
    },
    key: field,
    required: column === null || column === void 0 ? void 0 : column.required,
    fullWidth: true,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[field] && Boolean(formik.errors[field]),
    helperText: formik.touched[field] && formik.errors[field]
  }, otherProps));
};
var _default = exports.default = field;