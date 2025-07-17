import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useStateContext } from '../../useRouter/StateProvider';

const Field = ({ column, field, formik, otherProps, fieldConfigs = {}, mode }) => {
    const isDisabled = mode !== 'copy' && fieldConfigs.disabled;
    const { systemDateTimeFormat, stateData } = useStateContext(); //provider
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

export default Field;