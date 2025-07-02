"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _crudHelper = require("../Grid/crud-helper");
var _StateProvider = require("../useRouter/StateProvider");
const ReadonlyPanel = _ref => {
  let {
    apiEndpoint,
    model,
    onDataFetched
  } = _ref;
  const {
    useParams
  } = (0, _StateProvider.useRouter)();
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)(null);
  const {
    stateData
  } = (0, _StateProvider.useStateContext)();

  // Retrieve `id` with a default fallback value
  const {
    id: idWithOptions
  } = useParams() || {};
  const id = idWithOptions || 11; // Default to 11 if idWithOptions is not available

  const setActiveRecord = _ref2 => {
    let {
      id,
      title,
      record,
      lookups
    } = _ref2;
    onDataFetched(record);
  };
  const fetchData = async gridApi => {
    try {
      await (0, _crudHelper.getRecord)({
        api: gridApi,
        model,
        setIsLoading,
        setActiveRecord,
        id
      });
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    var _stateData$gridSettin;
    const url = (stateData === null || stateData === void 0 || (_stateData$gridSettin = stateData.gridSettings) === null || _stateData$gridSettin === void 0 || (_stateData$gridSettin = _stateData$gridSettin.permissions) === null || _stateData$gridSettin === void 0 ? void 0 : _stateData$gridSettin.Url) || "";
    let gridApi = "".concat(url).concat(model.api);
    fetchData(gridApi);
  }, [apiEndpoint, model, onDataFetched, id, fetchData, JSON.stringify(stateData)]);
};
var _default = exports.default = ReadonlyPanel;