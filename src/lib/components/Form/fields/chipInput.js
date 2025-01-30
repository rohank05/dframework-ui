import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const Field = ({ isAdd, column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) => {
    let inputValue = formik.values[field]?.length ? formik.values[field].split(", ") : [];
    let isDisabled;
    if (mode !== 'copy') {
        isDisabled = fieldConfigs?.disabled;
    }
    console.log(isAdd);
    const handleAutoCompleteChange = (event, newValue) => {
        console.log(newValue);
        let lastElement = newValue.pop();
        lastElement = lastElement?.trim();
        if (!newValue.includes(lastElement)) {
            newValue.push(lastElement);
        }
        formik.setFieldValue(field, newValue?.join(', ') || '');
    }
    const fixedOptions = column.hasDefault && !isAdd ? inputValue[0] : '';

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
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                            <Chip
                                key={key}
                                label={option}
                                {...tagProps}
                                disabled={fixedOptions.includes(option)}
                            />
                        );
                    })
                }
                disabled={isDisabled}
            />
            {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]}</FormHelperText>}
        </FormControl>
    )
}

export default Field;

