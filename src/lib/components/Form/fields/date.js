import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useStateContext } from '../../useRouter/StateProvider';
const field = ({ column, field, formik, otherProps, classes, fieldConfigs, model, mode }) => {
    let isDisabled;
    const { systemDateTimeFormat, stateData } = useStateContext(); //provider
    if (mode !== 'copy') {
        isDisabled = fieldConfigs?.disabled;
    }
    return <DatePicker
        {...otherProps}
        variant="standard"
        readOnly={column?.readOnly === true}
        key={field}
        fullWidth
        format={systemDateTimeFormat(true, false, stateData.dateTime)}
        name={field}
        value={dayjs(formik.values[field])}
        onChange={(value) => {
            const adjustedDate = dayjs(value).hour(12);
            const isoString = adjustedDate.toISOString();
            formik.setFieldValue(field, isoString);
        }}
        onBlur={formik.handleBlur}
        helperText={formik.touched[field] && formik.errors[field]}
        minDate={(column.min ? dayjs(column.min) : null)}
        maxDate={(column.max ? dayjs(column.max) : null)}
        disabled={isDisabled}
        slotProps={{ textField: { fullWidth: true, helperText: formik.errors[field], variant: "standard" } }}
    />

}

export default field;