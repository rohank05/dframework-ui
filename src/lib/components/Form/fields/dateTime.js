import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useStateContext } from '../../useRouter/StateProvider'

const Field = ({ column, field, formik, otherProps }) => {
    const { systemDateTimeFormat, stateData } = useStateContext();
    return <DateTimePicker
        {...otherProps}
        variant="standard"
        readOnly={column?.readOnly === true}
        key={field}
        fullWidth
        format={systemDateTimeFormat(false, false, stateData.dateTime)}
        name={field}
        value={dayjs(formik.values[field])}
        onChange={(value) => formik.setFieldValue(field, value)}
        onBlur={formik.handleBlur}
        helperText={formik.touched[field] && formik.errors[field]}
        minDateTime={(column.min ? dayjs(column.min) : null)}
        maxDateTime={(column.max ? dayjs(column.max) : null)}
        slotProps={{ textField: { fullWidth: true, helperText: formik.errors[field], variant: "standard" } }}
    />

}

export default Field;