"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogComponent = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
const _excluded = ["open", "onConfirm", "title", "onCancel", "okText", "cancelText", "yesNo", "children", "maxWidth", "fullWidth", "customActions"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const DialogComponent = _ref => {
  let {
      open,
      onConfirm,
      title = "Confirm",
      onCancel,
      okText,
      cancelText,
      yesNo = false,
      children,
      maxWidth = 'sm',
      fullWidth = true,
      customActions = false
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  okText = okText ? okText : yesNo ? 'Yes' : 'Ok';
  cancelText = cancelText ? cancelText : yesNo ? 'No' : 'Cancel';
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, _extends({}, props, {
    open: open,
    onClose: onCancel,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    maxWidth: maxWidth,
    fullWidth: fullWidth
  }), /*#__PURE__*/_react.default.createElement(_DialogTitle.default, {
    id: "alert-dialog-title",
    sx: {
      backgroundColor: '#e0e0e0',
      mb: 2
    }
  }, title), /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_DialogContentText.default, null, children)), !customActions && /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onCancel
  }, cancelText), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onConfirm,
    autoFocus: true
  }, okText)));
};
exports.DialogComponent = DialogComponent;