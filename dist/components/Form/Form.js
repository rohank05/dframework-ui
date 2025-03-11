"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActiveStepContext = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var _crudHelper = require("../Grid/crud-helper");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _fieldMapper = _interopRequireDefault(require("./field-mapper"));
var _SnackBar = require("../SnackBar");
var _Dialog = require("../Dialog");
var _StateProvider = require("../useRouter/StateProvider");
var _actions = _interopRequireDefault(require("../useRouter/actions"));
var _PageTitle = _interopRequireDefault(require("../PageTitle"));
var _utils = require("../utils");
var _relations = _interopRequireDefault(require("./relations"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ActiveStepContext = exports.ActiveStepContext = /*#__PURE__*/(0, _react.createContext)(1);
const defaultFieldConfigs = {};
const Form = _ref => {
  var _stateData$gridSettin;
  let {
    model,
    api,
    models,
    relationFilters = {},
    permissions = {},
    Layout = _fieldMapper.default,
    baseSaveData = {},
    sx,
    readOnly
  } = _ref;
  const formTitle = model.formTitle || model.title;
  const {
    navigate,
    getParams,
    useParams,
    pathname
  } = (0, _StateProvider.useRouter)();
  const {
    relations = [],
    hideRelationsInAdd = false
  } = model;
  const navigateBack = model.navigateBack || pathname.substring(0, pathname.lastIndexOf("/")); // removes the last segment
  const {
    dispatchData,
    stateData
  } = (0, _StateProvider.useStateContext)();
  const {
    id: idWithOptions
  } = useParams() || getParams;
  const id = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split("-")[0];
  const searchParams = new URLSearchParams(window.location.search);
  const baseDataFromParams = searchParams.has('baseData') && searchParams.get('baseData');
  if (baseDataFromParams) {
    const parsedData = JSON.parse(baseDataFromParams);
    if (typeof parsedData === 'object' && parsedData !== null) {
      baseSaveData = _objectSpread(_objectSpread({}, baseSaveData), parsedData);
    }
  }
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)(null);
  const [lookups, setLookups] = (0, _react.useState)(null);
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const snackbar = (0, _SnackBar.useSnackbar)();
  const combos = {};
  const [validationSchema, setValidationSchema] = (0, _react.useState)(null);
  const [activeStep, setActiveStep] = (0, _react.useState)(0);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = (0, _react.useState)(false);
  const [deleteError, setDeleteError] = (0, _react.useState)(null);
  const [errorMessage, setErrorMessage] = (0, _react.useState)("");
  const url = stateData === null || stateData === void 0 || (_stateData$gridSettin = stateData.gridSettings) === null || _stateData$gridSettin === void 0 || (_stateData$gridSettin = _stateData$gridSettin.permissions) === null || _stateData$gridSettin === void 0 ? void 0 : _stateData$gridSettin.Url;
  const fieldConfigs = model !== null && model !== void 0 && model.applyFieldConfig ? model === null || model === void 0 ? void 0 : model.applyFieldConfig({
    data,
    lookups
  }) : defaultFieldConfigs;
  let gridApi = "".concat(url).concat(model.api || api);
  const {
    mode
  } = stateData.dataForm;
  const userData = stateData.getUserData || {};
  const userDefinedPermissions = _objectSpread(_objectSpread({
    add: true,
    edit: true,
    delete: true
  }, model.permissions), permissions);
  const {
    canEdit,
    canDelete = false
  } = (0, _utils.getPermissions)({
    userData,
    model,
    userDefinedPermissions
  });
  const {
    hideBreadcrumb = false
  } = model;
  const getRecordAndLookups = _ref2 => {
    let {
      lookups,
      scopeId,
      customSetIsLoading,
      customSetActiveRecord
    } = _ref2;
    const options = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split("-");
    try {
      const params = {
        api: api || gridApi,
        modelConfig: model,
        setError: errorOnLoad
      };
      if (lookups) {
        (0, _crudHelper.getLookups)(_objectSpread(_objectSpread({}, params), {}, {
          // setIsLoading,
          setIsLoading: customSetIsLoading || setIsLoading,
          setActiveRecord: customSetActiveRecord,
          lookups,
          scopeId
        }));
      } else {
        (0, _crudHelper.getRecord)(_objectSpread(_objectSpread({}, params), {}, {
          id: options.length > 1 ? options[1] : options[0],
          setIsLoading,
          setActiveRecord
        }));
      }
    } catch (error) {
      snackbar.showError("An error occured, please try after some time.", error);
      navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
    }
  };
  (0, _react.useEffect)(() => {
    if (url) {
      setValidationSchema(model.getValidationSchema({
        id,
        snackbar
      }));
      getRecordAndLookups({});
    }
  }, [id, idWithOptions, model, url]);
  const formik = (0, _formik.useFormik)({
    enableReinitialize: true,
    initialValues: _objectSpread(_objectSpread(_objectSpread({}, model.initialValues), data), baseSaveData),
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, _ref3) => {
      let {
        resetForm
      } = _ref3;
      for (const key in values) {
        if (typeof values[key] === "string") {
          values[key] = values[key].trim();
        }
      }
      setIsLoading(true);
      (0, _crudHelper.saveRecord)({
        id,
        api: gridApi,
        values,
        setIsLoading,
        setError: snackbar.showError
      }).then(success => {
        if (success) {
          if (model.reloadOnSave) {
            return window.location.reload();
          }
          const operation = id == 0 ? "Added" : "Updated";
          snackbar.showMessage("Record ".concat(operation, " Successfully."));
          navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
        }
      }).catch(err => {
        snackbar.showError("An error occured, please try after some time.second", err);
        if (model.reloadOnSave) {
          resetForm();
        }
      }).finally(() => setIsLoading(false));
    }
  });
  const {
    dirty
  } = formik;
  const handleDiscardChanges = () => {
    formik.resetForm();
    setIsDiscardDialogOpen(false);
    navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
  };
  const warnUnsavedChanges = () => {
    if (dirty) {
      setIsDiscardDialogOpen(true);
    }
  };
  const errorOnLoad = function errorOnLoad(title, error) {
    snackbar.showError(title, error);
    navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
  };
  const setActiveRecord = function setActiveRecord(_ref4) {
    let {
      id,
      title,
      record,
      lookups
    } = _ref4;
    const isCopy = idWithOptions.indexOf("-") > -1;
    const isNew = !id || id === "0";
    const localTitle = isNew ? "Create" : isCopy ? "Copy" : "Edit";
    const localValue = isNew ? "" : record[model.linkColumn];
    const breadcrumbs = [{
      text: model === null || model === void 0 ? void 0 : model.breadCrumbs
    }, {
      text: localTitle
    }];
    if (isCopy) {
      record[model.linkColumn] = "";
    }
    model.columns.map(item => {
      if (item.skipCopy && isCopy) {
        record[item.field] = "";
      }
    });
    setData(record);
    setLookups(lookups);
    if (localValue !== "") {
      breadcrumbs.push({
        text: localValue
      });
    }
    dispatchData({
      type: _actions.default.PAGE_TITLE_DETAILS,
      payload: {
        showBreadcrumbs: true,
        breadcrumbs: breadcrumbs
      }
    });
  };
  const handleFormCancel = function handleFormCancel(event) {
    if (dirty) {
      warnUnsavedChanges();
      event.preventDefault();
    } else {
      navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
      event.preventDefault();
    }
  };
  const handleDelete = async function handleDelete() {
    setIsDeleting(true);
    try {
      const response = await (0, _crudHelper.deleteRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        setIsLoading,
        setError: snackbar.showError,
        setErrorMessage
      });
      if (response === true) {
        snackbar.showMessage("Record Deleted Successfully.");
        navigate(navigateBack.includes("window.history") ? window.history.back() : navigateBack);
      }
    } catch (error) {
      snackbar === null || snackbar === void 0 || snackbar.showError("An error occured, please try after some time.");
    } finally {
      setIsDeleting(false);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      sx: {
        display: "flex",
        pt: "20%",
        justifyContent: "center"
      }
    }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, null));
  }
  const handleChange = function handleChange(e) {
    const {
      name,
      value
    } = e.target;
    const gridData = _objectSpread({}, data);
    gridData[name] = value;
    setData(gridData);
  };
  const handleSubmit = function handleSubmit(e) {
    if (e) e.preventDefault();
    const {
      errors
    } = formik;
    formik.handleSubmit();
    const fieldName = Object.keys(errors)[0];
    const errorMessage = errors[fieldName];
    if (errorMessage) {
      snackbar.showError(errorMessage, null, "error");
    }
    const fieldConfig = model.columns.find(column => column.field === fieldName);
    if (fieldConfig && fieldConfig.tab) {
      const tabKeys = Object.keys(model.tabs);
      setActiveStep(tabKeys.indexOf(fieldConfig.tab));
    }
  };
  const breadcrumbs = [{
    text: formTitle
  }, {
    text: id === "0" ? "New" : "Update"
  }];
  const showRelations = !(hideRelationsInAdd && id == 0) && Boolean(relations.length);
  const showSaveButton = searchParams.has("showRelation");
  const recordEditable = !("canEdit" in data) || data.canEdit;
  const readOnlyRelations = !recordEditable || data.readOnlyRelations;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageTitle.default, {
    title: formTitle,
    showBreadcrumbs: !hideBreadcrumb,
    breadcrumbs: breadcrumbs,
    model: model
  }), /*#__PURE__*/_react.default.createElement(ActiveStepContext.Provider, {
    value: {
      activeStep,
      setActiveStep
    }
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    sx: _objectSpread({
      padding: 2
    }, sx)
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement(_Stack.default, {
    direction: "row",
    spacing: 2,
    justifyContent: "flex-end",
    mb: 1
  }, canEdit && recordEditable && !showSaveButton && !readOnly && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "submit",
    color: "success",
    onClick: handleSubmit
  }, "Save"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "cancel",
    color: "error",
    onClick: e => handleFormCancel(e)
  }, "Cancel"), permissions.delete && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "error",
    onClick: () => setIsDeleting(true)
  }, "Delete")), /*#__PURE__*/_react.default.createElement(Layout, {
    model: model,
    formik: formik,
    data: data,
    fieldConfigs: fieldConfigs,
    combos: combos,
    onChange: handleChange,
    lookups: lookups,
    id: id,
    handleSubmit: handleSubmit,
    mode: mode,
    getRecordAndLookups: getRecordAndLookups
  })), errorMessage && /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: !!errorMessage,
    onConfirm: clearError,
    onCancel: clearError,
    title: "Info",
    hideCancelButton: true
  }, " ", errorMessage), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDiscardDialogOpen,
    onConfirm: handleDiscardChanges,
    onCancel: () => setIsDiscardDialogOpen(false),
    title: "Changes not saved",
    okText: "Discard",
    cancelText: "Continue"
  }, "Would you like to continue to edit or discard changes?"), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => {
      setIsDeleting(false);
      setDeleteError(null);
    },
    title: deleteError ? "Error Deleting Record" : "Confirm Delete"
  }, "Are you sure you want to delete ".concat((data === null || data === void 0 ? void 0 : data.GroupName) || (data === null || data === void 0 ? void 0 : data.SurveyName), "?")), showRelations ? /*#__PURE__*/_react.default.createElement(_relations.default, {
    readOnly: readOnlyRelations,
    models: models,
    relationFilters: relationFilters,
    relations: relations,
    parentFilters: [],
    parent: model.name || model.title || "",
    where: []
  }) : null)));
};
var _default = exports.default = Form;