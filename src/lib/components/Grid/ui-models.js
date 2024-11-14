import GridBase from './index';
import React from 'react';
import * as yup from 'yup';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Form from '../Form/Form';
import ReadonlyPanel from '../ReadonlyPanel';


const nonAlphaNumeric = /[^a-zA-Z0-9]/g;
const customStyle = {};
const showRowsSelected = true;
const defaultValueConfigs = {
	"string": "",
	"boolean": false,
	"radio": false,
	"oneToMany": ""
}
const compareValidatorRegex = /^compare:(.+)$/;

class UiModel {

	constructor(modelConfig) {
		const { title, controllerType } = modelConfig;
		let { api, idProperty = api + 'Id' } = modelConfig;

		if (!api) {
			api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
			idProperty = title.replaceAll(' ', '') + 'Id';
		}
		api = controllerType === 'cs' ? `${api}.ashx` : `${api}`;
		const defaultValues = { ...modelConfig.defaultValues };
		Object.assign(this, { standard: true, idProperty, ...modelConfig, api });
		const columnVisibilityModel = {};
		for (const col of this.columns) {
			const name = col.field || col.id;
			if (col.hide === true) {
				columnVisibilityModel[col.id || col.field] = false;
			}
			defaultValues[name] = col.defaultValue === undefined ? (defaultValueConfigs[col.type] || "") : col.defaultValue;
		}
		this.columnVisibilityModel = columnVisibilityModel;
		this.defaultValues = defaultValues;
	}

	getValidationSchema({ id }) {
		const { columns } = this;
		let validationConfig = {};
		for (const column of columns) {
			const { field, label, header, type = 'string', requiredIfNew = false, required = false, min = '', max = '', validationLength = 0, validate } = column;
			const formLabel = label || header || field;
			if (!formLabel) {
				continue;
			}
			let config;
			switch (type) {
				case 'string':
					config = yup.string().trim().label(formLabel);
					if (min) {
						config = config.min(Number(min), `${formLabel} must be at least ${min} characters long`);
					}
					if (max) {
						config = config.max(Number(max), `${formLabel} must be at most ${max} characters long`);
					}
					break;
				case 'boolean':
					config = yup.bool().nullable().transform((value, originalValue) => {
						if (originalValue === '') return null;
						return value;
					}).label(formLabel);
					break;

				case 'radio':
				case 'dayRadio':
					config = yup.mixed().label(formLabel).required(`Select at least one option for ${formLabel}`);
					break;
				case 'date':
					config = yup.date().nullable().transform((value, originalValue) => {
						if (originalValue === '' || originalValue === null) return null;
						return value;
					}).label(formLabel).required(`${formLabel} is required`);
					break;
				case 'select':
				case 'autocomplete':
					config = yup.string().trim().label(formLabel).required(`Select at least one ${formLabel}`);
					break;
				case 'password':
					config = yup.string()
					.label(formLabel)
					.test("ignore-asterisks", `${formLabel} must be at least 8 characters and must contain at least one lowercase letter, one uppercase letter, one digit, and one special character`, (value) => {
						// Skip further validations if value is exactly "******"
						if (value === "******") return true;
						// Check minimum length, maximum length, and pattern if not "******"
						return yup.string()
							.min(8, `${formLabel} must be at least 8 characters`)
							.max(50, `${formLabel} must be at most 50 characters`)
							.matches(
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
								`${formLabel} must contain at least one lowercase letter, one uppercase letter, one digit, and one special character`
							)
							.isValidSync(value);
					});
					break;
				case 'email':
					config = yup
						.string()
						.trim()
						.matches(
							/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
							'Email must be a valid email'
						)
					break;
				default:
					config = yup.mixed().label(formLabel);
					break;
			}
			if (required) {
				config = config.trim().required(`${formLabel} is required`);
			}
			if (requiredIfNew && (!id || id === '')) {
				config = config.trim().required(`${formLabel} is required`);
			}	
			if (validate) {
				const compareValidator = compareValidatorRegex.exec(validate);
				if (compareValidator) {
					const compareFieldName = compareValidator[1];
					const compareField = columns.find(
						(f) => (f.formField === compareFieldName || f.field) === compareFieldName
					);
					config = config.oneOf(
						[yup.ref(compareFieldName)],
						`${formLabel} must match ${compareField.label}`
					);
				}

			}
			
			validationConfig[field] = config;
		}

		let validationSchema = yup.object({ ...validationConfig, ...this.validationSchema });
		return validationSchema;
	}

	Form = ({ match, ...props }) => {
		return <Form model={this} Layout={this.Layout} {...props} />
	}

	Grid = ({ match, ...props }) => {
		return <GridBase model={this} showRowsSelected={showRowsSelected} {...props} />
	}
	Readonly = ({ match, ...props }) => {
		return <ReadonlyPanel model={this} {...props} />
	}
	ChildGrid = (props) => {
		return <>
			<GridBase model={this} {...props} customStyle={customStyle} showRowsSelected={showRowsSelected} />
			<Divider orientation='horizontal' sx={{ mt: 2 }} />
		</>
	}
}

export {
	UiModel
}


