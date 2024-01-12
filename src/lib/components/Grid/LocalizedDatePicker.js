import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getGridDateOperators } from '@mui/x-data-grid-premium';
import { useStateContext } from '../useRouter/StateProvider';
const fixedFilterFormat = {
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD hh:mm:ss a",
    dateTimeLocal: "YYYY-MM-DD hh:mm:ss a",
    OverrideDateFormat: "DD-MMM-YYYY",
};
const componentMap = {
    date: DatePicker,
    datetime: DateTimePicker,
    dateTimeLocal: DateTimePicker
}
const LocalizedDatePicker = (props) => {
    const { item, applyValue, convert } = props;
    const { systemDateTimeFormat, stateData } = useStateContext();
    const columnType = props?.type || 'date';
    const filterFormat = fixedFilterFormat[columnType];
    const isValidDate = (date) => {
        const parsedDate = dayjs(date);
        return parsedDate.isValid() && parsedDate.year() > 1900;
    };
    const format = (systemDateTimeFormat((columnType !== "datetime" && columnType !== "dateTimeLocal", false, stateData.dateTime)));

    const handleFilterChange = (newValue) => {
        if (columnType !== "date" && columnType !== "datetime" && columnType !== "dateTimeLocal") return;
        const isPartialDate = (value) => {
            if (typeof value !== 'string') return false;
            return !dayjs(value, format, true).isValid();
        };
        if (isPartialDate(newValue)) {
            return;
        }
        if (convert) {
            newValue = dayjs(newValue).utc();
            applyValue({ ...item, value: newValue });
            return;
        }
        if (!isValidDate(newValue)) {
            applyValue({ ...item, value: null });
            return;
        }
        applyValue({ ...item, value: newValue.format(filterFormat) });
    };
    const getMonthAbbreviation = (format) => {
        if (format && format === fixedFilterFormat.OverrideDateFormat) {
            const parts = format.split('-');
            return parts.length === 3 ? parts[1] : null;
        }
    }

    const ComponentToRender = componentMap[columnType];
    const Dateformatvalue = columnType === "dateTimeLocal"
    ? item.value ? dayjs(item.value.$d) : null
    : item.value ? dayjs(item.value) : null;
    return <ComponentToRender
        fullWidth
        format={format}
        value={Dateformatvalue}
        onChange={handleFilterChange}
        slotProps={{ textField: { variant: "standard", label: "Value" } }}
        localeText={{
            fieldMonthPlaceholder: () => {
                const monthAbbreviation = getMonthAbbreviation(format);
                return monthAbbreviation === "MMM" ? 'MMM' : 'MM';

            },
        }}
    />
}

const localizedDateFormat = (props) => getGridDateOperators().map((operator) => ({
    ...operator,
    InputComponent: LocalizedDatePicker(props)
}));

export default localizedDateFormat;