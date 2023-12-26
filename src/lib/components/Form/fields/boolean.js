import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const field = ({ column, field, fieldLabel, formik, otherProps, classes, onChange }) => {
    const handleChange = (event) => {
        formik.setFieldValue(field, event.target.checked);
    }
    return <div key={field}>
        <FormControlLabel
            control={
                <Checkbox
                    {...otherProps}
                    name={field}
                    readOnly={column.readOnly === true}
                    checked={formik.values[field]}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                />
            }
            label={fieldLabel}
        />
        <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
    </div>
}

export default field;