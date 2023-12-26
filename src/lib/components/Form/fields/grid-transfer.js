import React from 'react';
import { makeStyles } from "@material-ui/core";
import { useCallback } from "react";

const useStyles = makeStyles({
    divSpacing: {
        marginTop: '10px',
        marginBottom: '10px',
        fontSize: '20px'
    }
});
const TransferField = ({ component, name, field, formik, type, model, column, ...props }) => {
    const { value } = formik.getFieldProps(name || field);
    const { setFieldValue } = formik;
    const Component = component || column.relation;
    const classes = useStyles();
    const onAssignChange = useCallback((value) => {
        setFieldValue(name || field, value);
    }, [setFieldValue, name, field]);
    return (
        <div>
            <div className={`${classes.divSpacing}`}>{`${"Available"} ${column.label}`}</div>
            <Component selected={value} available={true} onAssignChange={onAssignChange} />
            <div className={`${classes.divSpacing}`}>{`${"Assigned"} ${column.label}`}</div>
            <Component selected={value} assigned={true} onAssignChange={onAssignChange} />
        </div>
    )
}

export default TransferField;