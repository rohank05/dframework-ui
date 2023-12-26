import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getGridDateOperators } from '@mui/x-data-grid-premium';
import { useStateContext } from '../useRouter/StateProvider';
const fixedFilterFormat = {
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD hh:mm:ss a",
};
const componentMap = {
    date: DatePicker,
    datetime: DateTimePicker
}
const LocalizedDatePicker = (props) => {
    const columnType = props.columnType;
    const filterFormat = fixedFilterFormat[columnType];
    const { systemDateTimeFormat, stateData } = useStateContext();
    return (props) => {
        const { item, applyValue } = props;
        const handleFilterChange = (newValue) => {
            applyValue({ ...item, value: newValue.format(filterFormat) });
        };
        const ComponentToRender = componentMap[columnType];
        return <ComponentToRender
            fullWidth
            format={systemDateTimeFormat(columnType !== "datetime", false, stateData.dateTime)}
            value={item.value ? dayjs(item.value) : item.value}
            onChange={handleFilterChange}
            slotProps={{ textField: { variant: "standard", label: "Value" } }}
        />
    }
}

const localizedDateFormat = (props) => getGridDateOperators().map((operator) => ({
    ...operator,
    InputComponent: LocalizedDatePicker(props)
}));

export default localizedDateFormat;