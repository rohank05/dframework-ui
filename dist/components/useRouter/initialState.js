"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const initialState = {
  dataLocalization: 'en',
  dateTime: 'DD-MM-YYYY',
  dataForm: '',
  pageTitleDetails: null,
  modal: null,
  pageBackButton: {
    status: false,
    backRoute: ""
  },
  gridSettings: {},
  getLocal: {},
  getUserData: null,
  preferences: [],
  currentPreference: null,
  totalPreferences: null,
  loaderOpen: false
};
var _default = exports.default = initialState;