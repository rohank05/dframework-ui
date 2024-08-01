"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CustomLoader = () => {
  const gridStyle = {
    width: "60vw",
    height: "60vw",
    border: "2px dotted lightgray",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)"
  };
  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "center",
    alignItems: "center",
    style: gridStyle
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    id: "footer",
    color: "text.secondary",
    align: "center",
    sx: {
      mt: 14,
      mb: 2,
      position: "fixed",
      top: 280,
      left: 0,
      bottom: 0,
      width: "100%",
      textAlign: "center",
      fontWeight: 400
    }
  }, "Loading..."));
};
var _default = exports.default = CustomLoader;