"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const field = _ref => {
  let {
    column,
    field,
    formik,
    otherProps
  } = _ref;
  const rows = column.rows || (column.multiline ? 5 : 1);
  return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
    type: "text",
    variant: column.variant || "standard",
    InputProps: {
      readOnly: column.readOnly === true,
      sx: column.readOnly ? {
        backgroundColor: '#dfdede'
      } // Light grey background for read-only inputs
      : undefined
    },
    key: field,
    required: column.required,
    multiline: column.multiline,
    rows: rows,
    fullWidth: true,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[field] && Boolean(formik.errors[field]),
    helperText: formik.touched[field] && formik.errors[field],
    autoComplete: column.autoComplete
  }, otherProps, {
    defaultValue: column.defaultValue
  }));
};
var _default = exports.default = field;