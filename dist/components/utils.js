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
  },
  errorMapping: {
    413: "Upload failed: The file exceeds the 30 MB size limit. Please select a smaller file."
  },
  permissionsMapper: {
    add: "Permission2",
    edit: "Permission3",
    delete: "Permission4"
  }
};
const getPermissions = _ref => {
  let {
    userData = {},
    model,
    userDefinedPermissions
  } = _ref;
  const {
    permissions = []
  } = userData;
  userDefinedPermissions = userDefinedPermissions || {
    add: true,
    edit: true,
    delete: true
  };
  const userPermissions = permissions.find(item => item.Module === model.module);
  if (!userPermissions) {
    return {
      canAdd: userDefinedPermissions.add,
      canEdit: userDefinedPermissions.edit,
      canDelete: userDefinedPermissions.delete
    };
  }
  return {
    canAdd: userDefinedPermissions.add && Boolean(userPermissions[utils.permissionsMapper.add]),
    canEdit: userDefinedPermissions.edit && Boolean(userPermissions[utils.permissionsMapper.edit]),
    canDelete: userDefinedPermissions.delete && Boolean(userPermissions[[utils.permissionsMapper.delete]])
  };
};
exports.getPermissions = getPermissions;
var _default = exports.default = utils;