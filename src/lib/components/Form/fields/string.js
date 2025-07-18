import TextField from '@mui/material/TextField';
import React from 'react';

const field = ({ column, field, fieldLabel, formik, otherProps, classes, onChange }) => {
    return <TextField
        type="text"
        variant="standard"
        InputProps={{
            readOnly: column?.readOnly === true,
        }}
        key={field}
        required={column?.required}
        fullWidth
        name={field}
        value={formik.values[field]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
        {...otherProps}
    />
};

export default field;