"use strict";

require("core-js/modules/es.weak-map.js");
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
var _styles = require("@mui/styles");
var _TabContext = _interopRequireDefault(require("@mui/lab/TabContext"));
var _TabList = _interopRequireDefault(require("@mui/lab/TabList"));
var _TabPanel = _interopRequireDefault(require("@mui/lab/TabPanel"));
var _uiModels = require("../Grid/ui-models");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { useSearchParams } from 'react-router-dom';

const childGrid = _ref => {
  let {
    relation,
    parentFilters,
    parent,
    where,
    models
  } = _ref;
  const modelConfigOfChildGrid = models.find(model => model.name === relation);
  if (!modelConfigOfChildGrid) return null;
  const ChildModel = new _uiModels.UiModel(modelConfigOfChildGrid);
  if (!ChildModel) return null;
  // return <div>hello</div>
  return /*#__PURE__*/_react.default.createElement(ChildModel.ChildGrid, {
    // return <ChildModel.Grid
    parentFilters: parentFilters,
    parent: parent,
    where: where
  });
};
const Relations = _ref2 => {
  let {
    relations,
    parentFilters,
    parent,
    where,
    models
  } = _ref2;
  const [activeTab, setActiveTab] = (0, _react.useState)(relations !== null && relations !== void 0 && relations.length ? relations[0] : null);
  // const { palette } = useTheme();

  if (!(relations !== null && relations !== void 0 && relations.length)) return null;
  // if (!relations?.length || !parentFilters) return null;

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return /*#__PURE__*/_react.default.createElement(_TabContext.default, {
    value: activeTab
  }, /*#__PURE__*/_react.default.createElement(_Box.default, null, /*#__PURE__*/_react.default.createElement(_TabList.default
  // sx={{
  //     '& .css-1mhpt05-MuiButtonBase-root-MuiTab-root': {
  //         color: "red"
  //         // color: palette.primary.text.dark
  //     },
  //     '.Mui-selected': {
  //         color: `blue !important`
  //         // color: `${palette.primary.selected_tab} !important`
  //     },
  //     '.MuiButtonBase-root': {
  //         color: `green`
  //         // color: `${palette.primary.unselected_tab}`
  //     }
  // }}
  , {
    onChange: handleChange
  }, relations.map(relation => {
    var _models$find;
    return /*#__PURE__*/_react.default.createElement(_Tab.default, {
      key: relation,
      label: ((_models$find = models.find(model => model.name === relation)) === null || _models$find === void 0 ? void 0 : _models$find.listTitle) || "ModelLabel",
      value: relation
      // sx={{
      //     color: "gray"
      // }}
    });
  }))), relations.map(relation => /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    sx: {
      padding: 0
    },
    value: relation,
    key: relation
  }, childGrid({
    relation,
    models,
    parentFilters,
    parent,
    where
  }))));
};
var _default = exports.default = Relations;