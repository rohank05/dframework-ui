import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Field = ({ column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) => {
    let inputValue = formik.values[field]?.split(", ")?.map(Number) || [];
    let options = lookups ? lookups[column?.lookup] : [];
    const { filter } = column;

    if(filter){
        options = filter({ options });
    }

    let filteredCombos = options?.filter(option => inputValue.includes(option.value)) || [];
    let isDisabled;
    if (mode !== 'copy') {
        isDisabled = fieldConfigs?.disabled;
    }
    const handleAutoCompleteChange = (event, newValue) => {
        formik?.setFieldValue(field, newValue ? newValue.map(val => val.value).join(', ') : '');
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
                options={options || []}
                getOptionLabel={(option) => option.label || ''}
                defaultValue={filteredCombos}
                renderInput={(params) => <TextField {...params} variant="standard" />}
                onChange={handleAutoCompleteChange}
                value={filteredCombos}
                size="small"
                disabled={isDisabled}
            />
            {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]}</FormHelperText>}
        </FormControl>
    )
}

export default Field;

