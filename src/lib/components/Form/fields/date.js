import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

const field = ({ column, field, fieldLabel, formik, otherProps, classes, fieldConfigs }) => {
    const isDisabled = fieldConfigs?.disabled;
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            {...otherProps}
            variant="standard"
            readOnly={column?.readOnly === true}
            key={field}
            fullWidth
            name={field}
            value={formik.values[field]}
            onChange={(value) => formik.setFieldValue(field, value)}
            onBlur={formik.handleBlur}
            helperText={formik.touched[field] && formik.errors[field]}
            disablePast={column?.disablePast}
            disabled={isDisabled}
            renderInput={(params) => {
                let helperText;
                if (isDisabled && column.showErrorText) {
                    helperText = `Survey already started`;
                } else if (formik.touched[field] && formik.errors[field]) {
                    helperText = formik.errors[field];
                }
                const showError = !!helperText;
                const props = { ...params, variant: "standard", error: showError };
                return <TextField
                    {...props}
                    helperText={helperText}
                    fullWidth
                />
            }}
        />
    </LocalizationProvider>
}

export default field;