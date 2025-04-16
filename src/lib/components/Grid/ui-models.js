import GridBase from './index';
import React from 'react';
import * as yup from 'yup';
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

	static defaultPermissions = {
		add: true,
		edit: true,
		delete: true,
	}
	constructor(modelConfig) {
		const { title = "", controllerType } = modelConfig;
		let { api, idProperty = api + 'Id' } = modelConfig;
		// if module is not specified, use title as module name after removing all alphanumeric characters
		const module = "module" in modelConfig ? modelConfig.module : title.replace(/[^\w\s]/gi, "");
		if (!api) {
			api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
			idProperty = title.replaceAll(' ', '') + 'Id';
		}
		api = controllerType === 'cs' ? `${api}.ashx` : `${api}`;
		const defaultValues = { ...modelConfig.defaultValues };
		const name = module || title;
		Object.assign(this, {
			standard: true,
			name, // for child grid wuth no specific module but wants name to be identified in models list in relations.
			permissions: { ...UiModel.defaultPermissions },
			idProperty,
			defaultSort: "ModifiedOn DESC",
			linkColumn: `${name}Name`,
			overrideFileName: title,
			preferenceId: name,
			tableName: name,
			module,
			...modelConfig,
			api
		});
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
					config = yup.string().nullable().trim().label(formLabel);
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
				case 'dateTime':
					config = yup
						.date()
						.nullable() // Allow null values
						.transform((value, originalValue) => {
							// Transform empty strings or null values into null
							if (originalValue === '' || originalValue === null) return null;
							return value;
						})
						.label(formLabel); // Set a label for better error messages
					break;
				case 'select':
				case 'autocomplete':
					if (required) {
						config = yup.string().trim().label(formLabel).required(`Select at least one ${formLabel}`);
					} else {
						config = yup.string().nullable()
					}
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
				case 'number':
					if (required) {
						config = yup.number().label(formLabel).required(`${formLabel} is required.`);
					} else {
						config = yup.number().nullable()
					}
					if (min !== undefined && min !== '') {
						config = config.min(Number(min), `${formLabel} must be greater than or equal to ${min}`);
					}
					if (max !== undefined && max !== '') {
						config = config.max(Number(max), `${formLabel} must be less than or equal to ${max}`);
					}
					break;
				case 'fileUpload':
					config = yup.string().trim().label(formLabel);
					break;
				default:
					config = yup.mixed().nullable().label(formLabel);
					break;
			}
			if (required && type !== "number") {
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


