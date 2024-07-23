import React from 'react';
import { FormHelperText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const field = ({ column, field, fieldLabel, formik, activeRecord, lookups, otherProps, classes, onChange }) => {
    console.log('lookups', lookups)
    const options = typeof column.lookup === 'string' ? activeRecord?.lookups[column.lookup] : column.lookup;
    let inputValue = formik.values[field];
    console.log('input values', inputValue)
    if (column.multiSelect) {
        if (!inputValue || inputValue.length === 0) {
            inputValue = [];
        }
        else {
            if (!Array.isArray(inputValue)) {
                inputValue = inputValue.split(',').map((e) => parseInt(e));
            }
        }
    }
    return (
        <FormControl
            fullWidth
            key={field}
            variant="standard">
            <InputLabel>{fieldLabel}</InputLabel>
            <Select
                IconComponent={KeyboardArrowDownIcon}
                {...otherProps}
                name={field}
                multiple={column.multiSelect === true}
                readOnly={column.readOnly === true}
                value={inputValue}
                // label={fieldLabel}
                onChange={formik.handleChange}
                // onChange={onChange}
                onBlur={formik.handleBlur}
                MenuProps={{
                    classes: {
                        // list: classes.select
                    }
                }}
            >
                {Array.isArray(options) && options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </Select>
            <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
        </FormControl>
    )
}

export default field;