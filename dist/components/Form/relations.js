"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _TabContext = _interopRequireDefault(require("@mui/lab/TabContext"));
var _TabList = _interopRequireDefault(require("@mui/lab/TabList"));
var _TabPanel = _interopRequireDefault(require("@mui/lab/TabPanel"));
var _uiModels = require("../Grid/ui-models");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Memoized ChildGrid Component
 * @param {Object} params - Parameters for rendering the child grid
 * @param {string} params.relation - Name of the related model
 * @param {Object} params.parentFilters - Filters to apply to the parent
 * @param {Object} params.parent - Parent data
 * @param {Object} params.where - Conditions for the grid
 * @param {Array} params.models - List of available models
 */
const ChildGrid = /*#__PURE__*/(0, _react.memo)(_ref => {
  let {
    relation,
    parentFilters,
    parent,
    where,
    models
  } = _ref;
  const modelConfigOfChildGrid = models.find(model => model.name === relation);
  if (!modelConfigOfChildGrid) return null;
  const config = _objectSpread(_objectSpread({}, modelConfigOfChildGrid), {}, {
    hideBreadcrumb: true
  });
  const ChildModel = config instanceof _uiModels.UiModel ? config : new _uiModels.UiModel(config);
  if (!ChildModel) return null;
  return /*#__PURE__*/_react.default.createElement(ChildModel.ChildGrid, {
    parentFilters: parentFilters,
    parent: parent,
    model: config,
    where: where,
    isChildGrid: true
  });
});
const Relations = _ref2 => {
  let {
    relations,
    parent,
    where,
    models,
    relationFilters
  } = _ref2;
  const [activeTab, setActiveTab] = (0, _react.useState)(relations[0]);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return /*#__PURE__*/_react.default.createElement(_TabContext.default, {
    value: activeTab
  }, /*#__PURE__*/_react.default.createElement(_Box.default, null, /*#__PURE__*/_react.default.createElement(_TabList.default, {
    onChange: handleChange
  }, relations.map(relation => {
    const modelConfigOfChildGrid = models.find(model => model.name === relation) || {};
    const label = modelConfigOfChildGrid.listTitle || modelConfigOfChildGrid.title || "";
    return /*#__PURE__*/_react.default.createElement(_Tab.default, {
      key: relation,
      label: label,
      value: relation
    });
  }))), relations.map(relation => /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    sx: {
      padding: 0
    },
    value: relation,
    key: relation
  }, /*#__PURE__*/_react.default.createElement(ChildGrid, {
    relation: relation,
    key: relation,
    models: models,
    parentFilters: relationFilters[relation] || [],
    parent: parent,
    where: where
  }))));
};
var _default = exports.default = Relations;