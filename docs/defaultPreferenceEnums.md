## defaultPreferenceEnums Description   

### Overview

The `defaultPreferenceEnums` object is used to store grid preferences based on the `preferenceId` as the key. It serves as a mapping between a user's saved grid settings and their respective configurations. This allows for customized sorting, filtering, visibility, column positioning, and other grid-related settings to be persisted and reused.

**Structure of defaultPreferenceEnums Example**

```js
   const = Example : {
      "sortModel": [
         {
            "field": "Installation",
            "sort": "desc"
         }
      ],
      "filterModel": {
         "items": [

         ],
         "logicOperator": "and",
         "quickFilterValues": [

         ],
         "quickFilterLogicOperator": "and"
      },
      "columnVisibilityModel": {
         "CreatedOn": false,
         "CreatedByUser": false,
         "AssetId": false,
         "Street": false,
         "City": false,
         "State": false,
         "PostalCode": false,
         "PrimaryRepName": false,
         "PrimarySalesRep": false,
         "SecondaryRepName": false,
         "LocationRoute": false,
         "PlanogramName": false
      },
      "gridColumn": [
         {
            "gridLabel": "Asset Serial #",
            "field": "SerialNumber",
            "type": "string",
            "label": "Asset Serial #",
            "required": true,
            "width": 160,
            "pinned": true
         }
      ],
      "pinnedColumns": {
         "left": [
            "__check__",
            "SerialNumber",
            "AssetType",
            "IsSmart"
         ],
         "right": [

         ]
      }
   }
```

## Properties

### 1. Sorting Configuration (`sortModel`)  

Defines the sorting behavior of the grid.  

| Field | Type   | Description                                                 |
| ----- | ------ | ----------------------------------------------------------- |
| field | string | The column field to sort by.                                |
| sort  | string | Sorting order (`asc` for ascending, `desc` for descending). |

- In this case, sorting is applied to the `Installation` field in descending order.

---

### 2. Filtering Configuration (`filterModel`)  

Defines the filter settings for the grid, as per the standard filter model of MUI.

| Field                    | Type   | Description                                                             |
| ------------------------ | ------ | ----------------------------------------------------------------------- |
| items                    | array  | Holds the individual filter conditions. (from MUI filter model)              |
| logicOperator            | string | Defines the logical relationship between filters (`and` or `or`).      |
| quickFilterValues        | array  | Holds quick filter values (from MUI filter model).                            |
| quickFilterLogicOperator | string | Defines the logical relationship between quick filters (`and` or `or`). |

- Currently, no filters are applied.

---

### 3. Column Visibility Settings (`columnVisibilityModel`)  

Defines which columns are visible in the grid.  
example: 
| Column Name      | Visibility (`false` = hidden) |
| ---------------- | ----------------------------- |
| CreatedOn        | false                         |
| CreatedByUser    | false                         |
| AssetId          | false                         |
| Street           | false                         |
| City             | false                         |
| State            | false                         |
| PostalCode       | false                         |
| PrimaryRepName   | false                         |
| PrimarySalesRep  | false                         |
| SecondaryRepName | false                         |
| LocationRoute    | false                         |
| PlanogramName    | false                         |

These columns are hidden in the grid.

---

### 4. Grid Columns Configuration (`gridColumn`)  

Defines the structure and properties of the grid columns.

| Property        | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| gridLabel      | string  | The name displayed in the grid header.                           |
| field           | string  | The key representing the column's data field.                    |
| type            | string  | The data type of the column (`string`, `date`, etc.).            |
| label           | string  | Alternative label for the column.                                |
| required        | boolean | Specifies if the column is required.                             |
| width           | number  | Defines the column width in pixels.                              |
| pinned          | boolean | Determines if the column is pinned to the left side of the grid. |
| keepUTC         | boolean | Ensures date values remain in UTC format (for date fields).      |
| filterOperators | array   | Defines filtering options for the column.                        |

### Example Columns:  

#### **1. Asset Serial Number Column**  

| Property | Value        |
| -------- | ------------ |
| field    | SerialNumber |
| type     | string       |
| width    | 160px        |
| pinned   | true         |

#### **2. Installation Date Column**  

| Property        | Value                                                          |
| --------------- | -------------------------------------------------------------- |
| field           | Installation                                                   |
| type            | date                                                           |
| width           | 120px                                                          |
| keepUTC         | true                                                           |
| filterOperators | `{ "value": "is", "InputComponentProps": { "type": "date" } }` |

---

### 5. Pinned Columns Configuration (`pinnedColumns`)  

Defines which columns remain fixed on the left or right side of the grid.

| Side  | Columns                                             |
| ----- | --------------------------------------------------- |
| Left  | `__check__`, `SerialNumber`, `AssetType`, `IsSmart` |
| Right | _(None)_                                            |

- The left side includes a checkbox column, asset serial number, asset type, and a smart asset indicator.

---
