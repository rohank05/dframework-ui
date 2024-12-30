# how we will use the durlabh/dframework-ui

**:** In Dframework we have create Multple Component for for our Use

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
    titleDescription: "Build flexible questionnaire for use in Surveys",
    api: "SurveyType",
    idProperty: "id",
    columns: [
      {
        field: "id",
        type: "number",
        flex: 1,
        headerName: "User Id",
        fieldLabel: null,
        pinned: true
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
    titleDescription: "Build flexible questionnaire for use in Surveys",
    api: "SurveyType",
    idProperty: "id",
    columns: [
      {
        field: "id",
        type: "number",
        flex: 1,
        headerName: "User Id",
        fieldLabel: null,
        pinned: true
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

| **Property**             | **Type**   | **Description**                                                       | **Can be extended from**                   |
| ------------------------ | ---------- | --------------------------------------------------------------------- | ------------------------------------------ |
| `title`                  | `string`   | The title of the grid.                                                |                                            |
| `api`                    | `string`   | The API endpoint to fetch grid data.                                  | `"title"`                                  |
| `idProperty`             | `string`   | Specifies the unique identifier for grid rows.                        | `"api, title"`                             |
| `standard`               | `string`   | Checks whether it is a standard table.                                |                                            |
| `defaultSort`            | `string`   | Specifies the default sort order for the grid data.                   |                                            |
| `linkColumn`             | `string`   | The column that contains the main link for the grid rows.             |                                            |
| `titleDescription`       | `string`   | A description displayed as the subtitle for the grid.                 |                                            |
| `columns`                | `array`    | The list of column definitions for the grid.                          | See the **Column Properties Table** below. |
| `columnVisibilityModel`  | `object`   | Defines the visibility of specific columns in the grid.               |                                            |
| `isClient`               | `boolean`  | Determines if the grid operates in client mode.                       |                                            |
| `defaultFilters`         | `array`    | Sets the default filters applied to the grid.                         |                                            |
| `showHeaderFilters`      | `boolean`  | Displays header filters on grid columns.                              |                                            |
| `readOnly`               | `boolean`  | If true, the grid becomes read-only.                                  |                                            |
| `doubleClicked`          | `boolean`  | Controls if double-clicking is enabled for rows.                      |                                            |
| `gridSubTitle`           | `string`   | Subtitle displayed below the grid title.                              |                                            |
| `permissions`            | `object`   | Permissions for grid actions like add, edit, delete, and export.      |                                            |
| `joinColumn`             | `string`   | Specifies the column used for joining data with a parent grid.        |                                            |
| `addCreatedOnColumn`     | `boolean`  | Adds a column to show the creation date of rows.                      |                                            |
| `addCreatedByColumn`     | `boolean`  | Adds a column to show the user who created the rows.                  |                                            |
| `addModifiedOnColumn`    | `boolean`  | Adds a column to show the modification date of rows.                  |                                            |
| `addModifiedByColumn`    | `boolean`  | Adds a column to show the user who modified the rows.                 |                                            |
| `controllerType`         | `string`   | Specifies the type of controller (`cs` for client/server).            |                                            |
| `template`               | `string`   | Template configuration for exporting or rendering specific grid rows. |                                            |
| `pivotAPI`               | `string`   | API endpoint for pivot-specific data.                                 |                                            |
| `preferenceId`           | `string`   | Identifier for saved grid preferences.                                |                                            |
| `rowRedirectLink`        | `string`   | URL to redirect when a row is clicked.                                |                                            |
| `showAddIcon`            | `boolean`  | Indicates if the "Add" button icon should be displayed.               |                                            |
| `pageTitle`              | `string`   | Sets the title for the page.                                          |                                            |
| `addUrlParamKey`         | `string`   | Key for additional URL parameters when navigating to forms.           |                                            |
| `searchParamKey`         | `string`   | Key for fetching parameters from the URL.                             |                                            |
| `nestedGrid`             | `boolean`  | Indicates if the grid is nested within another grid.                  |                                            |
| `tablePreferenceEnums`   | `object`   | Enumerations for specific table preferences.                          |                                            |
| `showPivotExportBtn`     | `boolean`  | Displays the button for exporting pivot data.                         |                                            |
| `showOnlyExcelExport`    | `boolean`  | Limits export options to only Excel formats.                          |                                            |
| `formTitle`              | `string`   | Title used in the form layout.                                        |                                            |
| `initialValues`          | `object`   | Initial values for form fields.                                       |                                            |
| `hideRelationsInAdd`     | `boolean`  | Hides relations section in add mode.                                  |                                            |
| `navigateBack`           | `string`   | Specifies the route for navigation on cancel or save.                 |                                            |
| `applyFieldConfig`       | `function` | A function to apply custom field configurations.                      |                                            |
| `updateChildGridRecords` | `function` | Updates child grid records after a form action.                       |                                            |
| `getValidationSchema`    | `function` | Function to return the validation schema for the form.                |                                            |
| `relations`              | `array`    | Defines the relationship configurations for related grids.            |                                            |

## Column Properties Table

## Column Properties Table

| **Property**          | **Type**         | **Description**                                                      | **Can be extended from** |
| --------------------- | ---------------- | -------------------------------------------------------------------- | ------------------------ |
| `field`               | `string`         | The name of the field displayed in the column.                       |                          |
| `type`                | `string`         | Specifies the type of data in the column (e.g., `number`, `string`). |                          |
| `headerName`          | `string`         | The label displayed as the column header.                            |                          |
| `flex`                | `number`         | Defines the column's flexibility in width compared to others.        |                          |
| `pinned`              | `boolean`        | Determines if the column is pinned to the left.                      |                          |
| `sortable`            | `boolean`        | Specifies if the column can be sorted.                               |                          |
| `filterable`          | `boolean`        | Specifies if the column can be filtered.                             |                          |
| `editable`            | `boolean`        | Indicates if the cells in the column are editable.                   |                          |
| `tab`                 | `string`         | Specifies the tab associated with this column in a tabbed layout.    |                          |
| `fieldLabel`          | `string`         | Optional label for the column field.                                 |                          |
| `defaultSort`         | `string`         | Sets the default sort order for this column (e.g., `asc`, `desc`).   |                          |
| `required`            | `boolean`        | Indicates if this column is required in the form.                    |                          |
| `validation`          | `function`       | Custom validation function for the column's data.                    |                          |
| `hidden`              | `boolean`        | Hides the column from the grid.                                      |                          |
| `lookupKey`           | `string`         | Key to fetch data for lookup fields in this column.                  |                          |
| `renderCell`          | `function`       | Custom renderer for the cell content.                                |                          |
| `align`               | `string`         | Specifies text alignment for the column (`left`, `center`, `right`). |                          |
| `tooltip`             | `string`         | Tooltip to display on hover over the column header.                  |                          |
| `groupable`           | `boolean`        | Indicates if the column can be grouped.                              |                          |
| `filterOperator`      | `string`         | Specifies the filter operator (e.g., `equals`, `contains`).          |                          |
| `width`               | `number`         | Specifies the width of the column in pixels.                         |                          |
| `resizable`           | `boolean`        | Indicates if the column width can be resized by the user.            |                          |
| `exportable`          | `boolean`        | Indicates if the column should be included in exported data.         |                          |
| `readOnly`            | `boolean`        | Marks the column as read-only.                                       |                          |
| `shouldDisableDate`   | `function`       | A function to disable specific dates in the `DatePicker`.            |                          |
| `showErrorText`       | `boolean`        | Indicates if error text should be displayed when validation fails.   |                          |
| `helperText`          | `string`         | Text to display as helper information below the field.               |                          |
| `disablePast`         | `boolean`        | Disables selection of past dates in the `DatePicker`.                |                          |
| `disableFuture`       | `boolean`        | Disables selection of future dates in the `DatePicker`.              |                          |
| `classes`             | `object`         | CSS classes to apply custom styles to the field.                     |                          |
| `relation`            | `component`      | Component used for rendering related fields (e.g., TransferField).   |                          |
| `multiSelect`         | `boolean`        | Enables multiple selections in a `Select` field.                     |                          |
| `parentComboField`    | `string`         | Field name used to fetch dependent data for a `Select` field.        |                          |
| `label`               | `string`         | Label text to display for available and assigned values.             |                          |
| `lookup`              | `string`/`array` | Defines the lookup source for dropdown values in the column.         |                          |
| `assigned`            | `boolean`        | Indicates if the field displays assigned values.                     |                          |
| `available`           | `boolean`        | Indicates if the field displays available values.                    |                          |
| `onAssignChange`      | `function`       | Callback triggered when assigned values are modified.                |                          |
| `disableCellRedirect` | `boolean`        | Disables cell click redirection for the column.                      |                          |
| `useLinkColumn`       | `boolean`        | Specifies if the column uses a link for navigation.                  |                          |
| `variant`             | `string`         | Specifies the variant for fields (e.g., `standard`, `filled`).       |                          |
| `multiline`           | `boolean`        | Indicates if the text field should support multiple lines.           |                          |
| `rows`                | `number`         | Number of rows to display in a multiline text field.                 |                          |
| `isUtc`               | `boolean`        | Indicates if the field value is stored in UTC format.                |                          |
