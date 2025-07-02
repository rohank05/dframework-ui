import Button from '@mui/material/Button';
import React from 'react';
import {
    DataGridPremium,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExportContainer,
    getGridDateOperators,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    getGridStringOperators,
    getGridBooleanOperators
} from '@mui/x-data-grid-premium';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/FileCopy';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {
    GridActionsCellItem,
    useGridApiRef
} from '@mui/x-data-grid-premium';
import { useMemo, useEffect, memo, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from '../SnackBar/index';
import { DialogComponent } from '../Dialog/index';
import { getList, getRecord, deleteRecord, saveRecord } from './crud-helper';
import PropTypes from 'prop-types';
import { Footer } from './footer';
import template from './template';
import { Tooltip, CardContent, Card } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import PageTitle from '../PageTitle';
import { useStateContext, useRouter } from '../useRouter/StateProvider';
import LocalizedDatePicker from './LocalizedDatePicker';
import actionsStateProvider from '../useRouter/actions';
import GridPreferences from './GridPreference';
import CustomDropdownmenu from './CustomDropdownmenu';
import { getPermissions } from '../utils';
import HistoryIcon from '@mui/icons-material/History';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

const defaultPageSize = 10;
const sortRegex = /(\w+)( ASC| DESC)?/i;
const recordCounts = 60000;
const actionTypes = {
    Copy: "Copy",
    Edit: "Edit",
    Delete: "Delete",
    History: "History",
    Download: "Download"
};
const iconMapper = {
    'article': <ArticleIcon />
}
const filterFieldDataTypes = {
    Number: 'number',
    String: 'string',
    Boolean: 'boolean'
};
const constants = {
    gridFilterModel: { items: [], logicOperator: 'and', quickFilterValues: Array(0), quickFilterLogicOperator: 'and' },
    permissions: { edit: true, add: true, export: true, delete: true, showColumnsOrder: true, filter: true }
}
const auditColumnMappings = [
    { key: 'addCreatedOnColumn', field: 'CreatedOn', type: 'dateTime', header: 'Created On' },
    { key: 'addCreatedByColumn', field: 'CreatedByUser', type: 'string', header: 'Created By' },
    { key: 'addModifiedOnColumn', field: 'ModifiedOn', type: 'dateTime', header: 'Modified On' },
    { key: 'addModifiedByColumn', field: 'ModifiedByUser', type: 'string', header: 'Modified By' }
];
const booleanIconRenderer = (params) => {
    if (params.value) {
        return <CheckIcon style={{ color: 'green' }} />;
    } else {
        return <CloseIcon style={{ color: 'gray' }} />;
    }
}

const useStyles = makeStyles({
    buttons: {
        margin: '6px !important'
    },
    deleteContent: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
})

const convertDefaultSort = (defaultSort) => {
    if (typeof defaultSort !== 'string') return [];

    return defaultSort.split(',').map(sortField => {
        sortRegex.lastIndex = 0;
        const sortInfo = sortRegex.exec(sortField);
        if (!sortInfo) return null;

        const [, field, direction = 'ASC'] = sortInfo;
        return {
            field: field.trim(),
            sort: direction.trim().toLowerCase()
        };
    }).filter(Boolean);
};

const ExportMenuItem = ({ tTranslate, tOpts, handleExport, contentType, type, isPivotExport = false }) => {
    return (
        <MenuItem
            onClick={handleExport}
            data-type={type}
            data-content-type={contentType}
            data-is-pivot-export={isPivotExport}
        >
            {tTranslate("Export", tOpts)} {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </MenuItem>
    );
};

ExportMenuItem.propTypes = {
    hideMenu: PropTypes.func
};

const CustomExportButton = ({ exportFormats, ...props }) => (
    <GridToolbarExportContainer {...props}>
        {exportFormats.csv !== false && <ExportMenuItem {...props} type="csv" contentType="text/csv" />}
        {exportFormats.excel !== false && <ExportMenuItem {...props} type="excel" contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />}
        {props.showPivotExportBtn && <ExportMenuItem {...props} type="excel With Pivot" contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" isPivotExport={true} />}
        {exportFormats.xml !== false && <ExportMenuItem {...props} type="xml" contentType="text/xml" />}
        {exportFormats.html !== false && <ExportMenuItem {...props} type="html" contentType="text/html" />}
        {exportFormats.json !== false && <ExportMenuItem {...props} type="json" contentType="application/json" />}
    </GridToolbarExportContainer>
);

const areEqual = (prevProps = {}, nextProps = {}) => {
    let equal = true;
    for (const o in prevProps) {
        if (prevProps[o] !== nextProps[o]) {
            equal = false;
        }
    }
    for (const o in nextProps) {
        if (!prevProps.hasOwnProperty(o)) {
            equal = false;
        }
    }
    return equal;
}
// TODO: Add support for additional languages in localization (e.g., translations for filterValueTrue, filterValueFalse, etc.)
const GridBase = memo(({
    showGrid = true,
    model,
    columns,
    api,
    defaultSort,
    setActiveRecord,
    parentFilters,
    parent,
    where,
    title,
    showModal,
    OrderModal,
    permissions,
    selected,
    assigned,
    available,
    disableCellRedirect = false,
    onAssignChange,
    customStyle,
    onCellClick,
    showRowsSelected,
    chartFilters,
    clearChartFilter,
    showFullScreenLoader,
    customFilters,
    onRowDoubleClick,
    baseFilters,
    onRowClick = () => { },
    gridStyle,
    reRenderKey,
    additionalFilters,
    onCellDoubleClickOverride,
    onAddOverride,
    dynamicColumns,
    readOnly = false,
    ...props
}) => {
    // TODO: Add constants for default values like defaultPageSize and recordCounts.
    const [paginationModel, setPaginationModel] = useState({ pageSize: defaultPageSize, page: 0 });
    const [data, setData] = useState({ recordCount: 0, records: [], lookups: {} });
    const [isLoading, setIsLoading] = useState(true);
    const forAssignment = !!onAssignChange;
    const rowsSelected = showRowsSelected;
    const [selection, setSelection] = useState([]);
    const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [record, setRecord] = useState(null);
    const visibilityModel = { CreatedOn: false, CreatedByUser: false, ...model.columnVisibilityModel };
    const [showAddConfirmation, setShowAddConfirmation] = useState(false);
    const snackbar = useSnackbar();
    const paginationMode = model.paginationMode === 'client' ? 'client' : 'server';
    const { t: translate, i18n } = useTranslation()
    const tOpts = { t: translate, i18n };
    const [errorMessage, setErrorMessage] = useState('');
    const [sortModel, setSortModel] = useState(convertDefaultSort(defaultSort || model.defaultSort));
    const initialFilterModel = { items: [], logicOperator: 'and', quickFilterValues: Array(0), quickFilterLogicOperator: 'and' }
    if (model.defaultFilters) {
        initialFilterModel.items = [];
        model.defaultFilters.forEach((ele) => {
            initialFilterModel.items.push(ele);
        })
    }
    const [filterModel, setFilterModel] = useState({ ...initialFilterModel });
    const { navigate, getParams, useParams, pathname } = useRouter();
    const { id: idWithOptions } = useParams() || getParams;
    const id = idWithOptions?.split('-')[0];
    const apiRef = useGridApiRef();
    const { idProperty = "id", showHeaderFilters = true, disableRowSelectionOnClick = true, hideBackButton = false, hideTopFilters = true, updatePageTitle = true, isElasticScreen = false, navigateBack = false, selectionApi = {} } = model;
    const isReadOnly = model.readOnly === true || readOnly;
    const isDoubleClicked = model.allowDoubleClick === false;
    const dataRef = useRef(data);
    const showAddIcon = model.showAddIcon === true;
    const toLink = model.columns.filter(({ link }) => Boolean(link)).map(item => item.link);
    const [isGridPreferenceFetched, setIsGridPreferenceFetched] = useState(false);
    const classes = useStyles();
    const { stateData, dispatchData, formatDate, removeCurrentPreferenceName, getAllSavedPreferences, applyDefaultPreferenceIfExists } = useStateContext();
    const { timeZone } = stateData;
    const effectivePermissions = { ...constants.permissions, ...stateData.gridSettings.permissions, ...model.permissions, ...permissions };
    const { Username } = stateData?.getUserData ? stateData.getUserData : {};
    const {
        gridSettings: {
            permissions: {
                routesWithNoChildRoute = [],
                Url: url,
                withControllersUrl,
                defaultPreferenceEnums
            } = {}
        } = {},
        currentPreference
    } = stateData;
    const emptyIsAnyOfOperatorFilters = ["isEmpty", "isNotEmpty", "isAnyOf"];
    const userData = stateData.getUserData || {};
    const documentField = model.columns.find(ele => ele.type === 'fileUpload')?.field || "";
    const userDefinedPermissions = { add: effectivePermissions.add, edit: effectivePermissions.edit, delete: effectivePermissions.delete };
    const { canAdd, canEdit, canDelete } = getPermissions({ userData, model, userDefinedPermissions });
    const tTranslate = model.tTranslate ?? ((key) => key);
    const { addUrlParamKey, searchParamKey, hideBreadcrumb = false, tableName, showHistory = true, hideBreadcrumbInGrid = false, breadcrumbColor } = model;
    const gridTitle = model.gridTitle || model.title;
    const OrderSuggestionHistoryFields = {
        OrderStatus: 'OrderStatusId'
    }
    const preferenceApi = stateData?.gridSettings?.permissions?.preferenceApi;
    const preferenceName = model.preferenceId || model.module?.preferenceId;
    const searchParams = new URLSearchParams(window.location.search);

    const baseDataFromParams = searchParams.has('baseData') && searchParams.get('baseData');
    const baseSaveData = (() => {
        if (baseDataFromParams) {
            const parsedData = JSON.parse(baseDataFromParams);
            if (typeof parsedData === 'object' && parsedData !== null) {
                return parsedData;
            }
        }
        return {};
    })();
    const selectedSet = useRef(new Set());

    const handleSelectRow = ({ row }) => {
        const rowId = row[idProperty];
        const isSelected = selectedSet.current.has(rowId);
        if (isSelected) {
            selectedSet.current.delete(rowId);
        } else {
            selectedSet.current.add(rowId);
        }
        setSelection(Array.from(selectedSet.current));
    };

    const CustomCheckBox = (params) => {
        const rowId = params.row[idProperty];
        const [isCheckedLocal, setIsCheckedLocal] = useState(selectedSet.current.has(rowId));

        useEffect(() => {
            setIsCheckedLocal(selectedSet.current.has(rowId));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [params.row, selectedSet.current.size]);

        const handleCheckboxClick = (event) => {
            event.stopPropagation();
            handleSelectRow(params);
        };

        return (
            <Checkbox
                onClick={handleCheckboxClick}
                checked={isCheckedLocal}
                color="primary"
                inputProps={{ 'aria-label': 'checkbox' }}
            />
        );
    };

    const gridColumnTypes = {
        "radio": {
            "type": "singleSelect",
            "valueOptions": "lookup"
        },
        "date": {
            "valueFormatter": (value) => (
                formatDate({ value, useSystemFormat: true, showOnlyDate: false, state: stateData.dateTime, timeZone })
            ),
            "filterOperators": LocalizedDatePicker({ columnType: "date" }),
        },
        "dateTime": {
            "valueFormatter": (value) => (
                formatDate({ value, useSystemFormat: false, showOnlyDate: false, state: stateData.dateTime, timeZone })
            ),
            "filterOperators": LocalizedDatePicker({ columnType: "datetime" }),
        },
        "dateTimeLocal": {
            "valueFormatter": (value) => (
                formatDate({ value, useSystemFormat: false, showOnlyDate: false, state: stateData.dateTime, timeZone })
            ),
            "filterOperators": LocalizedDatePicker({ type: "dateTimeLocal", convert: true }),
        },
        "boolean": {
            renderCell: booleanIconRenderer
        },
        "select": {
            "type": "singleSelect",
            "valueOptions": "lookup"
        },
        "selection": {
            renderCell: (params) => <CustomCheckBox {...params} />
        }
    }

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        if (!customFilters || !Object.keys(customFilters).length) return;
        if (customFilters.clear) {
            setFilterModel({ items: [], logicOperator: "and", quickFilterValues: [], quickFilterLogicOperator: "and" });
            return;
        }
        const items = Object.entries(customFilters).reduce((acc, [key, value]) => {
            if (key === 'startDate' || key === 'endDate') {
                acc.push(value);
            } else if (key in customFilters) {
                acc.push({ field: key, value, operator: "equals", type: "string" });
            }
            return acc;
        }, []);
        setFilterModel({ items, logicOperator: "and", quickFilterValues: [], quickFilterLogicOperator: "and" });
    }, [customFilters]);

    const lookupOptions = ({ field }) => {
        const lookupData = dataRef.current.lookups || {};
        return lookupData[lookupMap[field].lookup] || [];
    };

    useEffect(() => {
        if (props.isChildGrid || !hideTopFilters) {
            return;
        }
        dispatchData({
            type: actionsStateProvider.PASS_FILTERS_TOHEADER, payload: {
                filterButton: null,
                hidden: { search: true, operation: true, export: true, print: true, filter: true }
            }
        });
    }, []);
    const { customActions = [] } = model;
    const { gridColumns, pinnedColumns, lookupMap } = useMemo(() => {
        let baseColumnList = columns || model.gridColumns || model.columns;
        if (dynamicColumns) {
            baseColumnList = [...dynamicColumns, ...baseColumnList];
        }
        const pinnedColumns = { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field], right: [] };
        const finalColumns = [];
        const lookupMap = {};
        for (const column of baseColumnList) {
            if (column.gridLabel === null || (parent && column.lookup === parent) || (column.type === 'oneToMany' && column.countInList === false)) continue;
            const overrides = {};
            if (column.type === 'oneToMany') {
                overrides.type = 'number';
                overrides.field = column.field.replace(/s$/, 'Count');
            }
            if (gridColumnTypes[column.type]) {
                Object.assign(overrides, gridColumnTypes[column.type]);
            }
            // Common filter operator pattern
            if (overrides.valueOptions === 'lookup' || column.type === 'boolean') {
                let operators = [];

                if (overrides.valueOptions === 'lookup') {
                    overrides.valueOptions = lookupOptions;
                    const lookupFilters = [...getGridDateOperators(), ...getGridStringOperators()]
                        .filter((op) => ['is', 'not', 'isAnyOf'].includes(op.value));
                    operators = lookupFilters;
                }

                if (column.type === 'boolean') {
                    operators = getGridBooleanOperators();
                }

                overrides.filterOperators = operators.map((operator) => ({
                    ...operator,
                    InputComponent: operator.InputComponent
                        ? (params) => (
                            <CustomDropdownmenu
                                column={{
                                    ...column,
                                    ...(column.type === 'boolean'
                                        ? {
                                            customLookup: [
                                                { value: true, label: 'Yes' },
                                                { value: false, label: 'No' },
                                            ]
                                        }
                                        : {}),
                                    dataRef,
                                }}
                                {...params}
                                autoHighlight
                            />
                        )
                        : undefined,
                }));
            }
            if (column.linkTo || column.link) {
                overrides.cellClassName = 'mui-grid-linkColumn';
            }
            const headerName = tTranslate(column.gridLabel || column.label, tOpts);
            finalColumns.push({ headerName, description: headerName, ...column, ...overrides });
            if (column.pinned) {
                pinnedColumns[column.pinned === 'right' ? 'right' : 'left'].push(column.field);
            }
            lookupMap[column.field] = column;
        }
        let auditColumns = model.standard;
        if (auditColumns === true) {
            auditColumns = { addCreatedOnColumn: true, addCreatedByColumn: true, addModifiedOnColumn: true, addModifiedByColumn: true };
        }
        if (auditColumns && typeof auditColumns === 'object') {
            auditColumnMappings.forEach(({ key, field, type, header }) => {
                if (auditColumns[key] === true) {
                    const column = { field, type, headerName: header, width: 200 };
                    if (type === 'dateTime') {
                        column.filterOperators = LocalizedDatePicker({ columnType: 'date' });
                        column.valueFormatter = gridColumnTypes.dateTime.valueFormatter;
                        column.keepLocal = true;
                    }
                    finalColumns.push(column);
                }
            });
        }
        const actions = [];
        if (!forAssignment && !isReadOnly) {
            if (canEdit) {
                actions.push(<GridActionsCellItem icon={<Tooltip title="Edit"><EditIcon /></Tooltip>} data-action={actionTypes.Edit} label="Edit" color="primary" />);
            }
            if (effectivePermissions.copy) {
                actions.push(<GridActionsCellItem icon={<Tooltip title="Copy"><CopyIcon /> </Tooltip>} data-action={actionTypes.Copy} label="Copy" color="primary" />);
            }
            if (canDelete) {
                actions.push(<GridActionsCellItem icon={<Tooltip title="Delete"><DeleteIcon /> </Tooltip>} data-action={actionTypes.Delete} label="Delete" color="error" />);
            }
            if (showHistory) {
                actions.push(<GridActionsCellItem icon={<Tooltip title="History"><HistoryIcon /> </Tooltip>} data-action={actionTypes.History} label="History" color="primary" />);
            }
            if (customActions.length) {
                customActions.forEach(({ icon, action, color }) => {
                    actions.push(
                        <GridActionsCellItem
                            icon={<Tooltip title={action}>{iconMapper[icon] || <CopyIcon />}</Tooltip>}
                            data-action={action}
                            label={action}
                            color={color || "primary"}
                        />
                    );
                });
            }
        }
        if (documentField.length) {
            actions.push(<GridActionsCellItem icon={<Tooltip title="Download document"><FileDownloadIcon /> </Tooltip>} data-action={actionTypes.Download} label="Download document" color="primary" />);
        }
        if (actions.length) {
            finalColumns.push({
                field: 'actions',
                type: 'actions',
                label: '',
                width: actions.length * 50,
                hideable: false,
                getActions: (params) => {
                    const rowActions = [...actions];
                    if (canEdit && !isReadOnly) {
                        const isDisabled = params.row.canEdit === false;
                        rowActions[0] = (
                            <GridActionsCellItem
                                icon={
                                    <Tooltip title="Edit">
                                        <EditIcon />
                                    </Tooltip>
                                }
                                data-action={actionTypes.Edit}
                                label="Edit"
                                color="primary"
                                disabled={isDisabled}
                            />
                        );
                    }
                    return rowActions;
                },
            });
        }
        pinnedColumns.right.push('actions');
        return { gridColumns: finalColumns, pinnedColumns, lookupMap };
    }, [columns, model, parent, permissions, forAssignment, dynamicColumns]);

    const fetchData = (action = "list", extraParams = {}, contentType, columns, isPivotExport, isElasticExport) => {
        const { pageSize, page } = paginationModel;

        let controllerType = model.controllerType;
        let gridApi = `${controllerType === "cs" ? withControllersUrl : url || ""}${model.api || api}`;

        if (isPivotExport) {
            gridApi = `${withControllersUrl}${model.pivotApi}`;
            controllerType = "cs";
        }

        if (assigned || available) {
            extraParams[assigned ? "include" : "exclude"] = Array.isArray(selected) ? selected.join(",") : selected;
        }

        const filters = { ...filterModel };
        if (chartFilters?.items?.length > 0) {
            const { columnField, operatorValue } = chartFilters.items[0] || {};
            const chartField = constants.chartFilterFields[columnField];
            filters.items = [{ field: chartField, operator: operatorValue, isChartFilter: false }];
            if (JSON.stringify(filterModel) !== JSON.stringify(filters)) {
                setFilterModel({ ...filters });
                chartFilters.items.length = 0;
            }
        }
        const baseFilters = [];
        if (model.joinColumn && id) {
            baseFilters.push({ field: model.joinColumn, operator: "is", type: "number", value: Number(id) });
        }

        if (additionalFilters) {
            filters.items = [...(filters.items || []), ...additionalFilters];
        }

        const isValidFilters = !filters.items.length || filters.items.every(item => "value" in item && item.value !== undefined);
        if (!isValidFilters) return;

        getList({
            action,
            page: !contentType ? page : 0,
            pageSize: !contentType ? pageSize : 1000000,
            sortModel,
            filterModel: filters,
            controllerType,
            api: gridApi,
            setIsLoading,
            setData,
            gridColumns,
            model,
            parentFilters,
            extraParams,
            setError: snackbar.showError,
            contentType,
            columns,
            template: isPivotExport ? model.exportTemplate : null,
            configFileName: isPivotExport ? model.configFileName : null,
            dispatchData,
            showFullScreenLoader,
            history: navigate,
            baseFilters,
            isElasticExport
        });
    };

    const openForm = ({ id, record = {}, mode }) => {
        if (setActiveRecord) {
            getRecord({ id, api: api || model.api, setIsLoading, setActiveRecord, model, parentFilters, where });
            return;
        }
        let path = pathname;
        if (!path.endsWith("/")) {
            path += "/";
        }
        if (mode === "copy") {
            path += "0-" + id;
            dispatchData({ type: 'UPDATE_FORM_MODE', payload: 'copy' })

        } else {
            path += id;
            dispatchData({ type: 'UPDATE_FORM_MODE', payload: '' })
        }
        if (addUrlParamKey) {
            searchParams.set(addUrlParamKey, record[addUrlParamKey]);
            path += `?${searchParams.toString()}`;
        }
        navigate(path);
    };

    const handleDownload = async ({ documentLink, fileName }) => {
        if (!documentLink) return;
        try {
            const response = await fetch(documentLink);
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;

            // Derive a file name from the URL or fall back to default
            const fileNameFromLink = documentLink.split("/").pop() || `downloaded-file.${blob.type.split("/")[1] || "txt"}`;
            link.download = fileName || fileNameFromLink;

            // Append the link to the DOM and trigger a click
            document.body.appendChild(link);
            link.click();

            // Cleanup after the download
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            window.open(documentLink);
            console.error("Error downloading the file:", error);
        }
    };
    const onCellClickHandler = async (cellParams, event, details) => {
        let action = cellParams.field === model.linkColumn ? actionTypes.Edit : null;
        if (!action && cellParams.field === 'actions') {
            action = details?.action;
            if (!action) {
                const el = event.target.closest('button');
                if (el) {
                    action = el.dataset.action;
                }
            }
        }
        const { row: record } = cellParams;
        if (!isReadOnly) {
            if (onCellClick) {
                const result = await onCellClick({ cellParams, event, details });
                if (typeof result !== "boolean") {
                    return;
                }
            }
            const columnConfig = lookupMap[cellParams.field] || {};
            if (columnConfig.linkTo) {
                navigate({
                    pathname: template.replaceTags(columnConfig.linkTo, record)
                });
                return;
            }
            switch (action) {
                case actionTypes.Edit:
                    return openForm({ id: record[idProperty], record });
                case actionTypes.Copy:
                    return openForm({ id: record[idProperty], mode: 'copy' });
                case actionTypes.Delete:
                    setIsDeleting(true);
                    setRecord({ name: record[model.linkColumn], id: record[idProperty] });
                    break;
                case actionTypes.History:
                    // navigates to history screen, specifying the tablename, id of record and breadcrumb to render title on history screen.
                    return navigate(`historyScreen?tableName=${tableName}&id=${record[idProperty]}&breadCrumb=${searchParamKey ? searchParams.get(searchParamKey) : gridTitle}`);
                default:
                    // Check if action matches any customAction and call its onClick if found
                    const foundCustomAction = customActions.find(ca => ca.action === action && typeof ca.onClick === 'function');
                    if (foundCustomAction) {
                        foundCustomAction.onClick({ row: record, navigate });
                        return;
                    }
                    break;
            }
        }
        if (action === actionTypes.Download) {
            handleDownload({ documentLink: record[documentField], fileName: record.FileName });
        }
        if (!toLink.length) {
            return;
        }
        if (model.isAcostaController && onCellClick && cellParams.colDef.customCellClick === true) {
            onCellClick(cellParams.row);
            return;
        }
        const { row } = cellParams;
        const columnConfig = lookupMap[cellParams.field] || {};
        const historyObject = {
            pathname: template.replaceTags(columnConfig.linkTo, row)
        }
        if (model.addRecordToState) {
            historyObject.state = row
        }
        navigate(historyObject);
    };

    const handleDelete = async function () {
        const result = await deleteRecord({ id: record.id, api: `${model.controllerType === 'cs' ? withControllersUrl : url}${model.api || api}`, setIsLoading, setError: snackbar.showError, setErrorMessage });
        if (result === true) {
            setIsDeleting(false);
            snackbar.showMessage('Record Deleted Successfully.');
            fetchData();
        } else {
            setIsDeleting(false);
        }
    }
    const clearError = () => {
        setErrorMessage(null);
        setIsDeleting(false);
    };

    const processRowUpdate = (updatedRow) => {
        if (typeof props.processRowUpdate === "function") {
            props.processRowUpdate(updatedRow, data);
        }
        return updatedRow;
    }

    const onCellDoubleClick = (event) => {
        if (event.row.canEdit === false) {
            return;
        }
        const { row: record } = event;
        if (typeof onCellDoubleClickOverride === 'function') {
            onCellDoubleClickOverride(event);
            return;
        }
        if (!isReadOnly && !isDoubleClicked && !disableCellRedirect) {
            openForm({ id: record[idProperty], record });
        }
        if (isReadOnly && model.rowRedirectLink) {
            const historyObject = {
                pathname: template.replaceTags(model.rowRedirectLink, record),
            }
            if (model.addRecordToState) {
                historyObject.state = record
            }
            navigate(historyObject);
        }
        if (typeof onRowDoubleClick === 'function') {
            onRowDoubleClick(event);
        }
    };

    const handleCloseOrderDetailModal = () => {
        setIsOrderDetailModalOpen(false);
        setSelectedOrder(null);
        fetchData();
    };

    const handleAddRecords = async () => {
        if (selectedSet.current.size < 1) {
            snackbar.showError("Please select at least one record to proceed");
            return;
        }

        const selectedIds = Array.from(selectedSet.current);
        const recordMap = new Map(data.records.map(record => [record[idProperty], record]));
        let selectedRecords = selectedIds.map(id => ({ ...baseSaveData, ...recordMap.get(id) }));

        // If selectionUpdateKeys is defined, filter each record to only those keys
        if (Array.isArray(model.selectionUpdateKeys) && model.selectionUpdateKeys.length) {
            selectedRecords = selectedRecords.map(item =>
                Object.fromEntries(model.selectionUpdateKeys.map(key => [key, item[key]]))
            );
        }

        try {
            const result = await saveRecord({
                id: 0,
                api: `${url}${selectionApi || api}/updateMany`,
                values: { items: selectedRecords },
                setIsLoading,
                setError: snackbar.showError
            });

            if (result) {
                fetchData();
                snackbar.showMessage("Record Added Successfully.");
            }
        } catch (err) {
            snackbar.showError(err.message || "An error occurred, please try again later.");
        } finally {
            selectedSet.current.clear();
            setIsLoading(false);
            setShowAddConfirmation(false);
        }
    };

    const onAdd = () => {
        if (selectionApi.length > 0) {
            if (selectedSet.current.size) {
                setShowAddConfirmation(true);
                return;
            }
            snackbar.showError(
                "Please select atleast one record to proceed"
            );
            setIsLoading(false);
            return;
        }
        if (typeof onAddOverride === 'function') {
            onAddOverride();
        } else {
            openForm({ id: 0 });
        }
    }

    const clearFilters = () => {
        if (!filterModel?.items?.length) return;
        const filters = JSON.parse(JSON.stringify(constants.gridFilterModel));
        setFilterModel(filters);
        if (clearChartFilter) {
            clearChartFilter();
        }
    }
    const updateAssignment = ({ unassign, assign }) => {
        const assignedValues = Array.isArray(selected) ? selected : (selected.length ? selected.split(',') : []);
        const finalValues = unassign ? assignedValues.filter(id => !unassign.includes(parseInt(id))) : [...assignedValues, ...assign];
        onAssignChange(typeof selected === 'string' ? finalValues.join(',') : finalValues);
    }

    const onAssign = () => {
        updateAssignment({ assign: selection });
    }

    const onUnassign = () => {
        updateAssignment({ unassign: selection });
    }

    const selectAll = () => {
        if (selectedSet.current.size === data.records.length) {
            // If all records are selected, deselect all
            selectedSet.current.clear();
            setSelection([]);
        } else {
            // Select all records
            data.records.forEach(record => {
                selectedSet.current.add(record[idProperty]);
            });
            setSelection(data.records.map(record => record[idProperty]));
        }
    }

    useEffect(() => {
        if (!preferenceName || !preferenceApi) {
            return;
        }
        removeCurrentPreferenceName({ dispatchData });
        getAllSavedPreferences({ preferenceName, history: navigate, dispatchData, Username, preferenceApi, defaultPreferenceEnums });
        applyDefaultPreferenceIfExists({ preferenceName, history: navigate, dispatchData, Username, gridRef: apiRef, setIsGridPreferenceFetched, preferenceApi, defaultPreferenceEnums });
    }, [preferenceApi])

    const CustomToolbar = function (props) {
        const addtext = model.customAddText || (model.title ? `Add ${model.title}` : 'Add');
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px'
                }}
            >
                <div>
                    {model.gridSubTitle && <Typography variant="h6" component="h3" textAlign="center" sx={{ ml: 1 }}> {tTranslate(model.gridSubTitle, tOpts)}</Typography>}
                    {currentPreference && model.showPreferenceInHeader && <Typography className="preference-name-text" variant="h6" component="h6" textAlign="center" sx={{ ml: 1 }} >{tTranslate('Applied Preference', tOpts)} - {currentPreference}</Typography>}
                    {(isReadOnly || (!canAdd && !forAssignment)) && <Typography variant="h6" component="h3" textAlign="center" sx={{ ml: 1 }} > {!canAdd || isReadOnly ? "" : model.title}</Typography>}
                    {!forAssignment && canAdd && !isReadOnly && <Button startIcon={!showAddIcon ? null : <AddIcon />} onClick={onAdd} size="medium" variant="contained" className={classes.buttons} >{addtext}</Button>}
                    {(selectionApi.length && data.records.length) ? (
                        <Button
                            onClick={selectAll}
                            size="medium"
                            variant="contained"
                            className={classes.buttons}
                        >
                            {selectedSet.current.size === data.records.length ? "Deselect All" : "Select All"}
                        </Button>) :
                        <></>
                    }
                    {available && <Button startIcon={!showAddIcon ? null : <AddIcon />} onClick={onAssign} size="medium" variant="contained" className={classes.buttons}  >{"Assign"}</Button>}
                    {assigned && <Button startIcon={!showAddIcon ? null : <RemoveIcon />} onClick={onUnassign} size="medium" variant="contained" className={classes.buttons}  >{"Remove"}</Button>}
                </div>
                <GridToolbarContainer {...props}>
                    {effectivePermissions.showColumnsOrder && (
                        <GridToolbarColumnsButton />
                    )}
                    {effectivePermissions.filter && (<>
                        <GridToolbarFilterButton />
                        <Button startIcon={<FilterListOffIcon />} onClick={clearFilters} size="small">{"CLEAR FILTER"}</Button>
                    </>)}

                    {effectivePermissions.export && (
                        <CustomExportButton handleExport={handleExport} showPivotExportBtn={model.pivotApi} exportFormats={model.exportFormats || {}} tTranslate={tTranslate} tOpts={tOpts} />
                    )}
                    {preferenceName &&
                        <GridPreferences preferenceName={preferenceName} gridRef={apiRef} columns={gridColumns} setIsGridPreferenceFetched={setIsGridPreferenceFetched} />
                    }
                </GridToolbarContainer>
            </div >
        );
    };

    const getGridRowId = (row) => {
        return row[idProperty];
    };
    const handleExport = (e) => {
        if (data?.recordCount > recordCounts) {
            snackbar.showMessage('Cannot export more than 60k records, please apply filters or reduce your results using filters');
            return;
        }
        const { orderedFields, columnVisibilityModel, lookup } = apiRef.current.state.columns;
        const isPivotExport = e.target.dataset.isPivotExport === 'true';
        const hiddenColumns = Object.keys(columnVisibilityModel).filter(key => columnVisibilityModel[key] === false);

        const nonExportColumns = new Set(gridColumns.filter(col => col.exportable === false).map(col => col.field));

        const visibleColumns = orderedFields.filter(
            field => !nonExportColumns.has(field) && !hiddenColumns.includes(field) && field !== '__check__' && field !== 'actions'
        );

        if (visibleColumns.length === 0) {
            snackbar.showMessage('You cannot export while all columns are hidden... please show at least 1 column before exporting');
            return;
        }

        const columns = {};
        visibleColumns.forEach(field => {
            const col = lookup[field];
            columns[field] = { field, width: col.width, headerName: col.headerName || col.field, type: col.type, keepLocal: col.keepLocal === true, isParsable: col.isParsable, lookup: col.lookup };
        });
        fetchData(
            isPivotExport ? 'export' : undefined,
            undefined,
            e.target.dataset.contentType,
            columns,
            isPivotExport,
            isElasticScreen
        );
    };

    useEffect(() => {
        if (!url) return;
        fetchData();
    }, [paginationModel, sortModel, filterModel, api, gridColumns, model, parentFilters, assigned, selected, available, chartFilters, isGridPreferenceFetched, reRenderKey, url])

    useEffect(() => {
        if (props.isChildGrid || forAssignment || !updatePageTitle) {
            return;
        }
        dispatchData({ type: actionsStateProvider.PAGE_TITLE_DETAILS, payload: { icon: "", titleHeading: model.pageTitle || model.title, title: model.title } })
        return () => {
            dispatchData({
                type: actionsStateProvider.PAGE_TITLE_DETAILS, payload: null
            })
        }
    }, [])

    useEffect(() => {
        if (props.isChildGrid) {
            return;
        }
        let backRoute = pathname;

        // we do not need to show the back button for these routes
        if (hideBackButton || routesWithNoChildRoute.includes(backRoute)) {
            dispatchData({
                type: actionsStateProvider.SET_PAGE_BACK_BUTTON,
                payload: { status: false, backRoute: '' },
            });
            return;
        }
        backRoute = backRoute.split("/");
        backRoute.pop();
        backRoute = backRoute.join("/");
        dispatchData({
            type: actionsStateProvider.SET_PAGE_BACK_BUTTON,
            payload: { status: true, backRoute: backRoute },
        });
    }, [isLoading]);

    const updateFilters = (e) => {
        const { items } = e;
        const updatedItems = items.map(item => {
            const { field, operator, type, value } = item;
            const column = gridColumns.find(col => col.field === field) || {};
            const isNumber = column.type === filterFieldDataTypes.Number;

            if (isNumber && value < 0) {
                return { ...item, value: null };
            }

            if ((emptyIsAnyOfOperatorFilters.includes(operator)) || (isNumber && !isNaN(value)) || ((!isNumber))) {
                const isKeywordField = isElasticScreen && gridColumns.filter(element => element.field === field)[0]?.isKeywordField;
                if (isKeywordField) {
                    item.filterField = `${item.field}.keyword`;
                }
                item.value = ['isEmpty', 'isNotEmpty'].includes(operator) ? null : value;
                return { ...item, type: column.type };
            }
            const updatedValue = isNumber ? null : value;
            return { field, operator, type, value: updatedValue };
        });
        e.items = updatedItems;
        setFilterModel(e);
        const shouldClearChartFilter =
            (e.items.findIndex(ele => ele.isChartFilter && !(['isEmpty', 'isNotEmpty'].includes(ele.operator))) === -1) ||
            (
                chartFilters?.items?.length &&
                (
                    (!e.items.length) ||
                    (chartFilters.items.findIndex(ele => ele.columnField === e.items[0]?.field) > -1)
                )
            );

        if (shouldClearChartFilter && clearChartFilter) {
            clearChartFilter();
        }
    };

    const updateSort = (e) => {
        const sort = e.map((ele) => {
            const field = gridColumns.filter(element => element.field === ele.field)[0] || {};
            const isKeywordField = isElasticScreen && field.isKeywordField;
            const obj = { ...ele, filterField: isKeywordField ? `${ele.field}.keyword` : ele.field };
            if (field.dataIndex) {
                obj.filterField = field.dataIndex;
            }
            return obj;
        });
        setSortModel(sort);
    }
    const pageTitle = title || model.gridTitle || model.title;
    const breadCrumbs = searchParamKey
        ? [{ text: searchParams.get(searchParamKey) || pageTitle }]
        : [{ text: pageTitle }];
    return (
        <>
            <PageTitle showBreadcrumbs={!hideBreadcrumb && !hideBreadcrumbInGrid}
                breadcrumbs={breadCrumbs} enableBackButton={navigateBack} breadcrumbColor={breadcrumbColor} />
            <Card style={gridStyle || customStyle} elevation={0} sx={{ '& .MuiCardContent-root': { p: 0 } }}>
                <CardContent>
                    <DataGridPremium
                        sx={{
                            "& .MuiTablePagination-selectLabel": {
                                marginTop: 2
                            },
                            "& .MuiTablePagination-displayedRows": {
                                marginTop: 2
                            },
                            "& .MuiDataGrid-columnHeader .MuiInputLabel-shrink": {
                                display: "none"
                            }
                        }}
                        unstable_headerFilters={showHeaderFilters}
                        checkboxSelection={forAssignment}
                        loading={isLoading}
                        className="pagination-fix"
                        onCellClick={onCellClickHandler}
                        onCellDoubleClick={onCellDoubleClick}
                        columns={gridColumns}
                        paginationModel={paginationModel}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPaginationModelChange={setPaginationModel}
                        pagination
                        rowCount={data.recordCount}
                        rows={data.records}
                        sortModel={sortModel}
                        paginationMode={paginationMode}
                        sortingMode={paginationMode}
                        filterMode={paginationMode}
                        processRowUpdate={processRowUpdate}
                        keepNonExistentRowsSelected
                        onSortModelChange={updateSort}
                        onFilterModelChange={updateFilters}
                        rowSelection={selection}
                        onRowSelectionModelChange={setSelection}
                        filterModel={filterModel}
                        getRowId={getGridRowId}
                        onRowClick={onRowClick}
                        slots={{
                            headerFilterMenu: false,
                            toolbar: CustomToolbar,
                            footer: Footer
                        }}
                        slotProps={{
                            footer: {
                                pagination: true,
                                apiRef
                            },
                            panel: {
                                placement: "bottom-end"
                            }
                        }}
                        hideFooterSelectedRowCount={rowsSelected}
                        density="compact"
                        disableDensitySelector={true}
                        apiRef={apiRef}
                        disableAggregation={true}
                        disableRowGrouping={true}
                        disableRowSelectionOnClick={disableRowSelectionOnClick}
                        autoHeight
                        initialState={{
                            columns: {
                                columnVisibilityModel: visibilityModel
                            },
                            pinnedColumns: pinnedColumns
                        }}
                        localeText={{
                            filterValueTrue: 'Yes',
                            filterValueFalse: 'No'
                        }}

                    />
                    {isOrderDetailModalOpen && selectedOrder && model.OrderModal && (
                        <model.OrderModal
                            orderId={selectedOrder.OrderId}
                            isOpen={true}
                            orderTotal={selectedOrder.OrderTotal}
                            orderDate={selectedOrder.OrderDateTime}
                            orderStatus={selectedOrder.OrderStatus}
                            customerNumber={selectedOrder.CustomerPhoneNumber}
                            customerName={selectedOrder.CustomerName}
                            customerEmail={selectedOrder.CustomerEmailAddress}
                            onClose={handleCloseOrderDetailModal}
                        />
                    )}
                    {errorMessage && (<DialogComponent open={!!errorMessage} onConfirm={clearError} onCancel={clearError} title="Info" hideCancelButton={true} > {errorMessage}</DialogComponent>)
                    }
                    {isDeleting && !errorMessage && (
                        <DialogComponent open={isDeleting} onConfirm={handleDelete} onCancel={() => setIsDeleting(false)} title="Confirm Delete">
                            <span className={classes.deleteContent}>
                                Are you sure you want to delete {record.name && <Tooltip style={{ display: "inline" }} title={record.name} arrow>
                                    {record.name.length > 30 ? `${record.name.slice(0, 30)}...` : record.name}
                                </Tooltip>} ?
                            </span>
                        </DialogComponent>)}
                    {showAddConfirmation && (
                        <DialogComponent
                            open={showAddConfirmation}
                            onConfirm={handleAddRecords}
                            onCancel={() => setShowAddConfirmation(false)}
                            title="Confirm Add"
                        >
                            <span className={classes.deleteContent}>
                                Are you sure you want to add {selectedSet.current.size} records?
                            </span>
                        </DialogComponent>
                    )}
                </CardContent>
            </Card >
        </>
    );
}, areEqual);

export default GridBase;