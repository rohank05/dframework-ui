"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
    onDataFetched({
      record,
      lookups
    });
  };
  const fetchData = async () => {
    try {
      await (0, _crudHelper.getRecord)({
        api: apiEndpoint,
        modelConfig: model,
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
    fetchData();
  }, [apiEndpoint, model, onDataFetched, id]);
};
var _default = exports.default = ReadonlyPanel;