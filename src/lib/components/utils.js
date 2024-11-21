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
}
export const getPermissions = (userData, model, userDefinedPermissions = {}) => {
    const userPermissions = userData?.filter(item => item.Module === model.module) || [];
    const permissionsToUse = userPermissions.length ? userPermissions[0] : {};
    if(!userPermissions.length) {
	return { canAdd: userDefinedPermissions.add || false, canEdit: userDefinedPermissions.edit || false, canDelete: userDefinedPermissions.delete || false };
    }
    return {
        canAdd: permissionsToUse.Permission2 === 1,
        canEdit: permissionsToUse.Permission3 === 1,
        canDelete: permissionsToUse.Permission4 === 1 
    };
};
export default utils;