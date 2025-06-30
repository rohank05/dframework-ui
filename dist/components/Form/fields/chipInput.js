"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _material = require("@mui/material");
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Chip = _interopRequireDefault(require("@mui/material/Chip"));
const _excluded = ["key"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Field = _ref => {
  var _formik$values$field;
  let {
    isAdd,
    column,
    field,
    formik,
    otherProps,
    fieldConfigs = {},
    mode
  } = _ref;
  const inputValue = (_formik$values$field = formik.values[field]) !== null && _formik$values$field !== void 0 && _formik$values$field.length ? formik.values[field].split(",") : [];
  const isDisabled = mode !== 'copy' ? fieldConfigs.disabled : false;
  const fixedOptions = column.hasDefault && !isAdd ? inputValue[0] : [];
  const handleAutoCompleteChange = (0, _react.useCallback)(function (e, newValue, action) {
    var _newValue$pop, _newValue;
    let item = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const lastElement = (_newValue$pop = newValue.pop()) === null || _newValue$pop === void 0 ? void 0 : _newValue$pop.trim();
    if (!newValue.includes(lastElement)) {
      newValue.push(lastElement);
    }
    if (fixedOptions && fixedOptions.includes(item.option) && action === "removeOption") {
      newValue = [item.option];
    }
    formik.setFieldValue(field, ((_newValue = newValue) === null || _newValue === void 0 ? void 0 : _newValue.join(',')) || '');
  }, [formik, field]);
  return /*#__PURE__*/React.createElement(_FormControl.default, {
    fullWidth: true,
    key: field,
    variant: "standard",
    error: formik.touched[field] && Boolean(formik.errors[field])
  }, /*#__PURE__*/React.createElement(_Autocomplete.default, _extends({}, otherProps, {
    multiple: true,
    id: field,
    freeSolo: true,
    value: inputValue,
    options: [],
    renderInput: params => /*#__PURE__*/React.createElement(_TextField.default, _extends({}, params, {
      variant: "standard"
    })),
    onChange: handleAutoCompleteChange,
    size: "small",
    renderTags: (tagValue, getTagProps) => tagValue.map((option, index) => {
      const _getTagProps = getTagProps({
          index
        }),
        {
          key
        } = _getTagProps,
        tagProps = _objectWithoutProperties(_getTagProps, _excluded);
      return /*#__PURE__*/React.createElement(_Chip.default, _extends({
        key: key,
        label: option
      }, tagProps, {
        disabled: fixedOptions.includes(option)
      }));
    }),
    disabled: isDisabled
  })), formik.touched[field] && formik.errors[field] && /*#__PURE__*/React.createElement(_material.FormHelperText, null, formik.errors[field]));
};
var _default = exports.default = Field;