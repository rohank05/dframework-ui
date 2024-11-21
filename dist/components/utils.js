"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermissions = exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
const utils = {
  filterFieldDataTypes: {
    Number: 'number',
    String: 'string',
    Boolean: 'boolean'
  },
  fixedFilterFormat: {
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD hh:mm:ss a",
    dateTimeLocal: "YYYY-MM-DD hh:mm:ss a",
    OverrideDateFormat: "DD-MMM-YYYY"
  }
};
const getPermissions = exports.getPermissions = function getPermissions(userData, model) {
  let userDefinedPermissions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const userPermissions = (userData === null || userData === void 0 ? void 0 : userData.filter(item => item.Module === model.module)) || [];
  const permissionsToUse = userPermissions.length ? userPermissions[0] : {};
  if (!userPermissions.length) {
    return {
      canAdd: userDefinedPermissions.add || false,
      canEdit: userDefinedPermissions.edit || false,
      canDelete: userDefinedPermissions.delete || false
    };
  }
  return {
    canAdd: permissionsToUse.Permission2 === 1,
    canEdit: permissionsToUse.Permission3 === 1,
    canDelete: permissionsToUse.Permission4 === 1
  };
};
var _default = exports.default = utils;