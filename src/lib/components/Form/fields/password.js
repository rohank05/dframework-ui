import React from 'react';
import StringField from './string';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Field = ({ otherProps, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
    const { readOnly = false, disabled = false } = props.column || {};
    otherProps = {
		type: showPassword ? 'text' : 'password',
		InputProps: {
			readOnly,
			disabled,
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={disabled}
                        readOnly={readOnly}
                        size="large">
						{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</InputAdornment>
			)
		},
        ...otherProps
    }
    return <StringField otherProps={otherProps} {...props} />
}

export default Field;