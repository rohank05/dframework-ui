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
export const getPermissions = ({ userData = {}, model, userDefinedPermissions }) => {
    const { menuDetails = [] } = userData;
    userDefinedPermissions = userDefinedPermissions || { add: true, edit: true, delete: true };
    const userPermissions = menuDetails.find(item => item.Module === model.module);
    if (!userPermissions) {
        return { canAdd: userDefinedPermissions.add, canEdit: userDefinedPermissions.edit, canDelete: userDefinedPermissions.delete };
    }
    return {
        canAdd: userDefinedPermissions.add && Boolean(userPermissions.Permission2),
        canEdit: userDefinedPermissions.edit && Boolean(userPermissions.Permission3),
        canDelete: userDefinedPermissions.delete && Boolean(userPermissions.Permission4)
    };
};
export default utils;