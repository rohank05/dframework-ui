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
export const getPermissions = (userData, model, fallbackPermissions = {}) => {
    const userPermissions = userData?.filter(item => item.Module === model.module) || [];
    const permissionsToUse = userPermissions.length ? userPermissions[0] : {};

    return {
        canAdd: userPermissions.length 
            ? permissionsToUse.Permission2 === 1 
            : fallbackPermissions.add || false,
        canEdit: userPermissions.length 
            ? permissionsToUse.Permission3 === 1 
            : fallbackPermissions.edit || false,
        canDelete: userPermissions.length 
            ? permissionsToUse.Permission4 === 1 
            : fallbackPermissions.delete || false
    };
};
export default utils;