import TextField from '@mui/material/TextField';
import React from 'react';

const field = ({ column, field, formik, otherProps }) => {
    const rows = column.rows || (column.multiline ? 5 : ""); // Default to column.rows or 5 rows if multiline
    return <TextField
        type="text"
        variant={column.variant || "standard"}
        InputProps={{
            readOnly: column?.readOnly === true,
            sx: column?.readOnly
                ? { backgroundColor: '#dfdede' } // Light grey background for read-only inputs
                : undefined,
        }}
        key={field}
        required={column?.required}
        multiline={column.multiline}
        rows={rows}
        fullWidth
        name={field}
        value={formik.values[field]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
        autoComplete={column.autoComplete}
        {...otherProps}
    />
};

export default field;