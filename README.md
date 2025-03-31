# how we will use the durlabh/dframework-ui

**:** In Dframework we have create Multple Component for our Use

**1:** SnackBar
**2:** Dialog
**3:** Grid
**4:** ChildGrid

**Example:** \***\*\*\*\*\***\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***\*\*\*\*\*** Example of SnackBar \***\*\*\*\*\***\*\*\***\*\*\*\*\***

# How we will use the SnackBar Component

## frist import in your Index.js folder of your Project

```js
import React from "react";
import { SnackbarProvider } from "@durlabh/dfamework-ui";
export default function App() {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 1000 }}>
      ******************* Import Your Component ********************
    </SnackbarProvider>
  );
}
```

## Then use in Your Project

```js
import React from "react";
import { useSnackbar } from "@durlabh/dfamework-ui";
export default function App() {
  const snac = useSnackbar();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          snac.showMessage("An error occured, please try after some time.")
        }
      >
        Show Snackbar
      </Button>
    </div>
  );
}
```

**Example:** \***\*\*\*\*\***\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***\*\*\*\*\*** Example of Dialog \***\*\*\*\*\***\*\*\***\*\*\*\*\***

# How we will use the Dialog Component

```js
import {DialogComponent} from '@durlabh/dfamework-ui';
import React from 'react'
import
export default function App() {
  return (
    <div>
       <DialogComponent open={true}  onCancel={false} title="Confirm Delete"  children ="Are you sure you want to delete "/>
    </div>
  )
}
```

**Example:** \***\*\*\*\*\***\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***\*\*\*\*\*** Example of Grid \***\*\*\*\*\***\*\*\***\*\*\*\*\***

# Example of Grid

```js
import React from "react";
import { UiModel } from "./lib/components/Grid/ui-models";
export default function App() {
  const surveyModel = new UiModel({
    title: "Questionnaires",
    defaultSort: "SurveyTypeName ASC",
    linkColumn: "SurveyTypeName",
    api: "SurveyType",
    idProperty: "id",
    columns: [
      {
        field: "id",
        type: "number",
        flex: 1,
        headerName: "User Id",
        label: null,
        pinned: "right"
      },
      { field: "title", type: "string", headerName: "User Post Id", flex: 1 },
      {
        field: "Completed",
        type: "boolean",
        headerName: "Completion Status",
        flex: 1
      }
    ]
  });
  return (
    <div>
      <surveyModel.Grid />
    </div>
  );
}
```

# Example of ChildGrid of Grid

```js
import React from "react";
import { UiModel } from "./lib/components/Grid/ui-models";
export default function App() {
  const surveyModel = new UiModel({
    title: "Questionnaires",
    defaultSort: "SurveyTypeName ASC",
    linkColumn: "SurveyTypeName",
    api: "SurveyType",
    idProperty: "id",
    columns: [
      {
        field: "id",
        type: "number",
        flex: 1,
        headerName: "User Id",
        label: null,
        pinned: "right"
      },
      { field: "title", type: "string", headerName: "User Post Id", flex: 1 },
      {
        field: "Completed",
        type: "boolean",
        headerName: "Completion Status",
        flex: 1
      }
    ]
  });
  return (
    <div>
      <surveyModel.ChildGrid />
    </div>
  );
}
```

# Properties of UiModel

## UiModel Configuration Properties

| **Property**            | **Type**          | **Description**                                                                                                                                                                                                                                                                   | **Defaults to**                             | **Required** |
| ----------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| `title`                 | `string`          | The title of the grid.                                                                                                                                                                                                                                                            |                                             | Yes          |
| `formTitle`             | `string`          | Title used in the form layout.                                                                                                                                                                                                                                                    | `title`                                     | No           |                                                                                                                                                                                                                                     | `title`                                     | No           |
| `gridSubTitle`          | `string`          | Subtitle displayed below the grid title.                                                                                                                                                                                                                                          | -                                           | No           |
| `api`                   | `string`          | The API endpoint to fetch grid data.                                                                                                                                                                                                                                              | `title`                                     | No           |
| `idProperty`            | `string`          | Specifies the unique identifier for grid rows.                                                                                                                                                                                                                                    | `api \|\| title`                            | No           |
| `defaultSort`           | `string`          | Specifies the default sort order for the grid data. <br> Example:- `defaultSort`: CreatedOn Desc for sorting by CreatedOn in descending order.                                                                                                                                    | ModifiedOn DESC                             | No           |
| `linkColumn`            | `string`          | The linkColumn makes a specific DataGrid column clickable, triggering actions like navigation, edit, or delete. For delete actions, it sets the record's name (from the `linkColumn`) and ID, preparing for deletion confirmation.                                                | -                                           | No           |
| `columns`               | `array`           | The list of column definitions for the grid.                                                                                                                                                                                                                                      | See the **Column Properties Table** below.  | Yes          |
| `columnVisibilityModel` | `object`          | Specifies which columns are visible in the grid. <br> Example:- `columnVisibilityModel`: { "CreatedOn": false, "CreatedByUser": false } hides the CreatedOn and CreatedByUser columns.                                                                                            | not defined columns are visible by default. | No           |
| `isClient`              | `boolean`         | Sets the pagination mode for the grid. When true, the grid uses client-side pagination (`isClient`), loading all data at once. When false, server-side pagination is enabled, fetching data per page from the server.                                                             | false                                       | No           |
| `defaultFilters`        | `array`           | Sets the default filters applied to the grid. <br> Example: `defaultFilters: [{ "field": "StatusDate", "operator": "after", "value": "2024-09-01" }]`                                                                                                                             | -                                           | No           |
| `showHeaderFilters`     | `boolean`         | Displays header filters on grid columns.                                                                                                                                                                                                                                          | true                                        | No           |
| `readOnly`              | `boolean`         | If true, the grid becomes read-only user can't click on action.                                                                                                                                                                                                                   | -                                           | No           |
| `doubleClicked`         | `boolean`         | Controls if double-clicking is enabled for rows.                                                                                                                                                                                                                                  | true                                        | No           |
| `permissions`           | `object`          | Permissions for grid actions, including adding, editing, deleting, and exporting data. <br> Example: `permissions: { add: false, edit: true, delete: false, export: true }`.                                                                                                      | -                                           | Yes          |
| `joinColumn`            | `string`          | Specifies the column used for joining data with a parent grid.                                                                                                                                                                                                                    | -                                           | No           |
| `standard`              | `boolean`         | Specified explicitly as false to hide the **createdOn**, **addCreatedByColumn**, **addModifiedOnColumn** and **addModifiedByColumn** columns.                                                                                                                                     | false                                       | No           |
| `addCreatedOnColumn`    | `boolean`         | Specified explicitly as false to hide the createdOn columns.                                                                                                                                                                                                                      | false                                       | No           |
| `addCreatedOnColumn`    | `boolean`  | Specified explicitly as false to hide the createdOn columns.     |                                            |                              |
| `addCreatedByColumn`    | `boolean`  | Specified explicitly as false to hide the createdBy columns.     |                                            |                              |
| `addModifiedOnColumn`   | `boolean`  | Specified explicitly as false to hide the modifiedOn columns.    |                                            |                              |
| `addModifiedByColumn`   | `boolean`  | Specified explicitly as false to hide the modifiedBy columns.    |                                            |                              |
| `controllerType`        | `string`   | Specifies the type of controller (`cs` for client/server).       |                                            |                              |
| `template`              | `string`   | Template configuration for exporting.                            |                                            | Seems project specific CoolR |
| `pivotAPI`              | `string`   | API endpoint for pivot-specific data.                            |                                            |                              |
| `showPivotExportBtn`    | `boolean`  | Displays the button for exporting pivot data.                    |                                            | Should not be needed         |
| `preferenceId`          | `string`   | Identifier for saved grid preferences.                           |                                            |                              |
| `tablePreferenceEnums`  | `object`   | Enumerations for specific table preferences.                     |                                            |                              |
| `rowRedirectLink`       | `string`   | URL to redirect when a row is clicked.                           |                                            |                              |
| `showAddIcon`           | `boolean`  | Indicates if the "Add" button icon should be displayed.          |                                            | Not needed                   |
| `pageTitle`             | `string`   | Sets the title for the page.                                     |                                            | Not needed                   |
| `addUrlParamKey`        | `string`   | Key for additional URL parameters when navigating to forms.      |                                            |                              |
| `searchParamKey`        | `string`   | Key for fetching parameters from the URL.                        |                                            | Duplicate as addUrlParamKey  |
| `nestedGrid`            | `boolean`  | Indicates if the grid is nested within ather grid.               |                                            | Should not be needed         |
| `showOnlyExcelExport`   | `boolean`  | Limits export options to only Excel formats.                     |                                            |                              |
| `initialValues`         | `object`   | Initial values for form fields.                                  |                                            |                              |
| `hideRelationsInAdd`    | `boolean`  | Hides relations section in add mode.                             |                                            |                              |
| `navigateBack`          | `string\|function`   | Returns or specifies the route for navigation on cancel or save. To return to a previous route pass 'window.back'.           |                                            |                              |
| `applyFieldConfig`      | `function` | A function to apply custom field configurations.                 |                                            |                              |
| `getValidationSchema`   | `function` | Function to return the validation schema for the form.           |                                            |                              |
| `relations`             | `array`    | Defines the relationship configurations for related grids.       |                                            |                              |

## Column Properties Table

| **Property**          | **Type**                   | **Description**                                                                                                                                                                  | **Defaults to** |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `field`               | `string`                   | Specifies the name of the field displayed in the column. This property is used to map the column to the corresponding data field, enabling the grid to display the correct data. | -               |
| `label`               | `string \| null`           | Displays the column name in both the form and the grid. If set to null, the column will be hidden from the form.                                                                 | `field`         |
| `headerName`          | `string \| null`           | "The label displayed as the column header in the grid, or set to null to hide the column from the grid."                                                                         | label           |
| `type`                | `string`                   | Specifies the type of data in the column (e.g., `number`, `string`) please refer Field Types section                                                                             | -               |
| `pinned`              | `string`                   | Determines if the column is pinned to the right.                                                                                                                                 | `left`          |
| `sortable`            | `boolean`                  | Specifies if the column can be sorted. This is Mui DataGrid property                                                                                                             | `true`          |
| `filterable`          | `boolean`                  | Specifies if the column can be filtered. This is Mui DataGrid property                                                                                                           | `true`          |
| `editable`            | `boolean`                  | Indicates if the cells in the column are editable.                                                                                                                               | `false`         |
| `tab`                 | `string`                   | Specifies the tab associated with this column in a tabbed layout.                                                                                                                | ----            |
| `required`            | `boolean`                  | Indicates if this column is required in the form.                                                                                                                                | `false`         |
| `hidden`              | `boolean`                  | Hides the column from the grid.                                                                                                                                                  | `false`         |
| `renderCell`          | `function`                 | Custom function to render cell content in a MUI Data Grid. Receives { row, value, field } as arguments and returns a React element for custom cell rendering.                    | ---             |
| `align`               | `string`                   | Specifies text alignment for the column (`left`, `center`, `right`).                                                                                                             | `left`          |
| `tooltip`             | `string`                   | Tooltip to display on hover over the column header.                                                                                                                              | --              |
| `width`               | `number`                   | Specifies the width of the column in pixels.                                                                                                                                     | ---             |
| `resizable`           | `boolean`                  | Indicates if the column width can be resized by the user.                                                                                                                        | `true`          |
| `readOnly`            | `boolean`                  | Marks the column as read-only.                                                                                                                                                   | `false`         |
| `showErrorText`       | `boolean`                  | Indicates if error text should be displayed when validation fails.                                                                                                               | `false`         |
| `helperText`          | `string`                   | Text to display as helper information below the field.                                                                                                                           |                 |
| `min`                 | `string \| number \| date` | Sets the minimum value. For strings and numbers, it acts as a `min` limit. For dates, it functions as `minDate`.                                                                 | -               |
| `max`                 | `string \| number \| date` | Sets the maximum value. For strings and numbers, it acts as a `max` limit. For dates, it functions as `maxDate`.                                                                 | -               |
| `multiSelect`         | `boolean`                  | Enables multiple selections in a `Select` field.                                                                                                                                 | `false`         |
| `parentComboField`    | `string`                   | Field name used to fetch dependent data for a `Select` field.                                                                                                                    | --              |
| `lookup`              | `string`/`array`           | Defines the lookup source for dropdown values in the column.                                                                                                                     | ---             |
| `useLinkColumn`       | `boolean`                  | If useLinkColumn is false, clicking on the `linkColumn` will not automatically trigger the Edit action.                                                                          | `true`          |
| `variant`             | `string`                   | Specifies the variant for fields (e.g., `standard`, `filled`).                                                                                                                   | `standard`      |
| `multiline`           | `boolean`                  | Indicates if the text field should support multiple lines.                                                                                                                       |                 |
| `rows`                | `number`                   | Number of rows to display in a multiline text field. When multiline is true, the text field should display 5 rows by default.                                                    | -               |
| `isUtc`               | `boolean`                  | Indicates if the field value is stored in UTC format.                                                                                                                            |                 |
| `shouldDisableDate`   | `function`                 | Function to determine if a date should be disabled. Takes (date, formik) as arguments and returns true to disable the date, false otherwise.                                     | --              |
| `placeHolder`         | `string`                   | To Show `placeHolder` only for type `select`                                                                                                                                     | --              |

# **Field Components Properties Table**

You can use these components by defining the type in the **Properties** column.

## **Field Types**

### 1. **Type: `boolean`**

Represents a **Checkbox** component.

- Allows true, false values.
- **`disabled`** (boolean): Determines whether the checkbox is interactive.
  - When `disabled` is set to `true`, users cannot change the checkbox value.
- Example: `{ "type": "boolean", "required": true | false }`

---

### 2. **Type: `select`**

Represents a **Select** component.

- Defines the lookup source for dropdown values in the column.
- Example: `{ "type": "select", "required": true | false, lookup: 'scopetype' }`

---

### 3. **Type: `string | number`**

Represents a **TextField** component.

- **`autoComplete`** (string):
  - Helps users complete forms faster, particularly on mobile devices.
  - Acts more as an autofill feature rather than traditional autocomplete.
- Minimum (min) and maximum (max) length constraints.
- The `variant` (string) property defines the input style: `standard` (default) with an underline, `filled` with a solid background, and `outlined` with a border.
- Example: `{ "type": "string | number", "min": 3, "max": 20, "required": true | false }`

---

### 4. **Type: `password`**

Represents a **TextField** component with a hide/show password feature.

- Allows a default masked value (**\*\***).
- Requires at least 8 characters.
- Must include uppercase, lowercase, numbers, and special characters.
- The `variant` (string)property defines the input style: `standard` (default) with an underline, `filled` with a solid background, and `outlined` with a border.
- Example: `{ "type": "password", "required": true }`

---

### 5. **Type: `date`**

Represents a **DatePicker** component.

- Accepts date values.
- Converts empty or null values to null.
- Requires a valid date format.
- This component is used for selecting a date only.
- Supports min and max date restrictions.
- Example: `{ "type": "date", "required": true,  "min": "2023-01-01", "max": "2024-12-31" }`

---

### 6. **Type: `dateTime`**

Represents a **DateTimePicker** component.

- Similar to date, but this component is used for selecting both **date** and **time**.
- Example: `{ "type": "dateTime", "required": true, "min": "2023-01-01", "max": "2024-12-31" }`

---

### 7. **Type: `time`**

Represents a **TimePicker** component.

- This component is used for selecting **time**.
- Example: `{ "type": "time", "required": true }`

---

### 8. **Type: `oneToMany`**

Represents a **GridTransfer** component.

- This component is used to transfer columns between grids.
- The `relation` property is used to establish a connection between the parent entity and its associated child records.
- Example: `{ "type": "oneToMany", "relation": 'child grid' }`

---

### 9. **Type: `radio`**

Represents a **RadioField** component.

- Defines the lookup source for dropdown values in the column.
- Example: `{ "type": "radio", "lookup": 'Region' }`

---

### 10. **Type: `autocomplete`**

Represents an **AutocompleteField** component.

- Defines the lookup source for dropdown values in the column.
- The **`Autocomplete`** component enhances text input by providing a dropdown list of suggested options while allowing free text entry. It is useful for search fields, selection lists, and filtering.
- Example: `{ "type": "Autocomplete", "lookup": 'Region' }`

---

### 11. **Type: `dayRadio`**

Represents a **DaySelection** component.

- The **DaySelection** component allows users to choose days in two ways:  
  ?? **Predefined options** � **Weekends (Sat-Sun)** or **Weekdays (Mon-Fri)**.  
  ?? **Custom selection** � Users manually pick specific days.
- Example: `{ "type": "dayRadio" }`

---

### 12. **Type: `email`**

Represents a **TextField** component used for email input.

- Must follow a valid email format.
- The `variant` (string)property defines the input style: `standard` (default) with an underline, `filled` with a solid background, and `outlined` with a border.
- Example: `{ "type": "email", "required": true | false }`

---

### 13. **Type: `treeCheckbox`**

Represents a **SimpleTreeView** component.

- A simplified version of the Tree View component that receives its items as an array. This version is recommended for use with hardcoded items.
- Example: `{ "type": "treeCheckbox" }`

---

### 14. **Type: `document`**

Represents a **file upload document** component.

- Users can either enter an external document link or upload a file.
- Dynamically switches between these options based on user selection.
- Example: `{ "type": "document" }`

---

### 15. **Type: `json`**

Represents a **JSON Field** component.

- This component dynamically generates input fields based on a JSON object stored in a Formik field. It allows users to edit key-value pairs within the JSON structure and automatically updates the Formik state with a debounced delay.
- Example: `{ "type": "json" }`

---

## **Examples**

### 1. **shouldDisableDate** column property.

```js
const shouldDisableDate = (date, formik) => {
  // Disable weekends (Saturday and Sunday)
  const day = date.getDay();
  return day === 0 || day === 6;
};
```

### 2. **applyFieldConfig** column property.

```js

applyFieldConfig: function ({ data }) {
        const today = new Date();
        const startDate = new Date(data?.StartDate);
        const disabled = startDate <= today;
        return {
            FrequencyType: { disabled: disabled },
            StartDate: { disabled: disabled },
            SurveyTypeId: { disabled: disabled }
      }
}

```

### 3. **joinColumn** column property.

```js
const exampleConfig = {
    title: "Document",
    api: "/Document",
    name: "Document",
    idProperty: "DocumentId",
    module: "Equipment",
    joinColumn: "AssociationId",
  standard: true
};
```
