"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _material = require("@mui/material");
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const handleChange = event => {
    formik.setFieldValue(field, event.target.checked);
  };
  return /*#__PURE__*/React.createElement("div", {
    key: field
  }, /*#__PURE__*/React.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/React.createElement(_Checkbox.default, _extends({}, otherProps, {
      name: field,
      readOnly: column.readOnly === true,
      checked: formik.values[field],
      onChange: handleChange,
      onBlur: formik.handleBlur
    })),
    label: fieldLabel
  }), /*#__PURE__*/React.createElement(_material.FormHelperText, null, formik.touched[field] && formik.errors[field]));
};
var _default = exports.default = field;