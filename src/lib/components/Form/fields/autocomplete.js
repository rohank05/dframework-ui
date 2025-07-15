import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useStateContext } from "../../useRouter/StateProvider";
const consts = {
    limitTags: 5
}
const Field = ({ column, field, formik, lookups, otherProps, fieldConfigs = {}, mode }) => {
    const { stateData } = useStateContext();
    const inputValue = formik.values[field]?.split(", ")?.map(Number) || [];
    const options = React.useMemo(
        () => (lookups ? lookups[column.lookup] : []),
        [lookups, column.lookup]
    );
    const { filter } = column;
    if (typeof filter === "function" && options.length) {
        filter({ options, stateData });
    }

    const filteredCombos = options.filter(option => inputValue.includes(option.value)) || [];
    const isDisabled = mode !== 'copy' && fieldConfigs.disabled;
    const handleAutoCompleteChange = (_, newValue) => {
        formik?.setFieldValue(field, newValue ? newValue.map(val => val.value).join(', ') : '');
    }

    return (
        <FormControl
            fullWidth
            key={field}
            variant="standard"
            error={formik.touched[field] && Boolean(formik.errors[field])}
        >
            <Autocomplete
                {...otherProps}
                multiple
                id={field}
                limitTags={column.limitTags || consts.limitTags}
                options={options || []}
                getOptionLabel={(option) => option.label || ''}
                defaultValue={filteredCombos}
                renderInput={(params) => <TextField {...params} variant="standard" />}
                onChange={handleAutoCompleteChange}
                value={filteredCombos}
                size="small"
                disabled={isDisabled}
            />
            {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]}</FormHelperText>}
        </FormControl>
    )
}

export default Field;

