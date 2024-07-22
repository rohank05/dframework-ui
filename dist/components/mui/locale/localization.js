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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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