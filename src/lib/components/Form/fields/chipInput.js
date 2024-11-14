import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Field = ({ column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) => {
    let inputValue = formik.values[field]?.length ? formik.values[field].split(", ") : [];
    console.log('formik value', formik.values[field], inputValue);
    let isDisabled;
    if (mode !== 'copy') {
        isDisabled = fieldConfigs?.disabled;
    }
    const handleAutoCompleteChange = (event, newValue) => {
        formik.setFieldValue(field, newValue?.join(', ') || '');
    }

    return (
        <FormControl
            fullWidth
            key={field}
            variant="standard"
            error={formik.touched[field] && Boolean(formik.errors[field])}
        >
            <Autocomplete
                {...otherProps}
                multiple
                id={field}
                freeSolo={true}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                value={inputValue}
                options={[]}
                renderInput={(params) => <TextField {...params} variant="standard" />}
                onChange={handleAutoCompleteChange}
                // value={filteredCombos}
                size="small"
                disabled={isDisabled}
                style={{ width: 500 }}
            />
            {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]}</FormHelperText>}
        </FormControl>
    )
}

export default Field;

