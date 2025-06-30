"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnackbar = exports.SnackbarProvider = exports.SnackbarContext = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _Alert = _interopRequireDefault(require("@mui/material/Alert"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SnackbarContext = exports.SnackbarContext = /*#__PURE__*/(0, _react.createContext)(null);
const vertical = 'bottom';
const horizontal = 'center';
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
    onClose: handleClose,
    anchorOrigin: {
      vertical,
      horizontal
    }
  }, /*#__PURE__*/_react.default.createElement(Alert, {
    severity: severity
  }, message)));
};
exports.SnackbarProvider = SnackbarProvider;
const useSnackbar = exports.useSnackbar = function useSnackbar() {
  return (0, _react.useContext)(SnackbarContext);
};