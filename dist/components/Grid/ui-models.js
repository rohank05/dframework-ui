"use strict";

require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModel = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.replace-all.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _index = _interopRequireDefault(require("./index"));
var _react = _interopRequireDefault(require("react"));
var yup = _interopRequireWildcard(require("yup"));
var _material = require("@mui/material");
var _Form = _interopRequireDefault(require("../Form/Form"));
const _excluded = ["match"],
  _excluded2 = ["match"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const regexConfig = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
  nonAlphaNumeric: /[^a-zA-Z0-9]/g,
  compareValidatorRegex: /^compare:(.+)$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
};
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
      return /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        model: this,
        showRowsSelected: showRowsSelected
      }, props));
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
      title = "",
      controllerType
    } = modelConfig;
    let {
      api,
      idProperty = api + 'Id'
    } = modelConfig;
    const module = "module" in modelConfig ? modelConfig.module : title.replace(/[^\w\s]/gi, "");
    if (!api) {
      api = "".concat(title.replaceAll(regexConfig.nonAlphaNumeric, '-').toLowerCase());
      idProperty = title.replaceAll(' ', '') + 'Id';
    }
    api = controllerType === 'cs' ? "".concat(api, ".ashx") : "".concat(api);
    const defaultValues = _objectSpread({}, modelConfig.defaultValues);
    const name = module || title;
    Object.assign(this, _objectSpread(_objectSpread({
      standard: true,
      name,
      permissions: _objectSpread({}, UiModel.defaultPermissions),
      idProperty,
      linkColumn: "".concat(name, "Name"),
      overrideFileName: title,
      preferenceId: name,
      tableName: name,
      module
    }, modelConfig), {}, {
      api
    }));
    this.columnVisibilityModel = this._getColumnVisibilityModel();
    this.defaultValues = this._getDefaultValues(defaultValues);
  }
  _getColumnVisibilityModel() {
    const columnVisibilityModel = {};
    for (const col of this.columns) {
      if (col.hide === true) {
        columnVisibilityModel[col.id || col.field] = false;
      }
    }
    return columnVisibilityModel;
  }
  _getDefaultValues(defaultValues) {
    for (const col of this.columns) {
      const name = col.field || col.id;
      defaultValues[name] = col.defaultValue === undefined ? defaultValueConfigs[col.type] || "" : col.defaultValue;
    }
    return defaultValues;
  }
  getValidationSchema(_ref3) {
    let {
      id
    } = _ref3;
    const {
      columns
    } = this;
    const validationConfig = {};
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
        validate
      } = column;
      const formLabel = label || header || field;
      if (!formLabel) {
        continue;
      }
      let config;
      switch (type) {
        case 'string':
          config = yup.string().nullable().trim().label(formLabel);
          if (min && !isNaN(Number(min))) {
            config = config.min(Number(min), "".concat(formLabel, " must be at least ").concat(min, " characters long"));
          }
          if (max && !isNaN(Number(max))) {
            config = config.max(Number(max), "".concat(formLabel, " must be at most ").concat(max, " characters long"));
          }
          if (required) {
            config = config.trim().required("".concat(formLabel, " is required"));
          }
          break;
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
        case 'dateTime':
          config = yup.date().nullable() // Allow null values
          .transform((value, originalValue) => {
            // Transform empty strings or null values into null
            if (originalValue === '' || originalValue === null) return null;
            return value;
          }).label(formLabel); // Set a label for better error messages
          break;
        case 'select':
        case 'autocomplete':
          if (required) {
            config = yup.string().trim().label(formLabel).required("Select at least one ".concat(formLabel));
          } else {
            config = yup.string().nullable();
          }
          break;
        case 'password':
          config = yup.string().label(formLabel).test("ignore-asterisks", "".concat(formLabel, " must be a valid password."), value => {
            // Skip further validations if value is exactly "******"
            if (value === "******") return true;
            const minlength = Number(min) || 8;
            const maxlength = Number(max) || 50;
            const regex = column.regex || regexConfig.password;
            // Check minimum length, maximum length, and pattern if not "******"
            return yup.string().min(minlength, "".concat(formLabel, " must be at least ").concat(minlength, " characters")).max(maxlength, "".concat(formLabel, " must be at most ").concat(maxlength, " characters")).matches(regex, "".concat(formLabel, " must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")).isValidSync(value);
          });
          break;
        case 'email':
          config = yup.string().trim().matches(column.regex || regexConfig.email, 'Email must be a valid email');
          break;
        case 'number':
          if (required) {
            config = yup.number().label(formLabel).required("".concat(formLabel, " is required."));
          } else {
            config = yup.number().nullable();
          }
          if (min !== undefined && min !== '' && !isNaN(Number(min))) {
            config = config.min(Number(min), "".concat(formLabel, " must be greater than or equal to ").concat(min));
          }
          if (max !== undefined && max !== '' && !isNaN(Number(max))) {
            config = config.max(Number(max), "".concat(formLabel, " must be less than or equal to ").concat(max));
          }
          break;
        case 'fileUpload':
          config = yup.string().trim().label(formLabel);
          break;
        default:
          config = yup.mixed().nullable().label(formLabel);
          break;
      }
      if (required && type !== "string") {
        config = config.required("".concat(formLabel, " is required"));
      }
      if (requiredIfNew && (!id || id === '')) {
        config = config.trim().required("".concat(formLabel, " is required"));
      }
      if (validate) {
        const compareValidator = regexConfig.compareValidatorRegex.exec(validate);
        if (compareValidator) {
          const compareFieldName = compareValidator[1];
          const compareField = columns.find(f => (f.formField === compareFieldName || f.field) === compareFieldName);
          config = config.oneOf([yup.ref(compareFieldName)], "".concat(formLabel, " must match ").concat(compareField.label));
        }
      }
      validationConfig[field] = config;
    }
    return yup.object(_objectSpread(_objectSpread({}, validationConfig), this.validationSchema));
  }
}
exports.UiModel = UiModel;
_defineProperty(UiModel, "defaultPermissions", {
  add: true,
  edit: true,
  delete: true
});