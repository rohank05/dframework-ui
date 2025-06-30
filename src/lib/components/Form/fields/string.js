import TextField from '@mui/material/TextField';
import React from 'react';

const field = ({ column, field, formik, otherProps }) => {
    return <TextField
        type="text"
        variant={column.variant || "standard"}
        InputProps={{
            readOnly: column.readOnly === true,
            sx: column.readOnly
                ? { backgroundColor: '#dfdede' } // Light grey background for read-only inputs
                : undefined,
        }}
        key={field}
        required={column?.required}
        multiline={column.multiline}
        rows={column.rows || 5}
        fullWidth
        name={field}
        value={formik.values[field]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
        autoComplete={column.autoComplete}
        {...otherProps}
        defaultValue={column.defaultValue}
    />
};

export default field;