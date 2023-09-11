"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/es.array.push.js");
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var _crudHelper = require("../Grid/crud-helper");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _fieldMapper = _interopRequireDefault(require("./field-mapper"));
var _SnackBar = require("../SnackBar");
var _Dialog = require("../Dialog");
var _useRouter = require("../useRouter/useRouter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Form = _ref => {
  let {
    model,
    api,
    permissions = {
      edit: true,
      export: true,
      delete: true
    },
    Layout = _fieldMapper.default
  } = _ref;
  const {
    navigate,
    getParams
  } = (0, _useRouter.useRouter)();
  const defaultFieldConfigs = {};
  const {
    id: idWithOptions
  } = getParams;
  const id = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split('-')[0];
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)(null);
  const [lookups, setLookups] = (0, _react.useState)(null);
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const snackbar = (0, _SnackBar.useSnackbar)();
  const combos = {};
  const [validationSchema, setValidationSchema] = (0, _react.useState)(null);
  const fieldConfigs = model !== null && model !== void 0 && model.applyFieldConfig ? model === null || model === void 0 ? void 0 : model.applyFieldConfig({
    data,
    lookups
  }) : defaultFieldConfigs;
  (0, _react.useEffect)(() => {
    setValidationSchema(model.getValidationSchema({
      id,
      snackbar
    }));
    const options = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split('-');
    try {
      (0, _crudHelper.getRecord)({
        id: options.length > 1 ? options[1] : options[0],
        modelConfig: model,
        setIsLoading,
        setError: errorOnLoad,
        setActiveRecord
      });
    } catch (error) {
      snackbar === null || snackbar === void 0 || snackbar.showMessage('An error occured, please try after some time.');
      navigate('./');
    }
  }, [id, idWithOptions, model]);
  const formik = (0, _formik.useFormik)({
    enableReinitialize: true,
    initialValues: _objectSpread(_objectSpread({}, model.initialValues), data),
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: (values, _ref2) => {
      let {
        resetForm
      } = _ref2;
      setIsLoading(true);
      (0, _crudHelper.saveRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        values,
        setIsLoading,
        setError: snackbar === null || snackbar === void 0 ? void 0 : snackbar.showError
      }).then(success => {
        if (success) {
          snackbar === null || snackbar === void 0 || snackbar.showMessage('Record Updated Successfully.');
          navigate('./');
        }
      }).finally(() => setIsLoading(false));
    }
  });
  const errorOnLoad = function errorOnLoad(title, error) {
    snackbar === null || snackbar === void 0 || snackbar.showError(title, error);
    navigate('./');
  };
  const setActiveRecord = function setActiveRecord(_ref3) {
    let {
      id,
      title,
      record,
      lookups
    } = _ref3;
    const isCopy = idWithOptions.indexOf("-") > -1;
    const isNew = !id || id === "0";
    const localTitle = isNew ? "Create" : isCopy ? "Copy" : "Edit";
    const localValue = isNew ? "" : record[model.linkColumn];
    const breadcrumbs = [{
      text: model === null || model === void 0 ? void 0 : model.title
    }, {
      text: localTitle
    }];
    if (isCopy) {
      record[model.linkColumn] += " (Copy)";
    }
    setData(record);
    setLookups(lookups);
    if (localValue !== "") {
      breadcrumbs.push({
        text: localValue
      });
    }
  };
  const handleFormCancel = function handleFormCancel() {
    navigate('./');
  };
  const handleDelete = async function handleDelete() {
    setIsDeleting(true);
    try {
      const response = await (0, _crudHelper.deleteRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        setIsLoading,
        setError: snackbar === null || snackbar === void 0 ? void 0 : snackbar.showError
      });
      if (response) {
        snackbar === null || snackbar === void 0 || snackbar.showMessage('Record Deleted Successfully.');
        navigate('./');
      }
    } catch (error) {
      snackbar === null || snackbar === void 0 || snackbar.showError('An error occured, please try after some time.');
    }
  };
  const handleChange = function handleChange(e) {
    const {
      name,
      value
    } = e.target;
    const gridData = _objectSpread({}, data);
    gridData[name] = value;
    setData(gridData);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    sx: {
      padding: 2
    }
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement(_Stack.default, {
    direction: "row",
    spacing: 2,
    justifyContent: "flex-end",
    mb: 1
  }, permissions.edit && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "submit",
    color: "success",
    onClick: formik.handleSubmit
  }, "Save"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "cancel",
    color: "error",
    onClick: handleFormCancel
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
    id: id
  })), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => setIsDeleting(false),
    title: "Confirm Delete"
  }, "Are you sure you want to delete ".concat(data === null || data === void 0 ? void 0 : data.GroupName, "?"))));
};
var _default = Form;
exports.default = _default;