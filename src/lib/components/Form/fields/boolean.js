import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const field = ({ column, field, label, formik, otherProps, classes, onChange }) => {
    const handleChange = (event) => {
        formik.setFieldValue(field, event.target.checked);
    }
    return <div key={field}>
        <FormControlLabel
            control={
                <Checkbox
                    {...otherProps}
                    name={field}
                    disabled={column?.readOnly === true || column?.disabled}
                    checked={formik.values[field] === true}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                />
            }
            // label={label} commenting this code due to showing two label on ui 
        />
        <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
    </div>
}

export default field;