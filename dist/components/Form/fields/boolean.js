"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _material = require("@mui/material");
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Field = _ref => {
  let {
    column,
    field,
    label,
    formik,
    otherProps,
    classes,
    onChange
  } = _ref;
  const handleChange = event => {
    formik.setFieldValue(field, event.target.checked);
  };
  const checked = (0, _react.useMemo)(() => formik.values[field] !== undefined ? formik.values[field] === true : column.defaultValue, [formik, column]);
  return /*#__PURE__*/_react.default.createElement("div", {
    key: field
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, _extends({}, otherProps, {
      name: field,
      disabled: (column === null || column === void 0 ? void 0 : column.readOnly) === true || (column === null || column === void 0 ? void 0 : column.disabled),
      checked: checked,
      onChange: handleChange,
      onBlur: formik.handleBlur,
      defaultChecked: column.defaultValue
    }))
    // label={label} commenting this code due to showing two label on ui 
  }), /*#__PURE__*/_react.default.createElement(_material.FormHelperText, null, formik.touched[field] && formik.errors[field]));
};
var _default = exports.default = Field;