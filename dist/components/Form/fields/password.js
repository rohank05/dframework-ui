"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _string = _interopRequireDefault(require("./string"));
var _material = require("@mui/material");
var _VisibilityOff = _interopRequireDefault(require("@mui/icons-material/VisibilityOff"));
var _Visibility = _interopRequireDefault(require("@mui/icons-material/Visibility"));
const _excluded = ["otherProps"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const Field = _ref => {
  var _props$column, _props$column2, _props$column3, _props$column4;
  let {
      otherProps
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [showPassword, setShowPassword] = _react.default.useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  otherProps = _objectSpread({
    type: showPassword ? 'text' : 'password',
    InputProps: {
      readOnly: ((_props$column = props.column) === null || _props$column === void 0 ? void 0 : _props$column.readOnly) || false,
      disabled: ((_props$column2 = props.column) === null || _props$column2 === void 0 ? void 0 : _props$column2.disabled) || false,
      endAdornment: /*#__PURE__*/_react.default.createElement(_material.InputAdornment, {
        position: "end"
      }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
        "aria-label": "toggle password visibility",
        onClick: handleClickShowPassword,
        onMouseDown: handleMouseDownPassword,
        edge: "end",
        disabled: ((_props$column3 = props.column) === null || _props$column3 === void 0 ? void 0 : _props$column3.disabled) || false,
        readOnly: ((_props$column4 = props.column) === null || _props$column4 === void 0 ? void 0 : _props$column4.readOnly) || false
      }, showPassword ? /*#__PURE__*/_react.default.createElement(_VisibilityOff.default, null) : /*#__PURE__*/_react.default.createElement(_Visibility.default, null)))
    }
  }, otherProps);
  return /*#__PURE__*/_react.default.createElement(_string.default, _extends({
    otherProps: otherProps
  }, props));
};
var _default = exports.default = Field;