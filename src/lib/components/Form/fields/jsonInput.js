import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Field = ({ column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) => {
    const [state, setState] = React.useState({});
    React.useEffect(() => {
        if (!formik.values[field]) return;
        const inputJSON = JSON.parse(formik.values[field]);
        setState(inputJSON);
    }, [formik.values[field]])
    return (
        <FormControl
            fullWidth
            key={field}
            variant="standard"
            error={formik.touched[field] && Boolean(formik.errors[field])}
        >
            {Object.keys(state).map((key, index) => (
                <TextField
                    key={key}
                    label={key}
                    name={key}
                    value={state[key]}
                    onChange={(e) => {
                        setState({ ...state, [key]: e.target.value });
                        formik.setFieldValue(field, JSON.stringify(state));
                    }}
                />
            ))}
        </FormControl>
    )
}

export default Field;

