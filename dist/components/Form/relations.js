"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _uiModels = require("../Grid/ui-models");
const _excluded = ["children", "value", "index"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function CustomTabPanel(props) {
  const {
      children,
      value,
      index
    } = props,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      p: 3
    }
  }, children));
}
CustomTabPanel.propTypes = {
  children: _propTypes.default.node,
  index: _propTypes.default.number.isRequired,
  value: _propTypes.default.number.isRequired
};
function a11yProps(index) {
  return {
    id: "simple-tab-".concat(index),
    'aria-controls': "simple-tabpanel-".concat(index)
  };
}

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
    models,
    readOnly
  } = _ref;
  const modelConfigOfChildGrid = models.find(_ref2 => {
    let {
      name
    } = _ref2;
    return name === relation;
  });
  if (!modelConfigOfChildGrid) return null;
  const config = _objectSpread(_objectSpread({}, modelConfigOfChildGrid), {}, {
    hideBreadcrumb: true
  });
  const ChildModel = config instanceof _uiModels.UiModel ? config : new _uiModels.UiModel(config);
  if (!ChildModel) return null;
  return /*#__PURE__*/_react.default.createElement(ChildModel.ChildGrid, {
    readOnly: readOnly,
    parentFilters: parentFilters,
    parent: parent,
    model: config,
    where: where,
    isChildGrid: true
  });
});

/**
 * Relations component using MUI Tabs
 * Renders a tab for each relation, and a ChildGrid in each panel
 */
const Relations = _ref3 => {
  let {
    relations,
    parent,
    where,
    models,
    relationFilters,
    readOnly
  } = _ref3;
  const [tabIndex, setTabIndex] = (0, _react.useState)(0);
  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      borderBottom: 1,
      borderColor: 'divider'
    }
  }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    value: tabIndex,
    onChange: handleChange,
    "aria-label": "relations tabs"
  }, relations.map((relation, idx) => {
    const modelConfigOfChildGrid = models.find(_ref4 => {
      let {
        name
      } = _ref4;
      return name === relation;
    }) || {};
    const label = modelConfigOfChildGrid.listTitle || modelConfigOfChildGrid.title || relation;
    return /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
      key: relation,
      label: label
    }, a11yProps(idx)));
  }))), relations.map((relation, idx) => /*#__PURE__*/_react.default.createElement(CustomTabPanel, {
    value: tabIndex,
    index: idx,
    key: relation
  }, /*#__PURE__*/_react.default.createElement(ChildGrid, {
    readOnly: readOnly,
    relation: relation,
    key: relation,
    models: models,
    parentFilters: relationFilters[relation] || [],
    parent: parent,
    where: where
  }))));
};
var _default = exports.default = Relations;