"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Save = _interopRequireDefault(require("@mui/icons-material/Save"));
var _Settings = _interopRequireDefault(require("@mui/icons-material/Settings"));
var _material = require("@mui/material");
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _formik = require("formik");
var yup = _interopRequireWildcard(require("yup"));
var _SnackBar = require("../SnackBar");
var _httpRequest = _interopRequireDefault(require("./httpRequest"));
var _StateProvider = require("../useRouter/StateProvider");
var _actions = _interopRequireDefault(require("../useRouter/actions"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import { useRouter } from '../useRouter/useRouter';
const actionTypes = {
  Copy: "Copy",
  Edit: "Edit",
  Delete: "Delete"
};
const formTypes = {
  Add: "Add",
  Edit: "Edit",
  Manage: 'Manage'
};
const gridColumns = [{
  field: "prefName",
  type: 'string',
  width: 300,
  headerName: "Preference Name",
  sortable: false,
  filterable: false
}, {
  field: "prefDesc",
  type: 'string',
  width: 300,
  headerName: "Preference Description",
  sortable: false,
  filterable: false
}, {
  field: "isDefault",
  type: "boolean",
  width: 100,
  headerName: "Default",
  sortable: false,
  filterable: false
}, {
  field: 'editAction',
  type: 'actions',
  headerName: '',
  width: 20,
  getActions: () => [/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
    key: 1,
    icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
      title: actionTypes.Edit
    }, "   ", /*#__PURE__*/_react.default.createElement(_Edit.default, null)),
    tabIndex: 1,
    "data-action": actionTypes.Edit,
    label: "Edit",
    color: "primary"
  })]
}, {
  field: 'deleteAction',
  type: 'actions',
  headerName: '',
  width: 20,
  getActions: () => [/*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
    key: 2,
    icon: /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
      title: actionTypes.Delete
    }, /*#__PURE__*/_react.default.createElement(_Delete.default, null), " "),
    tabIndex: 2,
    "data-action": actionTypes.Delete,
    label: "Delete",
    color: "error"
  })]
}];
const initialValues = {
  prefName: '',
  prefDesc: '',
  isDefault: false
};
const defaultCoolRPrefName = "coolr default";
const GridPreferences = _ref => {
  var _stateData$gridSettin, _stateData$gridSettin2;
  let {
    preferenceName,
    gridRef,
    columns = [],
    setIsGridPreferenceFetched
  } = _ref;
  const {
    systemDateTimeFormat,
    stateData,
    dispatchData,
    formatDate,
    removeCurrentPreferenceName,
    getAllSavedPreferences,
    applyDefaultPreferenceIfExists
  } = (0, _StateProvider.useStateContext)();
  const {
    pathname,
    navigate
  } = (0, _StateProvider.useRouter)();
  const apiRef = (0, _xDataGridPremium.useGridApiRef)();
  const snackbar = (0, _SnackBar.useSnackbar)();
  const [openDialog, setOpenDialog] = (0, _react.useState)(false);
  const [openForm, setOpenForm] = (0, _react.useState)(false);
  const [filteredPrefs, setFilteredPrefs] = (0, _react.useState)([]);
  const [formType, setFormType] = (0, _react.useState)();
  const [menuAnchorEl, setMenuAnchorEl] = (0, _react.useState)();
  const [openPreferenceExistsModal, setOpenPreferenceExistsModal] = (0, _react.useState)(false);
  const {
    Username
  } = stateData !== null && stateData !== void 0 && stateData.getUserData ? stateData.getUserData : {};
  const preferences = stateData === null || stateData === void 0 ? void 0 : stateData.preferences;
  const currentPreference = stateData === null || stateData === void 0 ? void 0 : stateData.currentPreference;
  const preferenceApi = stateData === null || stateData === void 0 || (_stateData$gridSettin = stateData.gridSettings) === null || _stateData$gridSettin === void 0 || (_stateData$gridSettin = _stateData$gridSettin.permissions) === null || _stateData$gridSettin === void 0 ? void 0 : _stateData$gridSettin.preferenceApi;
  const tablePreferenceEnums = stateData === null || stateData === void 0 || (_stateData$gridSettin2 = stateData.gridSettings) === null || _stateData$gridSettin2 === void 0 || (_stateData$gridSettin2 = _stateData$gridSettin2.permissions) === null || _stateData$gridSettin2 === void 0 ? void 0 : _stateData$gridSettin2.tablePreferenceEnums;
  const filterModel = (0, _xDataGridPremium.useGridSelector)(gridRef, _xDataGridPremium.gridFilterModelSelector);
  const sortModel = (0, _xDataGridPremium.useGridSelector)(gridRef, _xDataGridPremium.gridSortModelSelector);
  const validationSchema = (0, _react.useMemo)(() => {
    let schema = yup.object({
      prefName: yup.string().required('Preference Name is Required').max(20, 'Maximum Length is 20'),
      prefDesc: yup.string().max(100, "Description maximum length is 100")
    });
    return schema;
  }, []);
  (0, _react.useEffect)(() => {
    const filteredPrefs = Array.isArray(preferences) ? preferences.filter(pref => pref.prefId !== 0) : [];
    setFilteredPrefs(filteredPrefs);
  }, [preferences]);
  const formik = (0, _formik.useFormik)({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      await savePreference(values);
    }
  });
  const handleOpen = event => {
    setMenuAnchorEl(event === null || event === void 0 ? void 0 : event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };
  const handleDialogClose = () => {
    setFormType();
    handleClose();
    setOpenDialog(false);
  };
  const deletePreference = async (id, prefName) => {
    let params = {
      action: 'delete',
      id: preferenceName,
      Username,
      prefIdArray: id
    };
    const response = await (0, _httpRequest.default)({
      url: preferenceApi,
      params,
      history: navigate,
      dispatchData
    });
    if (response === true) {
      if (prefName === currentPreference) {
        removeCurrentPreferenceName({
          dispatchData
        });
      }
      snackbar.showMessage('Preference Deleted Successfully.');
    }
  };
  const applySelectedPreference = async prefId => {
    if (setIsGridPreferenceFetched) {
      setIsGridPreferenceFetched(false);
    }
    await applyPreference(prefId);
  };
  function isNotCoolRDefault() {
    let prefName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return [defaultCoolRPrefName].includes(prefName.trim().toLowerCase());
  }
  const savePreference = async values => {
    var _filterModel$items;
    const presetName = values.prefName.trim();
    const preferenceAlreadyExists = preferences.length > 0 && (preferences === null || preferences === void 0 ? void 0 : preferences.findIndex(ele => ele.prefName === presetName));
    const isNotCoolRDefaultName = isNotCoolRDefault(presetName);
    if (preferenceAlreadyExists > -1 && formType === formTypes.Add || isNotCoolRDefaultName) {
      setOpenPreferenceExistsModal(true);
      return;
    }
    const {
      pinnedColumns
    } = gridRef.current.state;
    const {
      orderedFields,
      columnVisibilityModel,
      lookup
    } = gridRef.current.state.columns;
    const gridColumn = [];
    orderedFields === null || orderedFields === void 0 || orderedFields.forEach(ele => {
      const {
        field
      } = lookup[ele];
      let col = (columns === null || columns === void 0 ? void 0 : columns.find(ele => ele.field === field)) || lookup[ele];
      col = _objectSpread(_objectSpread({}, col), {}, {
        width: lookup[ele].width
      });
      gridColumn.push(col);
    });
    const filter = filterModel === null || filterModel === void 0 || (_filterModel$items = filterModel.items) === null || _filterModel$items === void 0 ? void 0 : _filterModel$items.map(ele => {
      const {
        field,
        operator,
        value
      } = ele;
      return {
        field,
        operator,
        value
      };
    });
    filterModel.items = filter;
    let params = {
      action: 'save',
      id: preferenceName,
      prefName: presetName,
      prefDesc: values.prefDesc,
      prefValue: {
        sortModel,
        filterModel,
        columnVisibilityModel,
        gridColumn,
        pinnedColumns
      },
      isDefault: values.isDefault
    };
    if (values.prefId) {
      params["prefId"] = values.prefId;
    }
    const response = await (0, _httpRequest.default)({
      url: preferenceApi,
      params,
      history: navigate,
      dispatchData
    });
    if (response === true) {
      snackbar.showMessage('Preference Saved Successfully.');
    }
    getAllSavedPreferences({
      preferenceName,
      Username,
      history: navigate,
      dispatchData,
      preferenceApi,
      tablePreferenceEnums
    });
  };
  const applyPreference = async prefId => {
    let userPreferenceCharts;
    let coolrDefaultPreference = 'CoolR Default';
    // Check if prefId is 0, if so, use tablePreferenceEnums, otherwise fetch from API
    if (prefId === 0) {
      userPreferenceCharts = tablePreferenceEnums[preferenceName] || null;
    } else {
      const params = {
        action: 'load',
        id: preferenceName,
        Username,
        prefId
      };
      const response = await (0, _httpRequest.default)({
        url: preferenceApi,
        params,
        history: navigate,
        dispatchData
      });
      userPreferenceCharts = response !== null && response !== void 0 && response.prefValue ? JSON.parse(response.prefValue) : null;
      coolrDefaultPreference = response !== null && response !== void 0 && response.prefValue ? response.prefName : '';
    }

    // If userPreferenceCharts is available, apply preferences to the grid
    if (userPreferenceCharts) {
      const {
        gridColumn,
        columnVisibilityModel,
        pinnedColumns,
        sortModel,
        filterModel
      } = userPreferenceCharts;
      gridColumn.forEach(_ref2 => {
        let {
          field,
          width
        } = _ref2;
        if (gridRef.current.getColumnIndex(field) !== -1) {
          gridRef.current.setColumnWidth(field, width);
        }
      });
      gridRef.current.setColumnVisibilityModel(columnVisibilityModel);
      gridRef.current.state.columns.orderedFields = gridColumn.map(_ref3 => {
        let {
          field
        } = _ref3;
        return field;
      });
      gridRef.current.setPinnedColumns(pinnedColumns);
      gridRef.current.setSortModel(sortModel || []);
      gridRef.current.setFilterModel(filterModel);
      dispatchData({
        type: _actions.default.SET_CURRENT_PREFERENCE_NAME,
        payload: coolrDefaultPreference
      });
      setIsGridPreferenceFetched(true);
    }
  };
  const getGridRowId = row => {
    return row['GridPreferenceId'];
  };
  const openModal = function openModal(params) {
    let openFormModal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setFormType(params);
    handleClose();
    setOpenDialog(true);
    setOpenForm(openFormModal);
    if (openFormModal) {
      formik.resetForm();
    }
  };
  const closeModal = () => {
    setFormType(null);
    handleClose();
    setOpenDialog(false);
  };
  const onCellClick = async (cellParams, event, details) => {
    let action = cellParams.field === 'editAction' ? actionTypes.Edit : cellParams.field === 'deleteAction' ? actionTypes.Delete : null;
    if (cellParams.id === 0 && (action === actionTypes.Edit || action === actionTypes.Delete)) {
      snackbar.showMessage('Default Preference Can Not Be' + ' ' + "".concat(action === actionTypes.Edit ? 'Edited' : 'Deleted'));
      return;
    }
    if (action === actionTypes.Edit) {
      setFormType('Modify');
      formik.setValues(cellParams === null || cellParams === void 0 ? void 0 : cellParams.row);
      setOpenForm(true);
    }
    if (action === actionTypes.Delete) {
      var _cellParams$row;
      await deletePreference(cellParams.id, cellParams === null || cellParams === void 0 || (_cellParams$row = cellParams.row) === null || _cellParams$row === void 0 ? void 0 : _cellParams$row.prefName);
      getAllSavedPreferences({
        preferenceName,
        history: navigate,
        dispatchData,
        Username,
        preferenceApi,
        tablePreferenceEnums
      });
    }
  };
  const prefName = formik.values.prefName.trim();
  return /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    id: "grid-preferences-btn",
    "aria-controls": menuAnchorEl ? 'basic-menu' : undefined,
    "aria-haspopup": "true",
    "aria-expanded": menuAnchorEl ? 'true' : undefined,
    onClick: handleOpen,
    title: "Preference",
    startIcon: /*#__PURE__*/_react.default.createElement(_Settings.default, null)
  }, "Preferences"), /*#__PURE__*/_react.default.createElement(_material.Menu, {
    id: "grid-preference-menu",
    anchorEl: menuAnchorEl,
    open: !!menuAnchorEl,
    onClose: handleClose,
    component: _material.List,
    dense: true,
    MenuListProps: {
      'aria-labelledby': 'grid-preferences-btn'
    },
    sx: {
      '& .MuiMenu-paper': {
        minWidth: 240,
        maxHeight: 320
      },
      '& .MuiListItemSecondaryAction-root': {
        display: 'flex'
      },
      '& .Mui-selected': {
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'success.main'
        }
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    component: _material.ListItemButton,
    dense: true,
    onClick: () => openModal(formTypes.Add)
  }, "Add Preference"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    component: _material.ListItemButton,
    dense: true,
    divider: (preferences === null || preferences === void 0 ? void 0 : preferences.length) > 0,
    onClick: () => openModal(formTypes.Manage, false)
  }, "Manage Preferences"), (preferences === null || preferences === void 0 ? void 0 : preferences.length) > 0 && (preferences === null || preferences === void 0 ? void 0 : preferences.map((ele, key) => {
    const {
      prefName,
      prefDesc,
      prefId
    } = ele;
    return /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
      onClick: () => applySelectedPreference(prefId, key),
      component: _material.ListItem,
      key: "pref-item-".concat(key),
      title: prefDesc,
      dense: true
    }, /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
      primary: prefName
    }));
  }))), /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: openDialog,
    maxWidth: formType === formTypes.Manage ? 'md' : 'sm',
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, {
    sx: {
      backgroundColor: '#e0e0e0',
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    columnGap: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5"
  }, formType, " Preference"))), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, openForm && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    component: 'form',
    onSubmit: formik.handleSubmit,
    rowGap: 2,
    container: true,
    sx: {
      '& .MuiFormLabel-root:not(.MuiTypography-root)': {
        fontWeight: 400,
        display: 'table',
        whiteSpace: 'pre-wrap' /* css-3 */,
        wordWrap: 'break-word' /* Internet Explorer 5.5+ */
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    defaultValue: formik.values.prefName,
    variant: "outlined",
    size: "small",
    margin: "dense",
    label: "Preference Name",
    name: 'prefName',
    onChange: formik.handleChange,
    error: !!formik.errors.prefName,
    helperText: formik.errors.prefName,
    required: true,
    fullWidth: true
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    defaultValue: formik.values.prefDesc,
    variant: "outlined",
    multiline: true,
    rows: 2,
    size: "small",
    margin: "dense",
    label: "Preference Description",
    name: 'prefDesc',
    onChange: formik.handleChange,
    error: !!formik.errors.prefDesc,
    helperText: formik.errors.prefDesc,
    fullWidth: true
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: formik.values.isDefault,
      name: 'isDefault',
      onChange: formik.handleChange
    }),
    label: "Default"
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    columnGap: 1,
    style: {
      justifyContent: 'end'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    size: "small",
    startIcon: /*#__PURE__*/_react.default.createElement(_Save.default, null),
    color: "primary",
    variant: "contained",
    disableElevation: true
  }, "Save"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    startIcon: /*#__PURE__*/_react.default.createElement(_Close.default, null),
    color: "error",
    variant: "contained",
    size: "small",
    onClick: handleDialogClose,
    disableElevation: true
  }, "Close")))), openDialog && formType === formTypes.Manage && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.DataGridPremium, {
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
    className: "pagination-fix",
    onCellClick: onCellClick,
    columns: gridColumns,
    pageSizeOptions: [5, 10, 20, 50, 100],
    pagination: true,
    rowCount: filteredPrefs.length,
    rows: filteredPrefs,
    getRowId: getGridRowId,
    slots: {
      headerFilterMenu: false
    },
    density: "compact",
    disableDensitySelector: true,
    apiRef: apiRef,
    disableAggregation: true,
    disableRowGrouping: true,
    disableRowSelectionOnClick: true,
    autoHeight: true
  })))), formType === formTypes.Manage && /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "error",
    variant: "contained",
    size: "small",
    onClick: () => closeModal(),
    disableElevation: true
  }, "Close"))), /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: openPreferenceExistsModal,
    maxWidth: "xs",
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_material.DialogContent, {
    sx: {
      fontSize: '16px'
    }
  }, "\"", prefName, "\" name already in use, please use another name."), /*#__PURE__*/_react.default.createElement(_material.DialogActions, {
    sx: {
      justifyContent: 'center',
      marginTop: '4%'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "success",
    variant: "contained",
    size: "small",
    onClick: () => setOpenPreferenceExistsModal(false),
    disableElevation: true
  }, "Ok"))));
};
var _default = exports.default = GridPreferences;