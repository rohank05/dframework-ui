"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
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
  const ChildModel = new _uiModels.UiModel(modelConfigOfChildGrid);
  if (!ChildModel) return null;
  return /*#__PURE__*/_react.default.createElement(ChildModel.ChildGrid, {
    parentFilters: parentFilters,
    parent: parent,
    model: modelConfigOfChildGrid,
    where: where,
    isChildGrid: true
  });
});
const Relations = _ref2 => {
  let {
    relations,
    parentFilters,
    parent,
    where,
    models
  } = _ref2;
  const [activeTab, setActiveTab] = (0, _react.useState)(relations[0]);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return null;
  // return (
  //   <TabContext value={activeTab}>
  //     <Box>
  //       <TabList
  //         onChange={handleChange}
  //       >
  //         {relations.map((relation) => (
  //           <Tab
  //             key={relation}
  //             label={
  //               models.find((model) => model.name === relation)?.listTitle ||
  //               "ModelLabel"
  //             }
  //             value={relation}
  //           />
  //         ))}
  //       </TabList>
  //     </Box>
  //     {relations.map((relation) => (
  //       <TabPanel
  //         sx={{ padding: 0 }}
  //         value={relation}
  //         key={relation}
  //       >
  //         <ChildGrid
  //           relation={relation}
  //           key={relation}
  //           models={models}
  //           parentFilters={parentFilters}
  //           parent={parent}
  //           where={where}
  //         />
  //       </TabPanel>
  //     ))}
  //   </TabContext>
  // );
};
var _default = exports.default = Relations;