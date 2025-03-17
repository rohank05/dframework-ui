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
var React = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Chip = _interopRequireDefault(require("@mui/material/Chip"));
const _excluded = ["key"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Field = _ref => {
  var _formik$values$field;
  let {
    isAdd,
    column,
    field,
    fieldLabel,
    formik,
    lookups,
    data,
    otherProps,
    model,
    fieldConfigs,
    mode
  } = _ref;
  let inputValue = (_formik$values$field = formik.values[field]) !== null && _formik$values$field !== void 0 && _formik$values$field.length ? formik.values[field].split(", ") : [];
  let isDisabled;
  if (mode !== 'copy') {
    isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  }
  const handleAutoCompleteChange = (e, newValue, action, item) => {
    var _lastElement, _newValue;
    let lastElement = newValue.pop();
    lastElement = (_lastElement = lastElement) === null || _lastElement === void 0 ? void 0 : _lastElement.trim();
    if (!newValue.includes(lastElement)) {
      newValue.push(lastElement);
    }
    if (fixedOptions.includes(item.option) && action === "removeOption") {
      newValue = [item.option];
    }
    formik.setFieldValue(field, ((_newValue = newValue) === null || _newValue === void 0 ? void 0 : _newValue.join(', ')) || '');
  };
  const fixedOptions = column.hasDefault && !isAdd ? inputValue[0] : '';
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