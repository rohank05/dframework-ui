import React, { useEffect, useMemo } from 'react';
import { FormHelperText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectField = ({ column, field, formik, lookups, otherProps }) => {
    const userSelected = React.useRef(false);
    const { filter, placeHolder } = column;

    const initialOptions = useMemo(() => {
        const options = typeof column.lookup === 'string' ? lookups[column.lookup] : column.lookup;
        if (filter) {
            return filter({ options, currentValue: formik.values[field], state: formik.values });
        }
        return options;
    }, [column.lookup, filter, lookups, field, formik.values]);
    const [options, setOptions] = React.useState(initialOptions);

    useEffect(() => {
        if (!userSelected.current) {
            setOptions(initialOptions);
        }
    }, [initialOptions, userSelected.current]);

    let inputValue = formik.values[field];
    if (options?.length && !inputValue && !column.multiSelect && "IsDefault" in options[0]) {
        const isDefaultOption = options.find(e => e.IsDefault);
        if (isDefaultOption) {
            inputValue = isDefaultOption.value;
            formik.setFieldValue(field, isDefaultOption.value);
        }
    }
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

    const handleChange = (event) => {
        formik.handleChange(event); // Update formik's state
        userSelected.current = true;
    };
    return (
        <FormControl
            fullWidth
            key={field}
            error={formik.touched[field] && formik.errors[field]}
            variant="standard">
            <InputLabel>{placeHolder ? placeHolder : ""}</InputLabel> 
            <Select
                IconComponent={KeyboardArrowDownIcon}
                {...otherProps}
                name={field}
                multiple={column.multiSelect === true}
                readOnly={column.readOnly === true}
                value={`${inputValue}`}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                sx={{
                    backgroundColor: column.readOnly ? '#dfdede' : ''
                }}
            >
                {Array.isArray(options) && options.map(option => (
                    <MenuItem key={option.value} value={option.value} disabled={option.isDisabled}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
        </FormControl>
    );
};

export default SelectField;