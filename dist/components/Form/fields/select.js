"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    activeRecord,
    lookups,
    otherProps,
    classes,
    onChange
  } = _ref;
  const options = typeof column.lookup === 'string' ? lookups[column.lookup] : column.lookup;
  let inputValue = formik.values[field];
  if (column.multiSelect) {
    if (!inputValue || inputValue.length === 0) {
      inputValue = [];
    } else {
      if (!Array.isArray(inputValue)) {
        inputValue = inputValue.split(',').map(e => parseInt(e));
      }
    }
  }
  return /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    fullWidth: true,
    key: field,
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, null, fieldLabel), /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
    IconComponent: _KeyboardArrowDown.default
  }, otherProps, {
    name: field,
    multiple: column.multiSelect === true,
    readOnly: column.readOnly === true,
    value: "".concat(inputValue)
    // label={fieldLabel}
    ,
    onChange: formik.handleChange
    // onChange={onChange}
    ,
    onBlur: formik.handleBlur,
    MenuProps: {
      classes: {
        // list: classes.select
      }
    }
  }), Array.isArray(options) && options.map(option => /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    key: option.value,
    value: option.value
  }, option.label))), /*#__PURE__*/_react.default.createElement(_material.FormHelperText, null, formik.touched[field] && formik.errors[field]));
};
var _default = exports.default = field;