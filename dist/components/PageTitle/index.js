"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _react = _interopRequireDefault(require("react"));
var _reactHelmetAsync = require("react-helmet-async");
var _material = require("@mui/material");
var _reactI18next = require("react-i18next");
var _Typography = _interopRequireDefault(require("../Typography"));
var _useMobile = _interopRequireDefault(require("../useMobile"));
var _Help = _interopRequireDefault(require("@mui/icons-material/Help"));
var _HelpModal = _interopRequireDefault(require("../HelpModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function PageTitle(props) {
  const {
    titleHeading,
    name = null,
    RightComponent = null,
    mobileRightComponent,
    title = "",
    titleClass = "text-theme-blue text-max-width",
    showBreadcrumbs,
    breadcrumbs = [],
    enableBackButton = false,
    breadcrumbColor
  } = props;
  const isMobile = (0, _useMobile.default)(true);
  const breadcrumbsLasIndex = breadcrumbs.length - 1;
  const needToShowBreadcrumbs = showBreadcrumbs && breadcrumbs.length;
  const handleBack = () => {
    window.history.back(); // Navigate to the previous page when clicked
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, title)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "print-only",
    text: titleHeading
  }), needToShowBreadcrumbs && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement(_material.Card, {
    sx: {
      mb: 3
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardContent, {
    sx: {
      backgroundColor: breadcrumbColor || '#fff'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      display: 'flex',
      alignItems: 'center',
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Breadcrumbs, {
    variant: "h5",
    "aria-label": "breadcrumb",
    separator: ">",
    className: "".concat(titleClass, " breadcrumbs-text-title text-max-width")
  }, breadcrumbs.map((breadcrumb, index) => index < breadcrumbsLasIndex ? /*#__PURE__*/_react.default.createElement(_material.Link, {
    onClick: handleBack,
    key: index,
    className: "".concat(titleClass, " breadcrumbs-text-title text-max-width"),
    variant: "inherit",
    sx: {
      textDecoration: 'none',
      color: '#1976d2'
    }
  }, breadcrumb.text) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    key: index,
    className: "".concat(titleClass, " breadcrumbs-text-title text-max-width"),
    variant: "inherit"
  }, breadcrumb.text)))), (breadcrumbs.length > 1 || enableBackButton) && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleBack
  }, "Back")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    color: "primary",
    title: "Help",
    size: "large"
  }, /*#__PURE__*/_react.default.createElement(_Help.default, {
    fontSize: "inherit"
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "app-page-title--first"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: isMobile ? 'block' : "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: "1 0 auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "".concat(titleClass, " page-text-title"),
    variant: "p",
    text: titleHeading,
    name: name
  }))))), !isMobile && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, " ", RightComponent && /*#__PURE__*/_react.default.createElement(RightComponent, null), " "), /*#__PURE__*/_react.default.createElement(_material.Box, null, " ", mobileRightComponent, " ")))), /*#__PURE__*/_react.default.createElement(_HelpModal.default, null), " "));
}
var _default = exports.default = (0, _reactI18next.withTranslation)()(PageTitle);