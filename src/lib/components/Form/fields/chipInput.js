import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useCallback } from 'react';

const Field = ({ isAdd, column, field, formik, otherProps, fieldConfigs = {}, mode }) => {
    const inputValue = formik.values[field]?.length ? formik.values[field].split(",") : [];
    const isDisabled = mode !== 'copy' ? fieldConfigs.disabled : false;
    const fixedOptions = column.hasDefault && !isAdd ? [inputValue[0]] : [];

    const handleAutoCompleteChange = useCallback((e, newValue, action, item = {}) => {
        const lastElement = newValue.pop()?.trim();
        if (!newValue.includes(lastElement)) {
            newValue.push(lastElement);
        }
        if (fixedOptions && fixedOptions.includes(item.option) && action === "removeOption") {
            newValue = [item.option];
        }
        formik.setFieldValue(field, newValue?.join(',') || '');
    },[formik, field]);

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
                value={inputValue}
                options={[]}
                renderInput={(params) => <TextField {...params} variant="standard" />}
                onChange={handleAutoCompleteChange}
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

