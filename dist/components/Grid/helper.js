"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDefaultSort = exports.areEqual = exports.ExportMenuItem = exports.CustomExportButton = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _react = _interopRequireDefault(require("react"));
const _excluded = ["exportFormats"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// Helper to convert default sort string to array
const convertDefaultSort = (defaultSort, constants, sortRegex) => {
  if (typeof defaultSort !== constants.string) return [];
  return defaultSort.split(',').map(sortField => {
    sortRegex.lastIndex = 0;
    const sortInfo = sortRegex.exec(sortField);
    if (!sortInfo) return null;
    const [, field, direction = 'ASC'] = sortInfo;
    return {
      field: field.trim(),
      sort: direction.trim().toLowerCase()
    };
  }).filter(Boolean);
};

// Export menu item component
exports.convertDefaultSort = convertDefaultSort;
const ExportMenuItem = _ref => {
  let {
    tTranslate,
    tOpts,
    handleExport,
    contentType,
    type,
    isPivotExport = false
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleExport,
    "data-type": type,
    "data-content-type": contentType,
    "data-is-pivot-export": isPivotExport
  }, tTranslate("Export", tOpts), " ", type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
};

// Custom export button component
exports.ExportMenuItem = ExportMenuItem;
const CustomExportButton = _ref2 => {
  let {
      exportFormats
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarExportContainer, props, exportFormats.csv !== false && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "csv",
    contentType: "text/csv"
  })), exportFormats.excel !== false && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "excel",
    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  })), props.showPivotExportBtn && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "excel With Pivot",
    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    isPivotExport: true
  })), exportFormats.xml !== false && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "xml",
    contentType: "text/xml"
  })), exportFormats.html !== false && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "html",
    contentType: "text/html"
  })), exportFormats.json !== false && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
    type: "json",
    contentType: "application/json"
  })));
};

// Shallow props comparison
exports.CustomExportButton = CustomExportButton;
const areEqual = exports.areEqual = function areEqual() {
  let prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let equal = true;
  for (const o in prevProps) {
    if (prevProps[o] !== nextProps[o]) {
      equal = false;
    }
  }
  for (const o in nextProps) {
    if (!(o in prevProps)) {
      equal = false;
    }
  }
  return equal;
};