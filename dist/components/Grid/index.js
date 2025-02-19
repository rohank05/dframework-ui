"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.some.js");
require("core-js/modules/esnext.set.difference.v2.js");
require("core-js/modules/esnext.set.intersection.v2.js");
require("core-js/modules/esnext.set.is-disjoint-from.v2.js");
require("core-js/modules/esnext.set.is-subset-of.v2.js");
require("core-js/modules/esnext.set.is-superset-of.v2.js");
require("core-js/modules/esnext.set.symmetric-difference.v2.js");
require("core-js/modules/esnext.set.union.v2.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _react = _interopRequireWildcard(require("react"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _FileCopy = _interopRequireDefault(require("@mui/icons-material/FileCopy"));
var _Article = _interopRequireDefault(require("@mui/icons-material/Article"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _FilterListOff = _interopRequireDefault(require("@mui/icons-material/FilterListOff"));
var _Add = _interopRequireDefault(require("@mui/icons-material/Add"));
var _Remove = _interopRequireDefault(require("@mui/icons-material/Remove"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _index = require("../SnackBar/index");
var _index2 = require("../Dialog/index");
var _crudHelper = require("./crud-helper");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _footer = require("./footer");
var _template = _interopRequireDefault(require("./template"));
var _material = require("@mui/material");
var _Check = _interopRequireDefault(require("@mui/icons-material/Check"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _core = require("@material-ui/core");
var _PageTitle = _interopRequireDefault(require("../PageTitle"));
var _StateProvider = require("../useRouter/StateProvider");
var _LocalizedDatePicker = _interopRequireDefault(require("./LocalizedDatePicker"));
var _actions = _interopRequireDefault(require("../useRouter/actions"));
var _GridPreference = _interopRequireDefault(require("./GridPreference"));
var _CustomDropdownmenu = _interopRequireDefault(require("./CustomDropdownmenu"));
var _utils = require("../utils");
var _History = _interopRequireDefault(require("@mui/icons-material/History"));
var _FileDownload = _interopRequireDefault(require("@mui/icons-material/FileDownload"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
const _excluded = ["showGrid", "useLinkColumn", "model", "columns", "api", "defaultSort", "setActiveRecord", "parentFilters", "parent", "where", "title", "showModal", "OrderModal", "permissions", "selected", "assigned", "available", "disableCellRedirect", "onAssignChange", "customStyle", "onCellClick", "showRowsSelected", "chartFilters", "clearChartFilter", "showFullScreenLoader", "customFilters", "onRowDoubleClick", "baseFilters", "onRowClick", "gridStyle", "reRenderKey", "additionalFilters", "onCellDoubleClickOverride", "onAddOverride", "dynamicColumns", "readOnly"],
  _excluded2 = ["row", "field", "id"],
  _excluded3 = ["filterField"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultPageSize = 10;
const sortRegex = /(\w+)( ASC| DESC)?/i;
const recordCounts = 60000;
const actionTypes = {
  Copy: "Copy",
  Edit: "Edit",
  Delete: "Delete",
  History: "History",
  Download: "Download",
  NavigateToRelation: "NavigateToRelation"
};
const constants = {
  gridFilterModel: {
    items: [],
    logicOperator: 'and',
    quickFilterValues: Array(0),
    quickFilterLogicOperator: 'and'
  },
  permissions: {
    edit: true,
    add: true,
    export: true,
    delete: true,
    clearFilterText: "CLEAR THIS FILTER",
    showColumnsOrder: true,
    filter: true
  }
};
const booleanIconRenderer = params => {
  if (params.value) {
    return /*#__PURE__*/_react.default.createElement(_Check.default, {
      style: {
        color: 'green'
      }
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(_Close.default, {
      style: {
        color: 'gray'
      }
    });
  }
};
const useStyles = (0, _core.makeStyles)({
  buttons: {
    margin: '6px !important'
  },
  deleteContent: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});
const convertDefaultSort = defaultSort => {
  const orderBy = [];
  if (typeof defaultSort === 'string') {
    const sortFields = defaultSort.split(',');
    for (const sortField of sortFields) {
      sortRegex.lastIndex = 0;
      const sortInfo = sortRegex.exec(sortField);
      if (sortInfo) {
        const [, field, direction = 'ASC'] = sortInfo;
        orderBy.push({
          field: field.trim(),
          sort: direction.trim().toLowerCase()
        });
      }
    }
  }
  return orderBy;
};
const ExportMenuItem = _ref => {
  let {
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
  }, "Export", " ", type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
};
ExportMenuItem.propTypes = {
  hideMenu: _propTypes.default.func
};
const CustomExportButton = props => /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarExportContainer, props, (props === null || props === void 0 ? void 0 : props.showOnlyExcelExport) !== true && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "csv",
  contentType: "text/csv"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "excel",
  contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
})), props.showPivotExportBtn && /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "excel With Pivot",
  contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  isPivotExport: true
})), (props === null || props === void 0 ? void 0 : props.showOnlyExcelExport) !== true && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "xml",
  contentType: "text/xml"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "html",
  contentType: "text/html"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "json",
  contentType: "application/json"
}))));
const areEqual = function areEqual() {
  let prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let equal = true;
  for (const o in prevProps) {
    if (prevProps[o] !== nextProps[o]) {
      equal = false;
    }
  }
  for (const o in nextProps) {
    if (!prevProps.hasOwnProperty(o)) {
      equal = false;
    }
  }
  return equal;
};
const GridBase = /*#__PURE__*/(0, _react.memo)(_ref2 => {
  var _stateData$gridSettin, _stateData$gridSettin2, _stateData$gridSettin3, _stateData$gridSettin4, _model$columns$find, _stateData$gridSettin5;
  let {
      showGrid = true,
      useLinkColumn = true,
      model,
      columns,
      api,
      defaultSort,
      setActiveRecord,
      parentFilters,
      parent,
      where,
      title,
      showModal,
      OrderModal,
      permissions,
      selected,
      assigned,
      available,
      disableCellRedirect = false,
      onAssignChange,
      customStyle,
      onCellClick,
      showRowsSelected,
      chartFilters,
      clearChartFilter,
      showFullScreenLoader,
      customFilters,
      onRowDoubleClick,
      baseFilters,
      onRowClick = () => {},
      gridStyle,
      reRenderKey,
      additionalFilters,
      onCellDoubleClickOverride,
      onAddOverride,
      dynamicColumns,
      readOnly = false
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded);
  const [paginationModel, setPaginationModel] = (0, _react.useState)({
    pageSize: defaultPageSize,
    page: 0
  });
  const [data, setData] = (0, _react.useState)({
    recordCount: 0,
    records: [],
    lookups: {}
  });
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const forAssignment = !!onAssignChange;
  const rowsSelected = showRowsSelected;
  const [selection, setSelection] = (0, _react.useState)([]);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = (0, _react.useState)(false);
  const [selectedOrder, setSelectedOrder] = (0, _react.useState)(null);
  const [visibilityModel, setVisibilityModel] = (0, _react.useState)(_objectSpread({
    CreatedOn: false,
    CreatedByUser: false
  }, model === null || model === void 0 ? void 0 : model.columnVisibilityModel));
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const [record, setRecord] = (0, _react.useState)(null);
  const snackbar = (0, _index.useSnackbar)();
  const isClient = model.isClient === true ? 'client' : 'server';
  const [errorMessage, setErrorMessage] = (0, _react.useState)('');
  const [sortModel, setSortModel] = (0, _react.useState)(convertDefaultSort(defaultSort || (model === null || model === void 0 ? void 0 : model.defaultSort)));
  const initialFilterModel = {
    items: [],
    logicOperator: 'and',
    quickFilterValues: Array(0),
    quickFilterLogicOperator: 'and'
  };
  if (model.defaultFilters) {
    initialFilterModel.items = [];
    model.defaultFilters.forEach(ele => {
      initialFilterModel.items.push(ele);
    });
  }
  const [filterModel, setFilterModel] = (0, _react.useState)(_objectSpread({}, initialFilterModel));
  const {
    navigate,
    getParams,
    useParams,
    pathname
  } = (0, _StateProvider.useRouter)();
  const {
    id: idWithOptions
  } = useParams() || getParams;
  const id = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split('-')[0];
  const apiRef = (0, _xDataGridPremium.useGridApiRef)();
  const {
    idProperty = "id",
    showHeaderFilters = true,
    disableRowSelectionOnClick = true,
    createdOnKeepLocal = true,
    hideBackButton = false,
    hideTopFilters = true,
    updatePageTitle = true,
    isElasticScreen = false,
    nestedGrid = false,
    selectionApi = {}
  } = model;
  const isReadOnly = model.readOnly === true || readOnly;
  const isDoubleClicked = model.doubleClicked === false;
  const dataRef = (0, _react.useRef)(data);
  const showAddIcon = model.showAddIcon === true;
  const toLink = model.columns.filter(_ref3 => {
    let {
      link
    } = _ref3;
    return Boolean(link);
  }).map(item => item.link);
  const [isGridPreferenceFetched, setIsGridPreferenceFetched] = (0, _react.useState)(false);
  const classes = useStyles();
  const {
    stateData,
    dispatchData,
    formatDate,
    removeCurrentPreferenceName,
    getAllSavedPreferences,
    applyDefaultPreferenceIfExists
  } = (0, _StateProvider.useStateContext)();
  const {
    timeZone
  } = stateData;
  const effectivePermissions = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, constants.permissions), stateData.gridSettings.permissions), model.permissions), permissions);
  const {
    Username
  } = stateData !== null && stateData !== void 0 && stateData.getUserData ? stateData.getUserData : {};
  const routesWithNoChildRoute = ((_stateData$gridSettin = stateData.gridSettings.permissions) === null || _stateData$gridSettin === void 0 ? void 0 : _stateData$gridSettin.routesWithNoChildRoute) || [];
  const url = stateData === null || stateData === void 0 || (_stateData$gridSettin2 = stateData.gridSettings) === null || _stateData$gridSettin2 === void 0 || (_stateData$gridSettin2 = _stateData$gridSettin2.permissions) === null || _stateData$gridSettin2 === void 0 ? void 0 : _stateData$gridSettin2.Url;
  const withControllersUrl = stateData === null || stateData === void 0 || (_stateData$gridSettin3 = stateData.gridSettings) === null || _stateData$gridSettin3 === void 0 || (_stateData$gridSettin3 = _stateData$gridSettin3.permissions) === null || _stateData$gridSettin3 === void 0 ? void 0 : _stateData$gridSettin3.withControllersUrl;
  const currentPreference = stateData === null || stateData === void 0 ? void 0 : stateData.currentPreference;
  const tablePreferenceEnums = stateData === null || stateData === void 0 || (_stateData$gridSettin4 = stateData.gridSettings) === null || _stateData$gridSettin4 === void 0 || (_stateData$gridSettin4 = _stateData$gridSettin4.permissions) === null || _stateData$gridSettin4 === void 0 ? void 0 : _stateData$gridSettin4.tablePreferenceEnums;
  const emptyIsAnyOfOperatorFilters = ["isEmpty", "isNotEmpty", "isAnyOf"];
  const userData = stateData.getUserData || {};
  const documentField = ((_model$columns$find = model.columns.find(ele => ele.type === 'document')) === null || _model$columns$find === void 0 ? void 0 : _model$columns$find.field) || "";
  const userDefinedPermissions = {
    add: effectivePermissions.add,
    edit: effectivePermissions.edit,
    delete: effectivePermissions.delete
  };
  const {
    canAdd,
    canEdit,
    canDelete
  } = (0, _utils.getPermissions)({
    userData,
    model,
    userDefinedPermissions
  });
  const filterFieldDataTypes = {
    Number: 'number',
    String: 'string',
    Boolean: 'boolean'
  };
  const {
    addUrlParamKey,
    searchParamKey,
    hideBreadcrumb = false,
    tableName,
    showHistory = true,
    hideBreadcrumbInGrid = false,
    navigateToRelation = [],
    breadcrumbColor
  } = model;
  const gridTitle = model.gridTitle || model.title;
  const OrderSuggestionHistoryFields = {
    OrderStatus: 'OrderStatusId'
  };
  const preferenceApi = stateData === null || stateData === void 0 || (_stateData$gridSettin5 = stateData.gridSettings) === null || _stateData$gridSettin5 === void 0 || (_stateData$gridSettin5 = _stateData$gridSettin5.permissions) === null || _stateData$gridSettin5 === void 0 ? void 0 : _stateData$gridSettin5.preferenceApi;
  const searchParams = new URLSearchParams(window.location.search);
  let baseSaveData = {};
  const selectedSet = (0, _react.useRef)(new Set());
  const baseDataFromParams = searchParams.has('baseData') && searchParams.get('baseData');
  if (baseDataFromParams) {
    const parsedData = JSON.parse(baseDataFromParams);
    if (typeof parsedData === 'object' && parsedData !== null) {
      baseSaveData = parsedData;
    }
  }
  const handleSelectRow = params => {
    const mergedRow = _objectSpread(_objectSpread({}, baseSaveData), params.row);
    const isAlreadySelected = Array.from(selectedSet.current).some(item => item[idProperty] === mergedRow[idProperty]);
    if (isAlreadySelected) {
      // Remove the object if it is already selected
      for (let item of selectedSet.current) {
        if (item[idProperty] === mergedRow[idProperty]) {
          selectedSet.current.delete(item);
          break;
        }
      }
    } else {
      // Add the object if it is not selected
      selectedSet.current.add(mergedRow);
    }
  };
  const customCheckBox = params => {
    return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      onClick: () => handleSelectRow(params),
      color: "primary",
      inputProps: {
        'aria-label': 'checkbox'
      }
    });
  };
  const gridColumnTypes = {
    "radio": {
      "type": "singleSelect",
      "valueOptions": "lookup"
    },
    "date": {
      "valueFormatter": value => formatDate({
        value,
        useSystemFormat: true,
        showOnlyDate: false,
        state: stateData.dateTime,
        timeZone
      }),
      "filterOperators": (0, _LocalizedDatePicker.default)({
        columnType: "date"
      })
    },
    "dateTime": {
      "valueFormatter": value => formatDate({
        value,
        useSystemFormat: false,
        showOnlyDate: false,
        state: stateData.dateTime,
        timeZone
      }),
      "filterOperators": (0, _LocalizedDatePicker.default)({
        columnType: "datetime"
      })
    },
    "dateTimeLocal": {
      "valueFormatter": value => formatDate({
        value,
        useSystemFormat: false,
        showOnlyDate: false,
        state: stateData.dateTime,
        timeZone
      }),
      "filterOperators": (0, _LocalizedDatePicker.default)({
        type: "dateTimeLocal",
        convert: true
      })
    },
    "boolean": {
      renderCell: booleanIconRenderer
    },
    "select": {
      "type": "singleSelect",
      "valueOptions": "lookup"
    },
    "selection": {
      renderCell: customCheckBox
    }
  };
  (0, _react.useEffect)(() => {
    dataRef.current = data;
  }, [data]);
  (0, _react.useEffect)(() => {
    if (customFilters && Object.keys(customFilters) != 0) {
      if (customFilters.clear) {
        let filterObject = {
          items: [],
          logicOperator: "and",
          quickFilterValues: [],
          quickFilterLogicOperator: "and"
        };
        setFilterModel(filterObject);
        return;
      } else {
        const newArray = [];
        for (const key in customFilters) {
          if (key === 'startDate' || key === 'endDate') {
            newArray.push(customFilters[key]);
          } else {
            if (customFilters.hasOwnProperty(key)) {
              const newObj = {
                field: key,
                value: customFilters[key],
                operator: "equals",
                type: "string"
              };
              newArray.push(newObj);
            }
          }
        }
        let filterObject = {
          items: newArray,
          logicOperator: "and",
          quickFilterValues: [],
          quickFilterLogicOperator: "and"
        };
        setFilterModel(filterObject);
      }
    }
  }, [customFilters]);
  const lookupOptions = _ref4 => {
    let {
        row,
        field,
        id
      } = _ref4,
      others = _objectWithoutProperties(_ref4, _excluded2);
    const lookupData = dataRef.current.lookups || {};
    return lookupData[lookupMap[field].lookup] || [];
  };
  (0, _react.useEffect)(() => {
    if (props.isChildGrid) {
      return;
    }
    if (hideTopFilters) {
      dispatchData({
        type: _actions.default.PASS_FILTERS_TOHEADER,
        payload: {
          filterButton: null,
          hidden: {
            search: true,
            operation: true,
            export: true,
            print: true,
            filter: true
          }
        }
      });
    }
  }, []);
  const {
    gridColumns,
    pinnedColumns,
    lookupMap
  } = (0, _react.useMemo)(() => {
    let baseColumnList = columns || (model === null || model === void 0 ? void 0 : model.gridColumns) || (model === null || model === void 0 ? void 0 : model.columns);
    if (dynamicColumns) {
      baseColumnList = [...dynamicColumns, ...baseColumnList];
    }
    const pinnedColumns = {
      left: [_xDataGridPremium.GRID_CHECKBOX_SELECTION_COL_DEF.field],
      right: []
    };
    const finalColumns = [];
    const lookupMap = {};
    for (const column of baseColumnList) {
      const overrides = {};
      if (column.headerName === null) {
        continue;
      }
      if (parent && column.lookup === parent) {
        continue;
      }
      if (column.type === 'oneToMany') {
        if (column.countInList === false) {
          continue;
        }
        overrides.type = 'number';
        overrides.field = column.field.replace(/s$/, 'Count');
      }
      if (gridColumnTypes[column.type]) {
        Object.assign(overrides, gridColumnTypes[column.type]);
      }
      if (overrides.valueOptions === "lookup") {
        overrides.valueOptions = lookupOptions;
        let lookupFilters = [...(0, _xDataGridPremium.getGridDateOperators)(), ...(0, _xDataGridPremium.getGridStringOperators)()].filter(operator => ['is', 'not', 'isAnyOf'].includes(operator.value));
        overrides.filterOperators = lookupFilters.map(operator => _objectSpread(_objectSpread({}, operator), {}, {
          InputComponent: operator.InputComponent ? params => /*#__PURE__*/_react.default.createElement(_CustomDropdownmenu.default, _extends({
            column: _objectSpread(_objectSpread({}, column), {}, {
              dataRef: dataRef
            })
          }, params, {
            autoHighlight: true
          })) : undefined
        }));
      }
      if (column.linkTo) {
        overrides.cellClassName = "mui-grid-linkColumn";
      }
      if (column.link) {
        overrides.cellClassName = "mui-grid-linkColumn";
      }
      finalColumns.push(_objectSpread(_objectSpread({
        headerName: column.headerName || column.label
      }, column), overrides));
      if (column.pinned) {
        pinnedColumns[column.pinned === 'right' ? 'right' : 'left'].push(column.field);
      }
      lookupMap[column.field] = column;
      column.label = column === null || column === void 0 ? void 0 : column.label;
    }
    const auditColumns = model.standard === true;
    if (auditColumns && (model === null || model === void 0 ? void 0 : model.addCreatedModifiedColumns) !== false) {
      if ((model === null || model === void 0 ? void 0 : model.addCreatedOnColumn) !== false) {
        finalColumns.push({
          field: "CreatedOn",
          type: "dateTime",
          headerName: "Created On",
          width: 200,
          filterOperators: (0, _LocalizedDatePicker.default)({
            columnType: "date"
          }),
          valueFormatter: gridColumnTypes.dateTime.valueFormatter,
          keepLocal: true
        });
      }
      if ((model === null || model === void 0 ? void 0 : model.addCreatedByColumn) !== false) {
        finalColumns.push({
          field: "CreatedByUser",
          type: "string",
          headerName: "Created By",
          width: 200
        });
      }
      if ((model === null || model === void 0 ? void 0 : model.addModifiedOnColumn) !== false) {
        finalColumns.push({
          field: "ModifiedOn",
          type: "dateTime",
          headerName: "Modified On",
          width: 200,
          filterOperators: (0, _LocalizedDatePicker.default)({
            columnType: "date"
          }),
          valueFormatter: gridColumnTypes.dateTime.valueFormatter,
          keepLocal: true
        });
      }
      if ((model === null || model === void 0 ? void 0 : model.addModifiedByColumn) !== false) {
        finalColumns.push({
          field: "ModifiedByUser",
          type: "string",
          headerName: "Modified By",
          width: 200
        });
      }
    }
    const actions = [];
    if (!forAssignment && !isReadOnly) {
      if (canEdit) {
        actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
            title: "Edit"
          }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)),
          "data-action": actionTypes.Edit,
          label: "Edit",
          color: "primary"
        }));
      }
      if (effectivePermissions.copy) {
        actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
            title: "Copy"
          }, /*#__PURE__*/_react.default.createElement(_FileCopy.default, null), " "),
          "data-action": actionTypes.Copy,
          label: "Copy",
          color: "primary"
        }));
      }
      if (canDelete) {
        actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
            title: "Delete"
          }, /*#__PURE__*/_react.default.createElement(_Delete.default, null), " "),
          "data-action": actionTypes.Delete,
          label: "Delete",
          color: "error"
        }));
      }
      if (showHistory) {
        actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
            title: "History"
          }, /*#__PURE__*/_react.default.createElement(_History.default, null), " "),
          "data-action": actionTypes.History,
          label: "History",
          color: "primary"
        }));
      }
      if (navigateToRelation.length > 0) {
        actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
            title: ""
          }, /*#__PURE__*/_react.default.createElement(_Article.default, null), " "),
          "data-action": actionTypes.NavigateToRelation,
          color: "primary",
          label: ""
        }));
      }
    }
    if (documentField.length) {
      actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
        icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
          title: "Download document"
        }, /*#__PURE__*/_react.default.createElement(_FileDownload.default, null), " "),
        "data-action": actionTypes.Download,
        label: "Download document",
        color: "primary"
      }));
    }
    if (actions.length > 0) {
      finalColumns.push({
        field: 'actions',
        type: 'actions',
        label: '',
        width: actions.length * 50,
        hideable: false,
        getActions: params => {
          const rowActions = [...actions];
          const isDisabled = params.row.canEdit === false;
          if (canEdit && !isReadOnly) {
            rowActions[0] = /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
              icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
                title: "Edit"
              }, /*#__PURE__*/_react.default.createElement(_Edit.default, null)),
              "data-action": actionTypes.Edit,
              label: "Edit",
              color: "primary",
              disabled: isDisabled
            });
          }
          return rowActions;
        }
      });
    }
    pinnedColumns.right.push('actions');
    return {
      gridColumns: finalColumns,
      pinnedColumns,
      lookupMap
    };
  }, [columns, model, parent, permissions, forAssignment, dynamicColumns]);
  const fetchData = function fetchData() {
    var _chartFilters$items;
    let action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "list";
    let extraParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let contentType = arguments.length > 2 ? arguments[2] : undefined;
    let columns = arguments.length > 3 ? arguments[3] : undefined;
    let isPivotExport = arguments.length > 4 ? arguments[4] : undefined;
    let isElasticExport = arguments.length > 5 ? arguments[5] : undefined;
    const {
      pageSize,
      page
    } = paginationModel;
    let gridApi = "".concat(model.controllerType === 'cs' ? withControllersUrl : url || "").concat(model.api || api);
    let controllerType = model === null || model === void 0 ? void 0 : model.controllerType;
    if (isPivotExport) {
      gridApi = "".concat(withControllersUrl).concat(model === null || model === void 0 ? void 0 : model.pivotAPI);
      controllerType = 'cs';
    }
    if (assigned || available) {
      extraParams[assigned ? "include" : "exclude"] = Array.isArray(selected) ? selected.join(',') : selected;
    }
    let filters = _objectSpread({}, filterModel),
      finalFilters = _objectSpread({}, filterModel);
    if ((chartFilters === null || chartFilters === void 0 || (_chartFilters$items = chartFilters.items) === null || _chartFilters$items === void 0 ? void 0 : _chartFilters$items.length) > 0) {
      let {
        columnField: field,
        operatorValue: operator
      } = chartFilters.items[0];
      field = constants.chartFilterFields[field];
      const chartFilter = [{
        field: field,
        operator: operator,
        isChartFilter: false
      }];
      filters.items = [...chartFilter];
      if (JSON.stringify(filterModel) !== JSON.stringify(filters)) {
        setFilterModel(_objectSpread({}, filters));
        finalFilters = filters;
        chartFilters.items.length = 0;
      }
    }
    if (model.joinColumn && id) {
      baseFilters = [{
        field: model.joinColumn,
        operator: 'is',
        type: "number",
        value: Number(id)
      }];
    }
    if (additionalFilters) {
      finalFilters.items = [...finalFilters.items, ...additionalFilters];
    }
    (0, _crudHelper.getList)({
      action,
      page: !contentType ? page : 0,
      pageSize: !contentType ? pageSize : 1000000,
      sortModel,
      filterModel: finalFilters,
      controllerType: controllerType,
      api: gridApi,
      setIsLoading,
      setData,
      gridColumns,
      modelConfig: model,
      parentFilters,
      extraParams,
      setError: snackbar.showError,
      contentType,
      columns,
      template: isPivotExport ? model === null || model === void 0 ? void 0 : model.template : null,
      configFileName: isPivotExport ? model === null || model === void 0 ? void 0 : model.configFileName : null,
      dispatchData,
      showFullScreenLoader,
      history: navigate,
      baseFilters,
      isElasticExport,
      model: model
    });
  };
  const openForm = _ref5 => {
    let {
      id,
      record = {},
      mode
    } = _ref5;
    if (setActiveRecord) {
      (0, _crudHelper.getRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        setIsLoading,
        setActiveRecord,
        modelConfig: model,
        parentFilters,
        where,
        model
      });
      return;
    }
    let path = pathname;
    if (!path.endsWith("/")) {
      path += "/";
    }
    if (mode === "copy") {
      path += "0-" + id;
      dispatchData({
        type: 'UPDATE_FORM_MODE',
        payload: 'copy'
      });
    } else {
      path += id;
      dispatchData({
        type: 'UPDATE_FORM_MODE',
        payload: ''
      });
    }
    if (addUrlParamKey) {
      searchParams.set(addUrlParamKey, record[addUrlParamKey]);
      path += "?".concat(searchParams.toString());
    }
    navigate(path);
  };
  const handleDownload = async _ref6 => {
    let {
      documentLink,
      fileName
    } = _ref6;
    if (!documentLink) return;
    try {
      const response = await fetch(documentLink);
      if (!response.ok) {
        throw new Error("Failed to fetch the file: ".concat(response.statusText));
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Derive a file name from the URL or fall back to default
      const fileNameFromLink = documentLink.split("/").pop() || "downloaded-file.".concat(blob.type.split("/")[1] || "txt");
      link.download = fileName || fileNameFromLink;

      // Append the link to the DOM and trigger a click
      document.body.appendChild(link);
      link.click();

      // Cleanup after the download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(documentLink);
      console.error("Error downloading the file:", error);
    }
  };
  const onCellClickHandler = async (cellParams, event, details) => {
    let action = useLinkColumn && cellParams.field === model.linkColumn ? actionTypes.Edit : null;
    if (!action && cellParams.field === 'actions') {
      action = details === null || details === void 0 ? void 0 : details.action;
      if (!action) {
        const el = event.target.closest('button');
        if (el) {
          action = el.dataset.action;
        }
      }
    }
    const {
      row: record
    } = cellParams;
    if (!isReadOnly) {
      if (onCellClick) {
        const result = await onCellClick({
          cellParams,
          event,
          details
        });
        if (typeof result !== "boolean") {
          return;
        }
      }
      const columnConfig = lookupMap[cellParams.field] || {};
      if (columnConfig.linkTo) {
        navigate({
          pathname: _template.default.replaceTags(columnConfig.linkTo, record)
        });
        return;
      }
      if (action === actionTypes.Edit) {
        return openForm({
          id: record[idProperty],
          record
        });
      }
      if (action === actionTypes.Copy) {
        return openForm({
          id: record[idProperty],
          mode: 'copy'
        });
      }
      if (action === actionTypes.Delete) {
        setIsDeleting(true);
        setRecord({
          name: record[model === null || model === void 0 ? void 0 : model.linkColumn],
          id: record[idProperty]
        });
      }
      if (action === actionTypes.History) {
        return navigate("historyScreen?tableName=".concat(tableName, "&id=").concat(record[idProperty], "&breadCrumb=").concat(searchParamKey ? searchParams.get(searchParamKey) : gridTitle));
      }
      if (action === actionTypes.NavigateToRelation) {
        return navigate("/masterScope/".concat(record[idProperty], "?showRelation=").concat(navigateToRelation));
      }
    }
    if (action === actionTypes.Download) {
      handleDownload({
        documentLink: record[documentField],
        fileName: record.FileName
      });
    }
    if (toLink.length) {
      if (model !== null && model !== void 0 && model.isAcostaController && onCellClick && cellParams.colDef.customCellClick === true) {
        onCellClick(cellParams.row);
        return;
      }
      const {
        row: record
      } = cellParams;
      const columnConfig = lookupMap[cellParams.field] || {};
      let historyObject = {
        pathname: _template.default.replaceTags(columnConfig.linkTo, record)
      };
      if (model.addRecordToState) {
        historyObject.state = record;
      }
      navigate(historyObject);
    }
  };
  const handleDelete = async function handleDelete() {
    let gridApi = "".concat(model.controllerType === 'cs' ? withControllersUrl : url).concat(model.api || api);
    const result = await (0, _crudHelper.deleteRecord)({
      id: record === null || record === void 0 ? void 0 : record.id,
      api: gridApi,
      setIsLoading,
      setError: snackbar.showError,
      setErrorMessage
    });
    if (result === true) {
      setIsDeleting(false);
      snackbar.showMessage('Record Deleted Successfully.');
      fetchData();
    } else {
      setTimeout(() => {
        setIsDeleting(false);
      }, 200);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  const processRowUpdate = updatedRow => {
    if (props.processRowUpdate) {
      props.processRowUpdate(updatedRow, data);
    }
    return updatedRow;
  };
  const onCellDoubleClick = event => {
    const {
      row: record
    } = event;
    if (typeof onCellDoubleClickOverride === 'function') {
      onCellDoubleClickOverride(event);
      return;
    }
    if (event.row.canEdit === false) {
      return;
    }
    if (!isReadOnly && !isDoubleClicked && !disableCellRedirect) {
      openForm({
        id: record[idProperty],
        record
      });
    }
    if (isReadOnly && model.rowRedirectLink) {
      let historyObject = {
        pathname: _template.default.replaceTags(model.rowRedirectLink, record)
      };
      if (model.addRecordToState) {
        historyObject.state = record;
      }
      navigate(historyObject);
    }
    if (onRowDoubleClick) {
      onRowDoubleClick(event);
    }
  };
  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrder(null);
    fetchData();
  };
  const onAdd = () => {
    if (selectionApi.length > 0) {
      var _stateData$gridSettin6;
      const url = stateData === null || stateData === void 0 || (_stateData$gridSettin6 = stateData.gridSettings) === null || _stateData$gridSettin6 === void 0 || (_stateData$gridSettin6 = _stateData$gridSettin6.permissions) === null || _stateData$gridSettin6 === void 0 ? void 0 : _stateData$gridSettin6.Url;
      let gridApi = "".concat(url).concat(selectionApi || api, "/updateMany");
      if (selectedSet.current.size < 1) {
        snackbar.showError("Please select atleast one record to proceed");
        setIsLoading(false);
        return;
      }
      (0, _crudHelper.saveRecord)({
        id: 0,
        api: gridApi,
        values: {
          items: Array.from(selectedSet.current)
        },
        setIsLoading,
        setError: snackbar.showError
      }).then(success => {
        if (success) {
          fetchData();
          snackbar.showMessage("Record Added Successfully.");
        }
      }).catch(err => {
        snackbar.showError("An error occured, please try after some time.second", err);
      }).finally(() => setIsLoading(false));
      return;
    }
    if (typeof onAddOverride === 'function') {
      onAddOverride();
    } else {
      openForm({
        id: 0
      });
    }
  };
  const clearFilters = () => {
    var _filterModel$items;
    if ((filterModel === null || filterModel === void 0 || (_filterModel$items = filterModel.items) === null || _filterModel$items === void 0 ? void 0 : _filterModel$items.length) > 0) {
      const filters = JSON.parse(JSON.stringify(constants.gridFilterModel));
      setFilterModel(filters);
      if (clearChartFilter) {
        clearChartFilter();
      }
    }
  };
  const updateAssignment = _ref7 => {
    let {
      unassign,
      assign
    } = _ref7;
    const assignedValues = Array.isArray(selected) ? selected : selected.length ? selected.split(',') : [];
    const finalValues = unassign ? assignedValues.filter(id => !unassign.includes(parseInt(id))) : [...assignedValues, ...assign];
    onAssignChange(typeof selected === 'string' ? finalValues.join(',') : finalValues);
  };
  const onAssign = () => {
    updateAssignment({
      assign: selection
    });
  };
  const onUnassign = () => {
    updateAssignment({
      unassign: selection
    });
  };
  (0, _react.useEffect)(() => {
    if (model.preferenceId && preferenceApi) {
      removeCurrentPreferenceName({
        dispatchData
      });
      getAllSavedPreferences({
        preferenceName: model.preferenceId,
        history: navigate,
        dispatchData,
        Username,
        preferenceApi,
        tablePreferenceEnums
      });
      applyDefaultPreferenceIfExists({
        preferenceName: model.preferenceId,
        history: navigate,
        dispatchData,
        Username,
        gridRef: apiRef,
        setIsGridPreferenceFetched,
        preferenceApi,
        tablePreferenceEnums
      });
    }
  }, [preferenceApi]);
  const CustomToolbar = function CustomToolbar(props) {
    const addtext = model.customAddText || (model.title ? "Add ".concat(model.title) : 'Add');
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px'
      }
    }, model.gridSubTitle && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      component: "h3",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, " ", model.gridSubTitle), currentPreference && model.showPreferenceInHeader && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      className: "preference-name-text",
      variant: "h6",
      component: "h6",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, "Applied Preference - ", currentPreference), (isReadOnly || !canAdd && !forAssignment) && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      component: "h3",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, " ", !canAdd || isReadOnly ? "" : model.title), !forAssignment && canAdd && !isReadOnly && !showAddIcon && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: !showAddIcon ? null : /*#__PURE__*/_react.default.createElement(_Add.default, null),
      onClick: onAdd,
      size: "medium",
      variant: "contained",
      className: classes.buttons
    }, addtext), available && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: !showAddIcon ? null : /*#__PURE__*/_react.default.createElement(_Add.default, null),
      onClick: onAssign,
      size: "medium",
      variant: "contained",
      className: classes.buttons
    }, "Assign"), assigned && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: !showAddIcon ? null : /*#__PURE__*/_react.default.createElement(_Remove.default, null),
      onClick: onUnassign,
      size: "medium",
      variant: "contained",
      className: classes.buttons
    }, "Remove"), /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarContainer, props, effectivePermissions.showColumnsOrder && /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarColumnsButton, null), effectivePermissions.filter && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarFilterButton, null), /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_FilterListOff.default, null),
      onClick: clearFilters,
      size: "small"
    }, "CLEAR FILTER")), effectivePermissions.export && /*#__PURE__*/_react.default.createElement(CustomExportButton, {
      handleExport: handleExport,
      showPivotExportBtn: model === null || model === void 0 ? void 0 : model.showPivotExportBtn,
      showOnlyExcelExport: model.showOnlyExcelExport
    }), model.preferenceId && /*#__PURE__*/_react.default.createElement(_GridPreference.default, {
      preferenceName: model.preferenceId,
      gridRef: apiRef,
      columns: gridColumns,
      setIsGridPreferenceFetched: setIsGridPreferenceFetched
    })));
  };
  const getGridRowId = row => {
    return row[idProperty];
  };
  const handleExport = e => {
    if ((data === null || data === void 0 ? void 0 : data.recordCount) > recordCounts) {
      snackbar.showMessage('Cannot export more than 60k records, please apply filters or reduce your results using filters');
      return;
    }
    const {
      orderedFields,
      columnVisibilityModel,
      lookup
    } = apiRef.current.state.columns;
    const columns = {};
    const isPivotExport = e.target.dataset.isPivotExport === 'true';
    const hiddenColumns = Object.keys(columnVisibilityModel).filter(key => columnVisibilityModel[key] === false);
    const nonExportColumns = new Set();
    gridColumns.forEach(_ref8 => {
      let {
        exportable,
        field
      } = _ref8;
      if (exportable === false) nonExportColumns.add(field);
    });
    const visibleColumns = orderedFields.filter(ele => !nonExportColumns.has(ele) && !(hiddenColumns !== null && hiddenColumns !== void 0 && hiddenColumns.includes(ele)) && ele !== '__check__' && ele !== 'actions');
    if ((visibleColumns === null || visibleColumns === void 0 ? void 0 : visibleColumns.length) === 0) {
      snackbar.showMessage('You cannot export while all columns are hidden... please show at least 1 column before exporting');
      return;
    }
    visibleColumns.forEach(ele => {
      var _lookup$ele;
      columns[ele] = {
        field: ele,
        width: lookup[ele].width,
        headerName: lookup[ele].headerName || lookup[ele].field,
        type: lookup[ele].type,
        keepLocal: lookup[ele].keepLocal === true,
        isParsable: (_lookup$ele = lookup[ele]) === null || _lookup$ele === void 0 ? void 0 : _lookup$ele.isParsable,
        lookup: lookup[ele].lookup
      };
    });
    fetchData(isPivotExport ? 'export' : undefined, undefined, e.target.dataset.contentType, columns, isPivotExport, isElasticScreen);
  };
  (0, _react.useEffect)(() => {
    if (url) {
      fetchData();
    }
  }, [paginationModel, sortModel, filterModel, api, gridColumns, model, parentFilters, assigned, selected, available, chartFilters, isGridPreferenceFetched, reRenderKey, url]);
  (0, _react.useEffect)(() => {
    if (props.isChildGrid) {
      return;
    }
    if (forAssignment || !updatePageTitle) {
      return;
    }
    dispatchData({
      type: _actions.default.PAGE_TITLE_DETAILS,
      payload: {
        icon: "",
        titleHeading: (model === null || model === void 0 ? void 0 : model.pageTitle) || (model === null || model === void 0 ? void 0 : model.title),
        titleDescription: model === null || model === void 0 ? void 0 : model.titleDescription,
        title: model === null || model === void 0 ? void 0 : model.title
      }
    });
    return () => {
      dispatchData({
        type: _actions.default.PAGE_TITLE_DETAILS,
        payload: null
      });
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (props.isChildGrid) {
      return;
    }
    let backRoute = pathname;

    // we do not need to show the back button for these routes
    if (hideBackButton || routesWithNoChildRoute.includes(backRoute)) {
      dispatchData({
        type: _actions.default.SET_PAGE_BACK_BUTTON,
        payload: {
          status: false,
          backRoute: ''
        }
      });
      return;
    }
    backRoute = backRoute.split("/");
    backRoute.pop();
    backRoute = backRoute.join("/");
    dispatchData({
      type: _actions.default.SET_PAGE_BACK_BUTTON,
      payload: {
        status: true,
        backRoute: backRoute
      }
    });
  }, [isLoading]);
  const updateFilters = e => {
    var _e$items, _chartFilters$items2;
    const {
      items
    } = e;
    const updatedItems = items.map(item => {
      const {
        field,
        operator,
        type,
        value
      } = item;
      const column = gridColumns.find(col => col.field === field);
      const isNumber = (column === null || column === void 0 ? void 0 : column.type) === filterFieldDataTypes.Number;
      if (isNumber && value < 0) {
        return _objectSpread(_objectSpread({}, item), {}, {
          value: null
        });
      }
      if (field === OrderSuggestionHistoryFields.OrderStatus) {
        const {
            filterField
          } = item,
          newItem = _objectWithoutProperties(item, _excluded3);
        return newItem;
      }
      if (emptyIsAnyOfOperatorFilters.includes(operator) || isNumber && !isNaN(value) || !isNumber) {
        var _gridColumns$filter$;
        const isKeywordField = isElasticScreen && ((_gridColumns$filter$ = gridColumns.filter(element => (element === null || element === void 0 ? void 0 : element.field) === (item === null || item === void 0 ? void 0 : item.field))[0]) === null || _gridColumns$filter$ === void 0 ? void 0 : _gridColumns$filter$.isKeywordField);
        if (isKeywordField) {
          item.filterField = "".concat(item.field, ".keyword");
        }
        return _objectSpread(_objectSpread({}, item), {}, {
          type: column.type
        });
      }
      const updatedValue = isNumber ? null : value;
      return {
        field,
        operator,
        type,
        value: updatedValue
      };
    });
    e.items = updatedItems;
    setFilterModel(e);
    if ((e === null || e === void 0 || (_e$items = e.items) === null || _e$items === void 0 ? void 0 : _e$items.findIndex(ele => ele.isChartFilter && !['isEmpty', 'isNotEmpty'].includes(ele.operator))) === -1) {
      if (clearChartFilter) {
        clearChartFilter();
      }
    }
    if ((chartFilters === null || chartFilters === void 0 || (_chartFilters$items2 = chartFilters.items) === null || _chartFilters$items2 === void 0 ? void 0 : _chartFilters$items2.length) > 0) {
      if (e.items.length === 0) {
        if (clearChartFilter) {
          clearChartFilter();
        }
      } else {
        const chartFilterIndex = chartFilters === null || chartFilters === void 0 ? void 0 : chartFilters.items.findIndex(ele => ele.columnField === e.items[0].field);
        if (chartFilterIndex > -1) {
          if (clearChartFilter) {
            clearChartFilter();
          }
        }
      }
    }
  };
  const updateSort = e => {
    const sort = e.map(ele => {
      const field = gridColumns.filter(element => (element === null || element === void 0 ? void 0 : element.field) === (ele === null || ele === void 0 ? void 0 : ele.field))[0] || {};
      const isKeywordField = isElasticScreen && field.isKeywordField;
      const obj = _objectSpread(_objectSpread({}, ele), {}, {
        filterField: isKeywordField ? "".concat(ele.field, ".keyword") : ele.field
      });
      if (field.dataIndex) {
        obj.filterField = field.dataIndex;
      }
      return obj;
    });
    setSortModel(sort);
  };
  let breadCrumbs;
  if (searchParamKey) {
    const subBreadcrumbs = searchParams.get(searchParamKey);
    breadCrumbs = [{
      text: subBreadcrumbs
    }];
  } else {
    breadCrumbs = [{
      text: title || model.gridTitle || model.title
    }];
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageTitle.default, {
    showBreadcrumbs: !hideBreadcrumb && !hideBreadcrumbInGrid,
    breadcrumbs: breadCrumbs,
    nestedGrid: nestedGrid,
    breadcrumbColor: breadcrumbColor
  }), /*#__PURE__*/_react.default.createElement(_material.Card, {
    style: gridStyle || customStyle,
    elevation: 0,
    sx: {
      '& .MuiCardContent-root': {
        p: 0
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardContent, null, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.DataGridPremium, {
    sx: {
      "& .MuiTablePagination-selectLabel": {
        marginTop: 2
      },
      "& .MuiTablePagination-displayedRows": {
        marginTop: 2
      },
      "& .MuiDataGrid-columnHeader .MuiInputLabel-shrink": {
        display: "none"
      }
    },
    unstable_headerFilters: showHeaderFilters,
    checkboxSelection: forAssignment,
    loading: isLoading,
    className: "pagination-fix",
    onCellClick: onCellClickHandler,
    onCellDoubleClick: onCellDoubleClick,
    columns: gridColumns,
    paginationModel: paginationModel,
    pageSizeOptions: [5, 10, 20, 50, 100],
    onPaginationModelChange: setPaginationModel,
    pagination: true,
    rowCount: data.recordCount,
    rows: data.records,
    sortModel: sortModel,
    paginationMode: isClient,
    sortingMode: isClient,
    filterMode: isClient,
    processRowUpdate: processRowUpdate,
    keepNonExistentRowsSelected: true,
    onSortModelChange: updateSort,
    onFilterModelChange: updateFilters,
    rowSelection: selection,
    onRowSelectionModelChange: setSelection,
    filterModel: filterModel,
    getRowId: getGridRowId,
    onRowClick: onRowClick,
    slots: {
      headerFilterMenu: false,
      toolbar: CustomToolbar,
      footer: _footer.Footer
    },
    slotProps: {
      footer: {
        pagination: true,
        apiRef
      },
      panel: {
        placement: "bottom-end"
      }
    },
    hideFooterSelectedRowCount: rowsSelected,
    density: "compact",
    disableDensitySelector: true,
    apiRef: apiRef,
    disableAggregation: true,
    disableRowGrouping: true,
    disableRowSelectionOnClick: disableRowSelectionOnClick,
    autoHeight: true,
    initialState: {
      columns: {
        columnVisibilityModel: visibilityModel
      },
      pinnedColumns: pinnedColumns
    },
    localeText: {
      filterValueTrue: 'Yes',
      filterValueFalse: 'No'
    }
  }), isOrderDetailModalOpen && selectedOrder && model.OrderModal && /*#__PURE__*/_react.default.createElement(model.OrderModal, {
    orderId: selectedOrder.OrderId,
    isOpen: true,
    orderTotal: selectedOrder.OrderTotal,
    orderDate: selectedOrder.OrderDateTime,
    orderStatus: selectedOrder.OrderStatus,
    customerNumber: selectedOrder.CustomerPhoneNumber,
    customerName: selectedOrder.CustomerName,
    customerEmail: selectedOrder.CustomerEmailAddress,
    onClose: handleCloseOrderDetailModal
  }), errorMessage && /*#__PURE__*/_react.default.createElement(_index2.DialogComponent, {
    open: !!errorMessage,
    onConfirm: clearError,
    onCancel: clearError,
    title: "Info",
    hideCancelButton: true
  }, " ", errorMessage), isDeleting && !errorMessage && /*#__PURE__*/_react.default.createElement(_index2.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => setIsDeleting(false),
    title: "Confirm Delete"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.deleteContent
  }, "Are you sure you want to delete ", record.name && /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    style: {
      display: "inline"
    },
    title: record.name,
    arrow: true
  }, record.name.length > 30 ? "".concat(record.name.slice(0, 30), "...") : record.name), " ?")))));
}, areEqual);
var _default = exports.default = GridBase;