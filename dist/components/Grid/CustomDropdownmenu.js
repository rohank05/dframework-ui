"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.to-string.js");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _material = require("@mui/material");
const _excluded = ["label", "value", "scopeId"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const CustomDropdownmenu = props => {
  var _column$dataRef, _currentFieldFilters$, _currentFieldFilters$2, _options;
  const {
    column,
    item,
    applyValue
  } = props;
  const lookupData = column === null || column === void 0 || (_column$dataRef = column.dataRef) === null || _column$dataRef === void 0 || (_column$dataRef = _column$dataRef.current) === null || _column$dataRef === void 0 ? void 0 : _column$dataRef.lookups;
  let options = lookupData[column.lookup] || [];
  const [isMultiSelect, setIsMultiSelect] = (0, _react.useState)(false);
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
  const apiRef = props.apiRef;
  const filterModel = (0, _xDataGridPremium.useGridSelector)(apiRef, _xDataGridPremium.gridFilterModelSelector);
  const currentFieldFilters = React.useMemo(() => {
    var _filterModel$items;
    return (_filterModel$items = filterModel.items) === null || _filterModel$items === void 0 ? void 0 : _filterModel$items.filter(value => {
      if (value.operator === 'isAnyOf') {
        setIsMultiSelect(true);
      } else {
        setIsMultiSelect(false);
      }
      return value.field === column.field;
    });
  }, [column.field, filterModel.items]);
  const handleFilterChange = React.useCallback(event => {
    let inputValue = event.target.value;
    if (column.applyZeroFilter) {
      inputValue = inputValue.toString();
    }
    if (!inputValue) {
      if (currentFieldFilters[0]) {
        apiRef.current.deleteFilterItem(currentFieldFilters[0]);
      }
      return;
    }

    // If multi-select, ensure the value is an array
    const newValue = isMultiSelect ? [...inputValue] : inputValue;
    applyValue(_objectSpread(_objectSpread({}, item), {}, {
      value: newValue
    }));
  }, [apiRef, column.field, currentFieldFilters, isMultiSelect]);
  const value = (_currentFieldFilters$ = (_currentFieldFilters$2 = currentFieldFilters[0]) === null || _currentFieldFilters$2 === void 0 ? void 0 : _currentFieldFilters$2.value) !== null && _currentFieldFilters$ !== void 0 ? _currentFieldFilters$ : '';
  const isMulti = isMultiSelect ? {
    multiple: true
  } : {};
  return /*#__PURE__*/React.createElement(_material.FormControl, {
    variant: "standard",
    className: "w-100"
  }, /*#__PURE__*/React.createElement(_material.InputLabel, null), /*#__PURE__*/React.createElement(_material.Select, _extends({
    label: column.field,
    variant: "standard",
    value: isMultiSelect ? [...value] : value,
    onChange: e => handleFilterChange(e)
  }, isMulti), (_options = options) === null || _options === void 0 ? void 0 : _options.map((option, index) => /*#__PURE__*/React.createElement(_material.MenuItem, {
    key: index,
    value: option.value
  }, option.label))));
};
var _default = exports.default = CustomDropdownmenu;