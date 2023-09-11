"use strict";

require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModel = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.replace-all.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _index = _interopRequireDefault(require("./index"));
var _react = _interopRequireDefault(require("react"));
var yup = _interopRequireWildcard(require("yup"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _material = require("@mui/material");
var _Form = _interopRequireDefault(require("../Form/Form"));
const _excluded = ["match"],
  _excluded2 = ["match"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const nonAlphaNumeric = /[^a-zA-Z0-9]/g;
const customStyle = {};
const showRowsSelected = true;
const defaultValueConfigs = {
  "string": "",
  "boolean": false,
  "radio": false,
  "oneToMany": ""
};
class UiModel {
  constructor(modelConfig) {
    _defineProperty(this, "Form", _ref => {
      let {
          match
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded);
      return /*#__PURE__*/_react.default.createElement(_Form.default, _extends({
        model: this,
        Layout: this.Layout
      }, props));
    });
    _defineProperty(this, "Grid", _ref2 => {
      let {
          match
        } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_Paper.default, null, /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        model: this,
        showRowsSelected: showRowsSelected
      }, props)));
    });
    _defineProperty(this, "ChildGrid", props => {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        model: this
      }, props, {
        customStyle: customStyle,
        showRowsSelected: showRowsSelected
      })), /*#__PURE__*/_react.default.createElement(_material.Divider, {
        orientation: "horizontal",
        sx: {
          mt: 2
        }
      }));
    });
    const {
      title,
      controllerType,
      url
    } = modelConfig;
    let {
      api,
      idProperty = api + 'Id'
    } = modelConfig;
    if (!api) {
      api = "".concat(title.replaceAll(nonAlphaNumeric, '-').toLowerCase());
      idProperty = title.replaceAll(' ', '') + 'Id';
    }
    // api = controllerType === 'cs' ? `${api}.ashx` : `internal-reporting/api/${api}`;
    api = url;
    const defaultValues = _objectSpread({}, modelConfig.defaultValues);
    Object.assign(this, _objectSpread(_objectSpread({
      standard: true,
      idProperty
    }, modelConfig), {}, {
      api
    }));
    const columnVisibilityModel = {};
    for (const col of this.columns) {
      const name = col.field || col.id;
      if (col.hide === true) {
        columnVisibilityModel[col.id || col.field] = false;
      }
      defaultValues[name] = col.defaultValue === undefined ? defaultValueConfigs[col.type] || "" : col.defaultValue;
    }
    this.columnVisibilityModel = columnVisibilityModel;
    this.defaultValues = defaultValues;
  }
  getValidationSchema(_ref3) {
    let {
      id
    } = _ref3;
    const {
      columns
    } = this;
    let validationConfig = {};
    for (const column of columns) {
      const {
        field,
        label,
        header,
        type = 'string',
        requiredIfNew = false,
        required = false,
        min = '',
        max = '',
        validationLength = 0
      } = column;
      const formLabel = label || header;
      if (!formLabel) {
        continue;
      }
      let config;
      switch (type) {
        case 'string':
          config = yup.string().trim().label(formLabel);
          if (min) {
            config = config.min(Number(min), "".concat(formLabel, " must be at least ").concat(min, " characters long"));
          }
          if (max) {
            config = config.max(Number(max), "".concat(formLabel, " must be at most ").concat(max, " characters long"));
          }
          break;
        //Validation "oneToMany" type for grid to show snackbar - commenting out for use in future
        // case 'oneToMany':
        //     config = yup.string().label(formLabel).test(value => {
        //         const valueArray = (value && value.length > 0) ? value.split(',').map(item => item.trim()) : [];
        //         if (valueArray.length < 2) {
        //             snackbar.showError(`Please assign at least 2 ${formLabel}`, null, "error");
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     });
        //     break;
        case 'boolean':
          config = yup.bool().nullable().transform((value, originalValue) => {
            if (originalValue === '') return null;
            return value;
          }).label(formLabel);
          break;
        case 'radio':
        case 'dayRadio':
          config = yup.mixed().label(formLabel).required("Select at least one option for ".concat(formLabel));
          break;
        case 'date':
          config = yup.date().nullable().transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null) return null;
            return value;
          }).label(formLabel).required("".concat(formLabel, " is required"));
          break;
        case 'autocomplete':
          config = yup.string().trim().label(formLabel).required("Select at least one ".concat(formLabel));
          break;
        default:
          config = yup.mixed().label(formLabel);
          break;
      }
      if (required) {
        config = config.trim().required("".concat(formLabel, " is required"));
      }
      if (requiredIfNew && (!id || id === '')) {
        config = config.trim().required("".concat(formLabel, " is required"));
      }
      validationConfig[field] = config;
    }
    let validationSchema = yup.object(_objectSpread(_objectSpread({}, validationConfig), this.validationSchema));
    return validationSchema;
  }
}
exports.UiModel = UiModel;