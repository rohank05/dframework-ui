import React, { useMemo } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const Field = ({ column, field, label, formik, otherProps, classes, onChange }) => {
    const handleChange = (event) => {
        formik.setFieldValue(field, event.target.checked);
    }
    const checked = useMemo(()=> formik.values[field] !== undefined ? formik.values[field] === true : column.defaultValue, [formik, column])
    return <div key={field}>
        <FormControlLabel
            control={
                <Checkbox
                    {...otherProps}
                    name={field}
                    disabled={column?.readOnly === true || column?.disabled}
                    checked={checked}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    defaultChecked={column.defaultValue}
                />
            }
        />
        <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
    </div>
}

export default Field;