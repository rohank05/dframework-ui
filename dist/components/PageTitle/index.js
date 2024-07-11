"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _reactHelmetAsync = require("react-helmet-async");
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _core = require("@material-ui/core");
var _reactI18next = require("react-i18next");
var _Typography = _interopRequireDefault(require("../Typography"));
var _useMobile = _interopRequireDefault(require("../useMobile"));
var _question = _interopRequireDefault(require("../../assets/images/question.png"));
var _material = require("@mui/material");
var _HelpModal = _interopRequireDefault(require("../HelpModal"));
var _actions = _interopRequireDefault(require("../useRouter/actions"));
var _StateProvider = require("../useRouter/StateProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function PageTitle(props) {
  let gridUrl;
  const {
    pageTitleStyle,
    mediaQuery,
    pageTitleBackground,
    titleHeading,
    name = null,
    icon: Icon,
    iconclass,
    RightComponent = null,
    mobileRightComponent,
    title = "",
    titleDescription = "",
    titleClass = "text-theme-blue text-max-width",
    showTitleInfo,
    showBreadcrumbs,
    breadcrumbs
  } = props;
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  const isMobile = (0, _useMobile.default)(true);
  const {
    dispatchData,
    stateData
  } = (0, _StateProvider.useStateContext)();
  gridUrl = stateData.gridSettings.permissions.Url;
  const showImage = false;
  const card = [{
    title: "New Features",
    subTitle: "",
    url: 'https://coolrgroup.tourial.com/5df412f2-7667-48d6-8599-ccec9a3a4192'
  }, {
    title: "Playbook Overview",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/71309683-3997-452a-8bf2-67c706f6a11f"
  }, {
    title: "Data & Settings",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/ddd14085-4dee-46e2-8d0d-0573c9304ffa"
  }, {
    title: "Operations",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/59ad4e7d-d254-4c0d-a861-6803cee53816"
  }, {
    title: "Outlets",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/546817a2-ab3b-4651-acad-c70fa1a0dddd"
  }, {
    title: "Business Performance",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/870cce3b-2642-4358-96c7-85043d2996ee"
  }, {
    title: "Replenishment",
    subTitle: "",
    url: "https://coolrgroup.tourial.com/68625e21-69d7-47cb-9f6e-e55afbd49bbd"
  }];
  function handleCardClick(data) {
    const obj = card.find(item => item.title === data);
    dispatchData({
      type: _actions.default.OPEN_MODAL,
      payload: {
        status: true,
        data: obj
      }
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, title)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "print-only",
    text: titleHeading
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: !showTitleInfo ? (0, _clsx.default)(pageTitleStyle, pageTitleBackground) : ""
  }, showBreadcrumbs && breadcrumbs && /*#__PURE__*/_react.default.createElement(_material.Breadcrumbs, {
    "aria-label": "breadcrumb",
    separator: ">",
    className: "".concat(titleClass, " breadcrumbs-text-title text-max-width")
  }, breadcrumbs.map((breadcrumb, index) => /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: {
      fontSize: '16px',
      fontWeight: "bold"
    },
    key: index,
    className: "".concat(titleClass, " breadcrumbs-text-title text-max-width")
  }, breadcrumb.text))), Icon && /*#__PURE__*/_react.default.createElement(_core.Box, null, /*#__PURE__*/_react.default.createElement(Icon, {
    iconclass: iconclass || "cameraIconTitle",
    className: iconclass || "cameraIconTitle"
  })), /*#__PURE__*/_react.default.createElement(_core.Box, {
    className: "app-page-title--first"
  }, mediaQuery ? /*#__PURE__*/_react.default.createElement("div", {
    className: "app-page-title--heading-media ".concat(isMobile ? "small-text pl-2" : "")
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "".concat(titleClass, "  ").concat(isMobile ? "display-4 pl-2" : "", " ")
  }, titleHeading)) : /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(titleDescription ? "mt-2" : "")
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: isMobile ? 'block' : "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: "1 0 auto"
    }
  }, showTitleInfo ? showTitleInfo : /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "".concat(titleClass, " page-text-title"),
    variant: "p",
    text: titleHeading,
    name: name
  }), titleDescription && /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "".concat(titleClass, " page-text-description"),
    variant: "p",
    component: "p",
    text: titleDescription
  })), showImage && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Help",
    open: showTooltip,
    placement: "right",
    className: "tooltip-help"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _question.default,
    alt: "help",
    style: {
      width: "40px",
      height: "40px",
      marginLeft: "10px",
      marginTop: "5px"
    },
    onClick: () => {
      handleCardClick(titleHeading);
    },
    onMouseEnter: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false)
  }))))), !isMobile && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Box, null, " ", RightComponent && /*#__PURE__*/_react.default.createElement(RightComponent, null), " "), /*#__PURE__*/_react.default.createElement(_core.Box, null, " ", mobileRightComponent, " "))), /*#__PURE__*/_react.default.createElement(_HelpModal.default, null));
}
var _default = exports.default = (0, _reactI18next.withTranslation)()(PageTitle);