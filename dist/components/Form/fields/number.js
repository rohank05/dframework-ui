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
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _string = _interopRequireDefault(require("./string"));
var _lodash = _interopRequireDefault(require("lodash.debounce"));
const _excluded = ["column", "otherProps", "formik", "field"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
    minValue: min,
    maxValue: max
  } = column;
  const resolvedMin = resolveValue({
    value: min,
    state: formik.values
  });
  const resolvedMax = resolveValue({
    value: max,
    state: formik.values
  });
  const minKey = 47;
  const maxKey = 58;
  const maxval = Math.max(0, resolvedMin);
  const debouncedSetFieldValue = (0, _react.useCallback)((0, _lodash.default)((field, value) => {
    if (value < maxval) {
      formik.setFieldValue(field, maxval);
    } else if (resolvedMax && value > resolvedMax) {
      formik.setFieldValue(field, resolvedMax);
    } else {
      formik.setFieldValue(field, value);
    }
  }, 400), [resolvedMin, resolvedMax, formik.values]);
  otherProps = _objectSpread(_objectSpread({
    InputProps: {
      inputProps: {
        min,
        max: resolvedMax,
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
    onChange: event => {
      const {
        value
      } = event.target;
      debouncedSetFieldValue(field, Number(value)); // Pass the updated value to the debounced function
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
var _default = exports.default = Field;