"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.every.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
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
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _FileCopy = _interopRequireDefault(require("@mui/icons-material/FileCopy"));
var _Article = _interopRequireDefault(require("@mui/icons-material/Article"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _FilterListOff = _interopRequireDefault(require("@mui/icons-material/FilterListOff"));
var _react = _interopRequireWildcard(require("react"));
var _Add = _interopRequireDefault(require("@mui/icons-material/Add"));
var _Remove = _interopRequireDefault(require("@mui/icons-material/Remove"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _index = require("../SnackBar/index");
var _index2 = require("../Dialog/index");
var _crudHelper = require("./crud-helper");
var _footer = require("./footer");
var _template = _interopRequireDefault(require("./template"));
var _material = require("@mui/material");
var _Check = _interopRequireDefault(require("@mui/icons-material/Check"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _makeStyles = _interopRequireDefault(require("@mui/styles/makeStyles"));
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
var _reactI18next = require("react-i18next");
var _helper = require("./helper");
const _excluded = ["model", "columns", "api", "defaultSort", "setActiveRecord", "parentFilters", "parent", "where", "title", "permissions", "selected", "assigned", "available", "disableCellRedirect", "onAssignChange", "customStyle", "onCellClick", "showRowsSelected", "chartFilters", "clearChartFilter", "showFullScreenLoader", "customFilters", "onRowDoubleClick", "onRowClick", "gridStyle", "reRenderKey", "additionalFilters", "onCellDoubleClickOverride", "onAddOverride", "dynamicColumns", "readOnly"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const defaultPageSize = 10;
const sortRegex = /(\w+)( ASC| DESC)?/i;
const recordCounts = 60000;
const actionTypes = {
  Copy: "Copy",
  Edit: "Edit",
  Delete: "Delete",
  History: "History",
  Download: "Download"
};
const iconMapper = {
  'article': /*#__PURE__*/_react.default.createElement(_Article.default, null)
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
    showColumnsOrder: true,
    filter: true
  },
  client: 'client',
  server: 'server',
  object: 'object',
  startDate: 'startDate',
  endDate: 'endDate',
  oneToMany: 'oneToMany',
  lookup: 'lookup',
  Number: 'number',
  string: 'string',
  boolean: 'boolean',
  right: 'right',
  left: 'left',
  dateTime: 'dateTime',
  actions: 'actions',
  function: 'function',
  pageSizeOptions: [5, 10, 20, 50, 100]
};
const auditColumnMappings = [{
  key: 'addCreatedOnColumn',
  field: 'CreatedOn',
  type: 'dateTime',
  header: 'Created On'
}, {
  key: 'addCreatedByColumn',
  field: 'CreatedByUser',
  type: 'string',
  header: 'Created By'
}, {
  key: 'addModifiedOnColumn',
  field: 'ModifiedOn',
  type: 'dateTime',
  header: 'Modified On'
}, {
  key: 'addModifiedByColumn',
  field: 'ModifiedByUser',
  type: 'string',
  header: 'Modified By'
}];
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
const useStyles = (0, _makeStyles.default)({
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
const GridBase = /*#__PURE__*/(0, _react.memo)(_ref => {
  var _model$columns$find, _model$tTranslate, _model$module;
  let {
      model,
      columns,
      api,
      defaultSort,
      setActiveRecord,
      parentFilters,
      parent,
      where,
      title,
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
      onRowClick = () => {},
      gridStyle,
      reRenderKey,
      additionalFilters,
      onCellDoubleClickOverride,
      onAddOverride,
      dynamicColumns,
      readOnly = false
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
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
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const [record, setRecord] = (0, _react.useState)(null);
  const visibilityModel = _objectSpread({
    CreatedOn: false,
    CreatedByUser: false
  }, model.columnVisibilityModel);
  const [showAddConfirmation, setShowAddConfirmation] = (0, _react.useState)(false);
  const snackbar = (0, _index.useSnackbar)();
  const paginationMode = model.paginationMode === constants.client ? constants.client : constants.server;
  const {
    t: translate,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const tOpts = {
    t: translate,
    i18n
  };
  const [errorMessage, setErrorMessage] = (0, _react.useState)('');
  const [sortModel, setSortModel] = (0, _react.useState)((0, _helper.convertDefaultSort)(defaultSort || model.defaultSort, constants, sortRegex));
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
    hideBackButton = false,
    hideTopFilters = true,
    updatePageTitle = true,
    isElasticScreen = false,
    navigateBack = false,
    selectionApi = {}
  } = model;
  const isReadOnly = model.readOnly === true || readOnly;
  const isDoubleClicked = model.allowDoubleClick === false;
  const dataRef = (0, _react.useRef)(data);
  const showAddIcon = model.showAddIcon === true;
  const toLink = model.columns.filter(_ref2 => {
    let {
      link
    } = _ref2;
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
  const {
    gridSettings: {
      permissions: {
        routesWithNoChildRoute = [],
        Url: url,
        withControllersUrl,
        defaultPreferenceEnums,
        preferenceApi,
        historyScreenName = "historyScreen"
      } = {}
    } = {},
    currentPreference
  } = stateData;
  const emptyIsAnyOfOperatorFilters = ["isEmpty", "isNotEmpty", "isAnyOf"];
  const userData = stateData.getUserData || {};
  const documentField = ((_model$columns$find = model.columns.find(ele => ele.type === 'fileUpload')) === null || _model$columns$find === void 0 ? void 0 : _model$columns$find.field) || "";
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
  const tTranslate = (_model$tTranslate = model.tTranslate) !== null && _model$tTranslate !== void 0 ? _model$tTranslate : key => key;
  const {
    addUrlParamKey,
    searchParamKey,
    hideBreadcrumb = false,
    tableName,
    showHistory = true,
    hideBreadcrumbInGrid = false,
    breadcrumbColor
  } = model;
  const gridTitle = model.gridTitle || model.title;
  const preferenceName = model.preferenceId || ((_model$module = model.module) === null || _model$module === void 0 ? void 0 : _model$module.preferenceId);
  const searchParams = new URLSearchParams(window.location.search);
  const baseDataFromParams = searchParams.has('baseData') && searchParams.get('baseData');
  const baseSaveData = (() => {
    if (baseDataFromParams) {
      const parsedData = JSON.parse(baseDataFromParams);
      if (typeof parsedData === constants.object && parsedData !== null) {
        return parsedData;
      }
    }
    return {};
  })();
  const selectedSet = (0, _react.useRef)(new Set());
  const handleSelectRow = _ref3 => {
    let {
      row
    } = _ref3;
    const rowId = row[idProperty];
    const isSelected = selectedSet.current.has(rowId);
    if (isSelected) {
      selectedSet.current.delete(rowId);
    } else {
      selectedSet.current.add(rowId);
    }
    setSelection(Array.from(selectedSet.current));
  };
  const CustomCheckBox = params => {
    const rowId = params.row[idProperty];
    const [isCheckedLocal, setIsCheckedLocal] = (0, _react.useState)(selectedSet.current.has(rowId));
    (0, _react.useEffect)(() => {
      setIsCheckedLocal(selectedSet.current.has(rowId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.row, selectedSet.current.size]);
    const handleCheckboxClick = event => {
      event.stopPropagation();
      handleSelectRow(params);
    };
    return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      onClick: handleCheckboxClick,
      checked: isCheckedLocal,
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
      renderCell: params => /*#__PURE__*/_react.default.createElement(CustomCheckBox, params)
    }
  };
  (0, _react.useEffect)(() => {
    dataRef.current = data;
  }, [data]);
  (0, _react.useEffect)(() => {
    if (!customFilters || !Object.keys(customFilters).length) return;
    if (customFilters.clear) {
      setFilterModel({
        items: [],
        logicOperator: "and",
        quickFilterValues: [],
        quickFilterLogicOperator: "and"
      });
      return;
    }
    const items = Object.entries(customFilters).reduce((acc, _ref4) => {
      let [key, value] = _ref4;
      if (key === constants.startDate || key === constants.endDate) {
        acc.push(value);
      } else if (key in customFilters) {
        acc.push({
          field: key,
          value,
          operator: "equals",
          type: "string"
        });
      }
      return acc;
    }, []);
    setFilterModel({
      items,
      logicOperator: "and",
      quickFilterValues: [],
      quickFilterLogicOperator: "and"
    });
  }, [customFilters]);
  const lookupOptions = _ref5 => {
    let {
      field
    } = _ref5;
    const lookupData = dataRef.current.lookups || {};
    return lookupData[lookupMap[field].lookup] || [];
  };
  (0, _react.useEffect)(() => {
    if (props.isChildGrid || !hideTopFilters) {
      return;
    }
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
  }, []);
  const {
    customActions = []
  } = model;
  const {
    gridColumns,
    pinnedColumns,
    lookupMap
  } = (0, _react.useMemo)(() => {
    let baseColumnList = columns || model.gridColumns || model.columns;
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
      if (column.gridLabel === null || parent && column.lookup === parent || column.type === constants.oneToMany && column.countInList === false) continue;
      const overrides = {};
      if (column.type === constants.oneToMany) {
        overrides.type = 'number';
        overrides.field = column.field.replace(/s$/, 'Count');
      }
      if (gridColumnTypes[column.type]) {
        Object.assign(overrides, gridColumnTypes[column.type]);
      }
      // Common filter operator pattern
      if (overrides.valueOptions === constants.lookup || column.type === constants.boolean) {
        let operators = [];
        if (overrides.valueOptions === constants.lookup) {
          overrides.valueOptions = lookupOptions;
          const lookupFilters = [...(0, _xDataGridPremium.getGridDateOperators)(), ...(0, _xDataGridPremium.getGridStringOperators)()].filter(op => ['is', 'not', 'isAnyOf'].includes(op.value));
          operators = lookupFilters;
        }
        if (column.type === constants.boolean) {
          operators = (0, _xDataGridPremium.getGridBooleanOperators)();
        }
        overrides.filterOperators = operators.map(operator => _objectSpread(_objectSpread({}, operator), {}, {
          InputComponent: operator.InputComponent ? params => /*#__PURE__*/_react.default.createElement(_CustomDropdownmenu.default, _extends({
            column: _objectSpread(_objectSpread(_objectSpread({}, column), column.type === constants.boolean ? {
              customLookup: [{
                value: true,
                label: 'Yes'
              }, {
                value: false,
                label: 'No'
              }]
            } : {}), {}, {
              dataRef
            })
          }, params, {
            autoHighlight: true
          })) : undefined
        }));
      }
      if (column.linkTo || column.link) {
        overrides.cellClassName = 'mui-grid-linkColumn';
      }
      const headerName = tTranslate(column.gridLabel || column.label, tOpts);
      finalColumns.push(_objectSpread(_objectSpread({
        headerName,
        description: headerName
      }, column), overrides));
      if (column.pinned) {
        pinnedColumns[column.pinned === constants.right ? constants.right : constants.left].push(column.field);
      }
      lookupMap[column.field] = column;
    }
    let auditColumns = model.standard;
    if (auditColumns === true) {
      auditColumns = {
        addCreatedOnColumn: true,
        addCreatedByColumn: true,
        addModifiedOnColumn: true,
        addModifiedByColumn: true
      };
    }
    if (auditColumns && typeof auditColumns === constants.object) {
      auditColumnMappings.forEach(_ref6 => {
        let {
          key,
          field,
          type,
          header
        } = _ref6;
        if (auditColumns[key] === true) {
          const column = {
            field,
            type,
            headerName: header,
            width: 200
          };
          if (type === constants.dateTime) {
            column.filterOperators = (0, _LocalizedDatePicker.default)({
              columnType: 'date'
            });
            column.valueFormatter = gridColumnTypes.dateTime.valueFormatter;
            column.keepLocal = true;
          }
          finalColumns.push(column);
        }
      });
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
      if (customActions.length) {
        customActions.forEach(_ref7 => {
          let {
            icon,
            action,
            color
          } = _ref7;
          actions.push(/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
            icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
              title: action
            }, iconMapper[icon] || /*#__PURE__*/_react.default.createElement(_FileCopy.default, null)),
            "data-action": action,
            label: action,
            color: color || "primary"
          }));
        });
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
    if (actions.length) {
      finalColumns.push({
        field: 'actions',
        type: 'actions',
        label: '',
        width: actions.length * 50,
        hideable: false,
        getActions: params => {
          const rowActions = [...actions];
          if (canEdit && !isReadOnly) {
            const isDisabled = params.row.canEdit === false;
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
    let controllerType = model.controllerType;
    let gridApi = "".concat(controllerType === "cs" ? withControllersUrl : url || "").concat(model.api || api);
    if (isPivotExport) {
      gridApi = "".concat(withControllersUrl).concat(model.pivotApi);
      controllerType = "cs";
    }
    if (assigned || available) {
      extraParams[assigned ? "include" : "exclude"] = Array.isArray(selected) ? selected.join(",") : selected;
    }
    const filters = _objectSpread({}, filterModel);
    if ((chartFilters === null || chartFilters === void 0 || (_chartFilters$items = chartFilters.items) === null || _chartFilters$items === void 0 ? void 0 : _chartFilters$items.length) > 0) {
      const {
        columnField,
        operatorValue
      } = chartFilters.items[0] || {};
      const chartField = constants.chartFilterFields[columnField];
      filters.items = [{
        field: chartField,
        operator: operatorValue,
        isChartFilter: false
      }];
      if (JSON.stringify(filterModel) !== JSON.stringify(filters)) {
        setFilterModel(_objectSpread({}, filters));
        chartFilters.items.length = 0;
      }
    }
    const baseFilters = [];
    if (model.joinColumn && id) {
      baseFilters.push({
        field: model.joinColumn,
        operator: "is",
        type: "number",
        value: Number(id)
      });
    }
    if (additionalFilters) {
      filters.items = [...(filters.items || []), ...additionalFilters];
    }
    const isValidFilters = !filters.items.length || filters.items.every(item => "value" in item && item.value !== undefined);
    if (!isValidFilters) return;
    (0, _crudHelper.getList)({
      action,
      page: !contentType ? page : 0,
      pageSize: !contentType ? pageSize : 1000000,
      sortModel,
      filterModel: filters,
      controllerType,
      api: gridApi,
      setIsLoading,
      setData,
      gridColumns,
      model,
      parentFilters,
      extraParams,
      setError: snackbar.showError,
      contentType,
      columns,
      template: isPivotExport ? model.exportTemplate : null,
      configFileName: isPivotExport ? model.configFileName : null,
      dispatchData,
      showFullScreenLoader,
      history: navigate,
      baseFilters,
      isElasticExport
    });
  };
  const openForm = _ref8 => {
    let {
      id,
      record = {},
      mode
    } = _ref8;
    if (setActiveRecord) {
      (0, _crudHelper.getRecord)({
        id,
        api: api || model.api,
        setIsLoading,
        setActiveRecord,
        model,
        parentFilters,
        where
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
  const handleDownload = async _ref9 => {
    let {
      documentLink,
      fileName
    } = _ref9;
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
    }
  };
  const onCellClickHandler = async (cellParams, event, details) => {
    let action = cellParams.field === model.linkColumn ? actionTypes.Edit : null;
    if (!action && cellParams.field === constants.actions) {
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
        if (typeof result !== constants.boolean) {
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
      switch (action) {
        case actionTypes.Edit:
          return openForm({
            id: record[idProperty],
            record
          });
        case actionTypes.Copy:
          return openForm({
            id: record[idProperty],
            mode: 'copy'
          });
        case actionTypes.Delete:
          setIsDeleting(true);
          setRecord({
            name: record[model.linkColumn],
            id: record[idProperty]
          });
          break;
        case actionTypes.History:
          // navigates to history screen, specifying the tablename, id of record and breadcrumb to render title on history screen.
          return navigate("".concat(historyScreenName, "?tableName=").concat(tableName, "&id=").concat(record[idProperty], "&breadCrumb=").concat(searchParamKey ? searchParams.get(searchParamKey) : gridTitle));
        default:
          // Check if action matches any customAction and call its onClick if found
          const foundCustomAction = customActions.find(ca => ca.action === action && typeof ca.onClick === constants.function);
          if (foundCustomAction) {
            foundCustomAction.onClick({
              row: record,
              navigate
            });
            return;
          }
          break;
      }
    }
    if (action === actionTypes.Download) {
      handleDownload({
        documentLink: record[documentField],
        fileName: record.FileName
      });
    }
    if (!toLink.length) {
      return;
    }
    const {
      row
    } = cellParams;
    const columnConfig = lookupMap[cellParams.field] || {};
    const historyObject = {
      pathname: _template.default.replaceTags(columnConfig.linkTo, row)
    };
    if (model.addRecordToState) {
      historyObject.state = row;
    }
    navigate(historyObject);
  };
  const handleDelete = async function handleDelete() {
    const result = await (0, _crudHelper.deleteRecord)({
      id: record.id,
      api: "".concat(model.controllerType === 'cs' ? withControllersUrl : url).concat(model.api || api),
      setIsLoading,
      setError: snackbar.showError,
      setErrorMessage
    });
    if (result === true) {
      setIsDeleting(false);
      snackbar.showMessage('Record Deleted Successfully.');
      fetchData();
    } else {
      setIsDeleting(false);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  const processRowUpdate = updatedRow => {
    if (typeof props.processRowUpdate === "function") {
      props.processRowUpdate(updatedRow, data);
    }
    return updatedRow;
  };
  const onCellDoubleClick = event => {
    if (event.row.canEdit === false) {
      return;
    }
    const {
      row: record
    } = event;
    if (typeof onCellDoubleClickOverride === constants.function) {
      onCellDoubleClickOverride(event);
      return;
    }
    if (!isReadOnly && !isDoubleClicked && !disableCellRedirect) {
      openForm({
        id: record[idProperty],
        record
      });
    }
    if (isReadOnly && model.rowRedirectLink) {
      const historyObject = {
        pathname: _template.default.replaceTags(model.rowRedirectLink, record)
      };
      if (model.addRecordToState) {
        historyObject.state = record;
      }
      navigate(historyObject);
    }
    if (typeof onRowDoubleClick === constants.function) {
      onRowDoubleClick(event);
    }
  };
  const handleAddRecords = async () => {
    if (selectedSet.current.size < 1) {
      snackbar.showError("Please select at least one record to proceed");
      return;
    }
    const selectedIds = Array.from(selectedSet.current);
    const recordMap = new Map(data.records.map(record => [record[idProperty], record]));
    let selectedRecords = selectedIds.map(id => _objectSpread(_objectSpread({}, baseSaveData), recordMap.get(id)));

    // If selectionUpdateKeys is defined, filter each record to only those keys
    if (Array.isArray(model.selectionUpdateKeys) && model.selectionUpdateKeys.length) {
      selectedRecords = selectedRecords.map(item => Object.fromEntries(model.selectionUpdateKeys.map(key => [key, item[key]])));
    }
    try {
      const result = await (0, _crudHelper.saveRecord)({
        id: 0,
        api: "".concat(url).concat(selectionApi || api, "/updateMany"),
        values: {
          items: selectedRecords
        },
        setIsLoading,
        setError: snackbar.showError
      });
      if (result) {
        fetchData();
        snackbar.showMessage("Record Added Successfully.");
      }
    } catch (err) {
      snackbar.showError(err.message || "An error occurred, please try again later.");
    } finally {
      selectedSet.current.clear();
      setIsLoading(false);
      setShowAddConfirmation(false);
    }
  };
  const onAdd = () => {
    if (selectionApi.length > 0) {
      if (selectedSet.current.size) {
        setShowAddConfirmation(true);
        return;
      }
      snackbar.showError("Please select atleast one record to proceed");
      setIsLoading(false);
      return;
    }
    if (typeof onAddOverride === constants.function) {
      onAddOverride();
    } else {
      openForm({
        id: 0
      });
    }
  };
  const clearFilters = () => {
    var _filterModel$items;
    if (!(filterModel !== null && filterModel !== void 0 && (_filterModel$items = filterModel.items) !== null && _filterModel$items !== void 0 && _filterModel$items.length)) return;
    const filters = JSON.parse(JSON.stringify(constants.gridFilterModel));
    setFilterModel(filters);
    if (clearChartFilter) {
      clearChartFilter();
    }
  };
  const updateAssignment = _ref0 => {
    let {
      unassign,
      assign
    } = _ref0;
    const assignedValues = Array.isArray(selected) ? selected : selected.length ? selected.split(',') : [];
    const finalValues = unassign ? assignedValues.filter(id => !unassign.includes(parseInt(id))) : [...assignedValues, ...assign];
    onAssignChange(typeof selected === constants.string ? finalValues.join(',') : finalValues);
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
  const selectAll = () => {
    if (selectedSet.current.size === data.records.length) {
      // If all records are selected, deselect all
      selectedSet.current.clear();
      setSelection([]);
    } else {
      // Select all records
      data.records.forEach(record => {
        selectedSet.current.add(record[idProperty]);
      });
      setSelection(data.records.map(record => record[idProperty]));
    }
  };
  (0, _react.useEffect)(() => {
    if (!preferenceName || !preferenceApi) {
      return;
    }
    removeCurrentPreferenceName({
      dispatchData
    });
    getAllSavedPreferences({
      preferenceName,
      history: navigate,
      dispatchData,
      Username,
      preferenceApi,
      defaultPreferenceEnums
    });
    applyDefaultPreferenceIfExists({
      preferenceName,
      history: navigate,
      dispatchData,
      Username,
      gridRef: apiRef,
      setIsGridPreferenceFetched,
      preferenceApi,
      defaultPreferenceEnums
    });
  }, [preferenceApi]);
  const CustomToolbar = function CustomToolbar(props) {
    const addtext = model.customAddText || (model.title ? "Add ".concat(model.title) : 'Add');
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px'
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, model.gridSubTitle && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      component: "h3",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, " ", tTranslate(model.gridSubTitle, tOpts)), currentPreference && model.showPreferenceInHeader && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      className: "preference-name-text",
      variant: "h6",
      component: "h6",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, tTranslate('Applied Preference', tOpts), " - ", currentPreference), (isReadOnly || !canAdd && !forAssignment) && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      component: "h3",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, " ", !canAdd || isReadOnly ? "" : model.title), !forAssignment && canAdd && !isReadOnly && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: !showAddIcon ? null : /*#__PURE__*/_react.default.createElement(_Add.default, null),
      onClick: onAdd,
      size: "medium",
      variant: "contained",
      className: classes.buttons
    }, addtext), selectionApi.length && data.records.length ? /*#__PURE__*/_react.default.createElement(_Button.default, {
      onClick: selectAll,
      size: "medium",
      variant: "contained",
      className: classes.buttons
    }, selectedSet.current.size === data.records.length ? "Deselect All" : "Select All") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), available && /*#__PURE__*/_react.default.createElement(_Button.default, {
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
    }, "Remove")), /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarContainer, props, effectivePermissions.showColumnsOrder && /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarColumnsButton, null), effectivePermissions.filter && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarFilterButton, null), /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_FilterListOff.default, null),
      onClick: clearFilters,
      size: "small"
    }, "CLEAR FILTER")), effectivePermissions.export && /*#__PURE__*/_react.default.createElement(_helper.CustomExportButton, {
      handleExport: handleExport,
      showPivotExportBtn: model.pivotApi,
      exportFormats: model.exportFormats || {},
      tTranslate: tTranslate,
      tOpts: tOpts
    }), preferenceName && /*#__PURE__*/_react.default.createElement(_GridPreference.default, {
      preferenceName: preferenceName,
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
    const isPivotExport = e.target.dataset.isPivotExport === 'true';
    const hiddenColumns = Object.keys(columnVisibilityModel).filter(key => columnVisibilityModel[key] === false);
    const nonExportColumns = new Set(gridColumns.filter(col => col.exportable === false).map(col => col.field));
    const visibleColumns = orderedFields.filter(field => !nonExportColumns.has(field) && !hiddenColumns.includes(field) && field !== '__check__' && field !== 'actions');
    if (visibleColumns.length === 0) {
      snackbar.showMessage('You cannot export while all columns are hidden... please show at least 1 column before exporting');
      return;
    }
    const columns = {};
    visibleColumns.forEach(field => {
      const col = lookup[field];
      columns[field] = {
        field,
        width: col.width,
        headerName: col.headerName || col.field,
        type: col.type,
        keepLocal: col.keepLocal === true,
        isParsable: col.isParsable,
        lookup: col.lookup
      };
    });
    fetchData(isPivotExport ? 'export' : undefined, undefined, e.target.dataset.contentType, columns, isPivotExport, isElasticScreen);
  };
  (0, _react.useEffect)(() => {
    if (!url) return;
    fetchData();
  }, [paginationModel, sortModel, filterModel, api, gridColumns, model, parentFilters, assigned, selected, available, chartFilters, isGridPreferenceFetched, reRenderKey, url]);
  (0, _react.useEffect)(() => {
    if (props.isChildGrid || forAssignment || !updatePageTitle) {
      return;
    }
    dispatchData({
      type: _actions.default.PAGE_TITLE_DETAILS,
      payload: {
        icon: "",
        titleHeading: model.pageTitle || model.title,
        title: model.title
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
    var _chartFilters$items2;
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
      const column = gridColumns.find(col => col.field === field) || {};
      const isNumber = column.type === constants.number;
      if (isNumber && value < 0) {
        return _objectSpread(_objectSpread({}, item), {}, {
          value: null
        });
      }
      if (emptyIsAnyOfOperatorFilters.includes(operator) || isNumber && !isNaN(value) || !isNumber) {
        var _gridColumns$filter$;
        const isKeywordField = isElasticScreen && ((_gridColumns$filter$ = gridColumns.filter(element => element.field === field)[0]) === null || _gridColumns$filter$ === void 0 ? void 0 : _gridColumns$filter$.isKeywordField);
        if (isKeywordField) {
          item.filterField = "".concat(item.field, ".keyword");
        }
        item.value = ['isEmpty', 'isNotEmpty'].includes(operator) ? null : value;
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
    const shouldClearChartFilter = e.items.findIndex(ele => ele.isChartFilter && !['isEmpty', 'isNotEmpty'].includes(ele.operator)) === -1 || (chartFilters === null || chartFilters === void 0 || (_chartFilters$items2 = chartFilters.items) === null || _chartFilters$items2 === void 0 ? void 0 : _chartFilters$items2.length) && (!e.items.length || chartFilters.items.findIndex(ele => {
      var _e$items$;
      return ele.columnField === ((_e$items$ = e.items[0]) === null || _e$items$ === void 0 ? void 0 : _e$items$.field);
    }) > -1);
    if (shouldClearChartFilter && clearChartFilter) {
      clearChartFilter();
    }
  };
  const updateSort = e => {
    const sort = e.map(ele => {
      const field = gridColumns.filter(element => element.field === ele.field)[0] || {};
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
  const pageTitle = title || model.gridTitle || model.title;
  const breadCrumbs = searchParamKey ? [{
    text: searchParams.get(searchParamKey) || pageTitle
  }] : [{
    text: pageTitle
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageTitle.default, {
    navigate: navigate,
    showBreadcrumbs: !hideBreadcrumb && !hideBreadcrumbInGrid,
    breadcrumbs: breadCrumbs,
    enableBackButton: navigateBack,
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
    pageSizeOptions: constants.pageSizeOptions,
    onPaginationModelChange: setPaginationModel,
    pagination: true,
    rowCount: data.recordCount,
    rows: data.records,
    sortModel: sortModel,
    paginationMode: paginationMode,
    sortingMode: paginationMode,
    filterMode: paginationMode,
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
  }, record.name.length > 30 ? "".concat(record.name.slice(0, 30), "...") : record.name), " ?")), showAddConfirmation && /*#__PURE__*/_react.default.createElement(_index2.DialogComponent, {
    open: showAddConfirmation,
    onConfirm: handleAddRecords,
    onCancel: () => setShowAddConfirmation(false),
    title: "Confirm Add"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.deleteContent
  }, "Are you sure you want to add ", selectedSet.current.size, " records?")))));
}, _helper.areEqual);
var _default = exports.default = GridBase;