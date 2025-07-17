"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _string = _interopRequireDefault(require("./string"));
var _lodash = _interopRequireDefault(require("lodash.debounce"));
const _excluded = ["column", "otherProps", "formik", "field"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// Key code constants
const DIGIT_START = 47;
const DIGIT_END = 58;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 40;

// Control key codes
const CONTROL_KEYS = [8, 46, 9, 27, 13]; // backspace, delete, tab, escape, enter
const resolveValue = _ref => {
  let {
    value,
    state
  } = _ref;
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const key = value.slice(1, -1); // Extract key inside the braces
    return state[key] !== undefined ? state[key] : value;
  }
  return value;
};
const Field = _ref2 => {
  let {
      column,
      otherProps,
      formik,
      field
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded);
  const {
    min,
    max
  } = column;
  const resolvedMin = (0, _react.useMemo)(() => Math.max(0, resolveValue({
    value: min,
    state: formik.values
  })), [min, formik.values]);
  const resolvedMax = (0, _react.useMemo)(() => resolveValue({
    value: max,
    state: formik.values
  }), [max, formik.values]);
  const debouncedSetFieldValue = (0, _react.useCallback)((0, _lodash.default)((field, value) => {
    if (value < resolvedMin) {
      formik.setFieldValue(field, resolvedMin);
    } else if (resolvedMax && value > resolvedMax) {
      formik.setFieldValue(field, resolvedMax);
    } else {
      formik.setFieldValue(field, value);
    }
  }, 400), [resolvedMin, resolvedMax, formik.setFieldValue]);
  const {
    onBlur
  } = props;
  otherProps = _objectSpread(_objectSpread({
    InputProps: {
      inputProps: {
        min: resolvedMin,
        max: resolvedMax,
        readOnly: column.readOnly === true,
        onKeyDown: event => {
          const keyCode = event.which ? event.which : event.keyCode;
          // Allow: backspace, delete, tab, escape, enter, arrows
          if (CONTROL_KEYS.includes(keyCode) || keyCode >= ARROW_LEFT && keyCode <= ARROW_RIGHT) {
            return;
          }
          // Allow number keys (0-9)
          if (!(keyCode > DIGIT_START && keyCode < DIGIT_END)) {
            event.preventDefault();
          }
        },
        sx: column.readOnly ? {
          backgroundColor: '#dfdede'
        } // Light grey background for read-only inputs
        : undefined
      }
    },
    type: 'number'
  }, otherProps), {}, {
    onChange: event => {
      debouncedSetFieldValue(field, Number(event.target.value)); // Pass the updated value to the debounced function
      if (typeof onBlur === "function") {
        onBlur(event);
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
var _default = exports.default = Field;