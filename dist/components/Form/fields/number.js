"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _string = _interopRequireDefault(require("./string"));
const _excluded = ["column", "otherProps", "formik", "field"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const field = _ref => {
  let {
      column,
      otherProps,
      formik,
      field
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    minValue: min,
    maxValue: max
  } = column;
  const minKey = 47;
  const maxKey = 58;
  otherProps = _objectSpread(_objectSpread({
    InputProps: {
      inputProps: {
        min: Math.max(0, min),
        max,
        readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
        onKeyPress: event => {
          const keyCode = event.which ? event.which : event.keyCode;
          if (!(keyCode > minKey && keyCode < maxKey)) {
            event.preventDefault();
          }
        }
      }
    },
    type: 'number'
  }, otherProps), {}, {
    onBlur: event => {
      if (event.target.value < Math.max(0, min)) {
        formik.setFieldValue(field, Math.max(0, min));
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    }
  });
  return /*#__PURE__*/_react.default.createElement(_string.default, _extends({
    column: column,
    otherProps: otherProps,
    formik: formik,
    field: field
  }, props));
};
var _default = field;
exports.default = _default;