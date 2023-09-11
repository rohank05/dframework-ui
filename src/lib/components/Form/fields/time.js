import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const field = ({ column, field, fieldLabel, formik, otherProps, classes }) => {
    let inputValue = formik.values[field];
    if (column.isUtc) {
        inputValue = dayjs.utc(inputValue).utcOffset(dayjs().utcOffset(), true).format();
    }
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
            {...otherProps}
            variant="standard"
            readOnly={column?.readOnly === true}
            key={field}
            fullWidth
            name={field}
            value={inputValue}
            onChange={(value) => {
                if (column.isUtc) {
                    value = (value && value.isValid()) ? value.format('YYYY-MM-DDTHH:mm:ss') + '.000Z' : null;
                }
                return formik.setFieldValue(field, value);
            }}
            onBlur={formik.handleBlur}
            helperText={formik.touched[field] && formik.errors[field]}
            renderInput={(params) => {
                const props = { ...params, variant: "standard" };
                return <TextField
                    {...props}
                    helperText={formik.errors[field]}
                    fullWidth />
            }}
        />
    </LocalizationProvider>
}

export default field;