"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
function useMobile() {
  let onlyMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  const initialValue = checkDevice();
  const [view, setView] = (0, _react.useState)(initialValue);
  function handleWindowSizeChange() {
    setTimeout(() => {
      setView(checkDevice());
    }, 10);
  }
  (0, _react.useEffect)(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  function checkDevice() {
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    userAgent = userAgent.toLowerCase();
    const tablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    let currentOrientation = null;
    if (window.innerWidth <= window.innerHeight) {
      currentOrientation = "portrait";
    } else {
      currentOrientation = "landscape";
    }
    return {
      mobile,
      tablet,
      portrait: currentOrientation === 'portrait',
      landscape: currentOrientation === 'landscape'
    };
  }
  return onlyMobile ? view.mobile : view;
}
var _default = exports.default = useMobile;