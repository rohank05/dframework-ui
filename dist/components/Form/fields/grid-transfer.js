"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@material-ui/core");
var _react = require("react");
const _excluded = ["component", "name", "formik", "field", "type", "column"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const useStyles = (0, _core.makeStyles)({
  divSpacing: {
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '20px'
  }
});
const TransferField = _ref => {
  let {
      component,
      name,
      formik,
      field,
      type,
      column
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    value
  } = formik.getFieldProps(name || field);
  const {
    setFieldValue
  } = formik;
  const Component = component || column.relation;
  const classes = useStyles();
  const onAssignChange = (0, _react.useCallback)(value => {
    setFieldValue(name || field, value);
  }, [setFieldValue, name, field]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(classes.divSpacing, " ")
  }, "Available".concat(" ", column.label)), /*#__PURE__*/React.createElement(Component, {
    selected: value,
    available: true,
    onAssignChange: onAssignChange,
    disableCellRedirect: column.disableCellRedirect,
    useLinkColumn: column.useLinkColumn,
    readOnly: column.readOnly
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(classes.divSpacing, " ")
  }, "Assigned".concat(" ", column.label)), /*#__PURE__*/React.createElement(Component, {
    selected: value,
    assigned: true,
    onAssignChange: onAssignChange,
    disableCellRedirect: column.disableCellRedirect,
    useLinkColumn: column.useLinkColumn,
    readOnly: column.readOnly
  }));
};
var _default = exports.default = TransferField;