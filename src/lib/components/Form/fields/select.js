import React, { useEffect, useMemo } from 'react';
import { FormHelperText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectField = ({ column, field, fieldLabel, formik, activeRecord, lookups, otherProps, classes, onChange, getRecordAndLookups }) => {
    const [userSelected, setUserSelected] = React.useState(false);
    const { filter } = column;

    const initialOptions = useMemo(() => {
        let options = typeof column.lookup === 'string' ? lookups[column.lookup] : column.lookup;
        if (filter) {
            return filter({ options, currentValue: formik.values[field], state: formik.values });
        }
        return options;
    }, [column.lookup, filter, lookups, field, formik.values]);
    const [options, setOptions] = React.useState(initialOptions);

    useEffect(() => {
        if (!userSelected) {
            setOptions(initialOptions);
        }
    }, [initialOptions, userSelected]);

    const setActiveRecord = (lookups) => {
        const { State } = lookups;
        if (!State) return;
        if (!userSelected) {
            setOptions(State);
        }
    };

    const onOpen = () => {
        if (!column.parentComboField) return;
        const valueField = column.parentComboField;
        if (!formik.values[valueField]) return;
        getRecordAndLookups({
            scopeId: formik.values[valueField],
            lookups: column.lookup,
            customSetIsLoading: () => { },
            customSetActiveRecord: setActiveRecord
        });
    };

    useEffect(() => {
        onOpen();
    }, [formik.values[column.parentComboField]]);

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
        setUserSelected(true); // Set the flag to true when the user makes a selection
    };
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
                onOpen={onOpen}
                multiple={column.multiSelect === true}
                readOnly={column.readOnly === true}
                value={`${inputValue}`}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                MenuProps={{
                    classes: {
                        // list: classes.select
                    }
                }}
            >
                {Array.isArray(options) && options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
        </FormControl>
    );
};

export default SelectField;