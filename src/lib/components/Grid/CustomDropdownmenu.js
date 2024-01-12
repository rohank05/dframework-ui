import * as React from 'react';
import { useState } from 'react';
import {
    useGridSelector,
    gridFilterModelSelector,
} from '@mui/x-data-grid-premium';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CustomDropdownmenu = (props) => {
    const { column, item, applyValue } = props;
    const lookupData = column?.dataRef?.current?.lookups;
    let options = lookupData[column.lookup] || [];
    const [isMultiSelect, setIsMultiSelect] = useState(false);

    if (typeof column.lookup === 'string') {
        options = options.map(({ label, value, scopeId, ...option }) => ({
            label: label,
            value: value
        }));
    }

    const apiRef = props.apiRef;
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);

    const currentFieldFilters = React.useMemo(
        () =>
            filterModel.items?.filter((value) => {
                if (value.operator === 'isAnyOf') {
                    setIsMultiSelect(true)
                } else {
                    setIsMultiSelect(false)
                }
                return value.field === column.field;
            }),
        [column.field, filterModel.items]
    );

    const handleFilterChange = React.useCallback(
        (event) => {
            let inputValue = event.target.value;
            if (column.applyZeroFilter) {
                inputValue = inputValue.toString();
            }
            if (!inputValue) {
                if (currentFieldFilters[0]) {
                    apiRef.current.deleteFilterItem(currentFieldFilters[0]);
                }
                return;
            }

            // If multi-select, ensure the value is an array
            const newValue = isMultiSelect ? [...inputValue] : inputValue;

            applyValue({ ...item, value: newValue });
        },
        [apiRef, column.field, currentFieldFilters, isMultiSelect]
    );

    const value = currentFieldFilters[0]?.value ?? '';
    const isMulti = isMultiSelect ? { multiple: true } : {};

    return (
        <FormControl variant="standard" className="w-100">
            <InputLabel></InputLabel>
            <Select
                label={column.field}
                variant="standard"
                value={isMultiSelect ? [...value] : value}
                onChange={(e) => handleFilterChange(e)}
                {...isMulti}
            >
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomDropdownmenu;
