"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _StateProvider = require("../../useRouter/StateProvider");
var _httpRequest = require("../../Grid/httpRequest");
var _SnackBar = require("../../SnackBar");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Document(_ref) {
  var _stateData$gridSettin, _formik$values$field;
  let {
    column,
    field,
    fieldLabel,
    formik,
    lookups,
    data,
    otherProps,
    model,
    fieldConfigs,
    mode
  } = _ref;
  let inputValue = formik.values[field] || "";
  const {
    stateData
  } = (0, _StateProvider.useStateContext)();
  const {
    uploadApi,
    mediaApi,
    Url
  } = stateData === null || stateData === void 0 || (_stateData$gridSettin = stateData.gridSettings) === null || _stateData$gridSettin === void 0 ? void 0 : _stateData$gridSettin.permissions;
  const [formState, setFormState] = (0, _react.useState)({
    isExternal: "no",
    selectedFile: null
  });
  const snackbar = (0, _SnackBar.useSnackbar)();
  const {
    getParams,
    useParams
  } = (0, _StateProvider.useRouter)();
  const {
    associationId
  } = useParams() || getParams;
  const id = (associationId === null || associationId === void 0 ? void 0 : associationId.split("-")[0]) || 1;
  const handleRadioChange = event => {
    const isExternal = event.target.value;
    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      isExternal,
      selectedFile: null
    }));
    formik.setFieldValue(field, formik.values[field]); // Reset form field value
  };
  const handleInputChange = value => {
    formik.setFieldValue(field, value);
  };
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setFormState(prev => _objectSpread(_objectSpread({}, prev), {}, {
        selectedFile: file
      }));
    }
  };
  const handleFileUpload = async () => {
    if (!formState.selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", formState.selectedFile);
      formData.append("DocumentGroupId", formik.values.DocumentGroupId); // Doc group ID
      formData.append("AssociationId", id); // Association ID
      const response = await (0, _httpRequest.transport)({
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: uploadApi,
        data: formData
      });
      const data = response.data || {};
      if (!data.success) {
        snackbar.showError(data.message || "Upload failed");
        return;
      }
      const fileUrl = mediaApi + '/' + data.filePath;
      formik.setFieldValue(field, fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const host = new URL(Url).hostname;
  _react.default.useEffect(() => {
    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      isExternal: !inputValue.includes(host) ? "yes" : "no"
    }));
  }, [inputValue]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      marginBottom: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      width: "150px",
      marginRight: 2
    }
  }, "External Link?"), /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    row: true,
    value: formState.isExternal,
    onChange: handleRadioChange,
    "aria-label": "is-external-link",
    name: "is-external-link"
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "yes",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "Yes"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "no",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "No"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      marginBottom: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      width: "150px",
      marginRight: 2
    }
  }, "Document Link"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, formState.isExternal === "yes" ? /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    value: inputValue,
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: formik.values[field].length > 500 ? "red" : "" // Default border color
        },
        "&.Mui-focused fieldset": {
          borderColor: formik.values[field].length > 500 ? "red" : "" // Focused state
        },
        "&:hover fieldset": {
          borderColor: formik.values[field].length > 500 ? "red" : "" // Hover state
        }
      }
    },
    onChange: e => handleInputChange(e.target.value),
    placeholder: "Enter external link"
    // inputProps={{ maxLength: 500 }} 
  }) : /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    value: inputValue,
    placeholder: "Link autopopulated once uploaded",
    InputProps: {
      readOnly: true
    }
  }), ((_formik$values$field = formik.values[field]) === null || _formik$values$field === void 0 ? void 0 : _formik$values$field.length) > 500 && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: {
      color: 'red'
    }
  }, "Document Link must be at most 500 characters long"))), formState.isExternal === "no" && /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label"
  }, "Choose File", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    hidden: true,
    onChange: handleFileChange
  })), formState.selectedFile && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, formState.selectedFile.name), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    color: "primary",
    onClick: handleFileUpload,
    disabled: !formState.selectedFile
  }, "Upload File")));
}
var _default = exports.default = Document;