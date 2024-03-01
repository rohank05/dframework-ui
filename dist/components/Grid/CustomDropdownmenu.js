"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _material = require("@mui/material");
const _excluded = ["label", "value", "scopeId"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const GridOperators = {
  IsAnyOf: 'isAnyOf'
};
const CustomDropdownmenu = props => {
  var _column$dataRef, _currentFieldFilters$, _currentFieldFilters$2, _options;
  const {
    column,
    item,
    applyValue,
    apiRef
  } = props;
  const lookupData = column === null || column === void 0 || (_column$dataRef = column.dataRef) === null || _column$dataRef === void 0 || (_column$dataRef = _column$dataRef.current) === null || _column$dataRef === void 0 ? void 0 : _column$dataRef.lookups;
  let options = column.customLookup || lookupData[column.lookup] || [];
  if (typeof column.lookup === 'string') {
    options = options.map(_ref => {
      let {
          label,
          value,
          scopeId
        } = _ref,
        option = _objectWithoutProperties(_ref, _excluded);
      return {
        label: label,
        value: value
      };
    });
  }
  const filterModel = (0, _xDataGridPremium.useGridSelector)(apiRef, _xDataGridPremium.gridFilterModelSelector);
  const currentFieldFilters = (0, _react.useMemo)(() => {
    var _filterModel$items;
    return (_filterModel$items = filterModel.items) === null || _filterModel$items === void 0 ? void 0 : _filterModel$items.filter(value => {
      return value.field === column.field;
    });
  }, [column.field, filterModel.items]);
  const handleFilterChange = (0, _react.useCallback)(event => {
    let inputValue = event.target.value;
    let isAnyOfFilter = false;
    if (filterModel.items.length >= 1) {
      inputValue = inputValue.length === 1 ? inputValue[0] : inputValue;
      for (const element of filterModel.items) {
        if (element.field !== item.field) {
          continue;
        }
        if (element.operator === GridOperators.IsAnyOf) {
          inputValue = Array.isArray(inputValue) ? inputValue : [inputValue];
          isAnyOfFilter = true;
        } else {
          isAnyOfFilter = false;
          inputValue = inputValue === 0 ? '0' : inputValue;
        }
      }
    }
    if (inputValue.length === 0) {
      if (currentFieldFilters[0]) {
        apiRef.current.deleteFilterItem(currentFieldFilters[0]);
      }
      return;
    }
    const newValue = inputValue;
    const newitem = currentFieldFilters[0] ? currentFieldFilters[0] : item;
    applyValue(_objectSpread(_objectSpread({}, newitem), {}, {
      value: newValue
    }));
  }, [apiRef, column.applyZeroFilter, currentFieldFilters, item, applyValue]);
  const value = (_currentFieldFilters$ = (_currentFieldFilters$2 = currentFieldFilters[0]) === null || _currentFieldFilters$2 === void 0 ? void 0 : _currentFieldFilters$2.value) !== null && _currentFieldFilters$ !== void 0 ? _currentFieldFilters$ : '';
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    variant: "standard",
    className: "w-100"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, null), /*#__PURE__*/_react.default.createElement(_material.Select, {
    label: column.field,
    variant: "standard",
    value: value,
    onChange: e => handleFilterChange(e),
    multiple: Array.isArray(value),
    MenuProps: {
      PaperProps: {
        style: {
          height: 'fit-content',
          overflow: 'hidden'
        }
      }
    }
  }, (_options = options) === null || _options === void 0 ? void 0 : _options.map((option, index) => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: index,
    value: option.value
  }, option.label))));
};
var _default = exports.default = CustomDropdownmenu;