import React, { useCallback } from 'react';
import StringField from './string';
import debounce from 'lodash.debounce';

const resolveValue = ({ value, state }) => {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        const key = value.slice(1, -1); // Extract key inside the braces
        return state[key] !== undefined ? state[key] : value;
    }
    return value;
};

const Field = ({ column, otherProps, formik, field, ...props }) => {
    const { minValue: min, maxValue: max } = column;
    const resolvedMin = resolveValue({ value: min, state: formik.values });
    const resolvedMax = resolveValue({ value: max, state: formik.values });
    const minKey = 47;
    const maxKey = 58;
    const maxval = Math.max(0, resolvedMin);
    const debouncedSetFieldValue = useCallback(
        debounce((field, value) => {
            if (value < maxval) {
                formik.setFieldValue(field, maxval);
            } else if (resolvedMax && value > resolvedMax) {
                formik.setFieldValue(field, resolvedMax);
            } else {
                formik.setFieldValue(field, value);
            }
        }, 400),
        [resolvedMin, resolvedMax, formik.values]
    );

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
        onChange: (event) => {
            const { value } = event.target;
            debouncedSetFieldValue(field, Number(value)); // Pass the updated value to the debounced function
            if (props.onBlur) {
                props.onBlur(event);
            }
        },
    };

    return <StringField column={column} otherProps={otherProps} formik={formik} field={field} {...props} />;
};

export default Field;
