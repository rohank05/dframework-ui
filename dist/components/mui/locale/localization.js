"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locales = void 0;
var _daDK = _interopRequireDefault(require("./data-grid/daDK"));
var _deDE = _interopRequireDefault(require("./data-grid/deDE"));
var _elGR = _interopRequireDefault(require("./data-grid/elGR"));
var _esES = _interopRequireDefault(require("./data-grid/esES"));
var _frFR = _interopRequireDefault(require("./data-grid/frFR"));
var _itIT = _interopRequireDefault(require("./data-grid/itIT"));
var _trTR = _interopRequireDefault(require("./data-grid/trTR"));
var _ptPT = _interopRequireDefault(require("./data-grid/ptPT"));
var _enUS = _interopRequireDefault(require("./data-grid/enUS"));
var React = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// localization.js

const locales = exports.locales = {
  'en': _enUS.default,
  'tr-TR': _trTR.default,
  'es-ES': _esES.default,
  'da-DK': _daDK.default,
  'de-DE': _deDE.default,
  'el-GR': _elGR.default,
  'fr-FR': _frFR.default,
  'pt-PT': _ptPT.default,
  'it-IT': _itIT.default
};