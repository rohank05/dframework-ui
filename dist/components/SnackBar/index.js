"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnackbar = exports.SnackbarProvider = exports.SnackbarContext = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireWildcard(require("react"));
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _Alert = _interopRequireDefault(require("@mui/material/Alert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SnackbarContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.SnackbarContext = SnackbarContext;
const Alert = /*#__PURE__*/_react.default.forwardRef(function Alert(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Alert.default, _extends({
    elevation: 6,
    ref: ref,
    variant: "filled"
  }, props));
});
const SnackbarProvider = _ref => {
  let {
    children
  } = _ref;
  const [message, setMessage] = (0, _react.useState)(null);
  const [open, setOpen] = (0, _react.useState)(false);
  const [severity, setSeverity] = (0, _react.useState)(null);
  const [handleAction, setHandleAction] = (0, _react.useState)(null);
  const showMessage = function showMessage(title, message) {
    let severity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "info";
    let onAction = arguments.length > 3 ? arguments[3] : undefined;
    if (typeof title !== 'string') {
      title = title.toString();
    }
    if (message && typeof message !== 'string') {
      message = message.toString();
    }
    setMessage(message ? "".concat(title, ": ").concat(message) : title);
    setSeverity(severity);
    setOpen(true);
    setHandleAction(onAction);
  };
  const showError = function showError(title, message) {
    let severity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "error";
    let onAction = arguments.length > 3 ? arguments[3] : undefined;
    showMessage(title, message, severity, onAction);
  };
  const handleClose = function handleClose() {
    setOpen(false);
    setHandleAction(null);
    if (handleAction) {
      handleAction();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(SnackbarContext.Provider, {
    value: {
      showMessage,
      showError
    }
  }, children), /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    open: open,
    autoHideDuration: 6000,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(Alert, {
    severity: severity
  }, message)));
};
exports.SnackbarProvider = SnackbarProvider;
const useSnackbar = function useSnackbar() {
  return (0, _react.useContext)(SnackbarContext);
};
exports.useSnackbar = useSnackbar;