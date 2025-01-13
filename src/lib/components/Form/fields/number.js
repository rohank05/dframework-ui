import React from 'react';
import StringField from './string';

const resolveValue = ({ value, state }) => {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        const key = value.slice(1, -1); // Extract key inside the braces
        return state[key] !== undefined ? state[key] : value;
    }
    return value;
};
const field = ({ column, otherProps, formik, field, ...props }) => {
    const { minValue: min, maxValue: max } = column;
    const resolvedMin = resolveValue({ value: min, state: formik.values });
    const resolvedMax = resolveValue({ value: max, state: formik.values });
    const minKey = 47;
    const maxKey = 58;
    otherProps = {
        InputProps: {
            inputProps: {
                min: Math.max(0, resolvedMin),
                max: resolvedMax,
                readOnly: column?.readOnly === true,
                onKeyPress: (event) => {
                    const keyCode = event.which ? event.which : event.keyCode;
                    if (!(keyCode > minKey && keyCode < maxKey)) {
                        event.preventDefault();
                    }
                },
            }
        },
        type: 'number',
        ...otherProps,
        onBlur: (event) => {
            if (event.target.value < Math.max(0, min)) {
                formik.setFieldValue(field, Math.max(0, min));
            }
            if (resolvedMax && event.target.value > resolvedMax) {
                formik.setFieldValue(field, resolvedMax);
            }
            if (props.onBlur) {
                props.onBlur(event);
            }
        },
    }
    return <StringField column={column} otherProps={otherProps} formik={formik} field={field} {...props} />;
};

export default field;   