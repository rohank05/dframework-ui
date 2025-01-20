"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermissions = exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
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
const getPermissions = _ref => {
  let {
    userData,
    model,
    userDefinedPermissions
  } = _ref;
  const {
    menuDetails
  } = userData || [];
  userDefinedPermissions = userDefinedPermissions || {
    add: true,
    edit: true,
    delete: true
  };
  const userPermissions = menuDetails.find(item => item.Module === model.module);
  if (!userPermissions) {
    return {
      canAdd: userDefinedPermissions.add,
      canEdit: userDefinedPermissions.edit,
      canDelete: userDefinedPermissions.delete
    };
  }
  return {
    canAdd: userDefinedPermissions.add && Boolean(userPermissions.Permission2),
    canEdit: userDefinedPermissions.edit && Boolean(userPermissions.Permission3),
    canDelete: userDefinedPermissions.delete && Boolean(userPermissions.Permission4)
  };
};
exports.getPermissions = getPermissions;
var _default = exports.default = utils;