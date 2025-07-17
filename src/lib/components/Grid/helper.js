import MenuItem from '@mui/material/MenuItem';
import { GridToolbarExportContainer } from '@mui/x-data-grid-premium';
import React from 'react';

// Helper to convert default sort string to array
export const convertDefaultSort = (defaultSort, constants, sortRegex) => {
    if (typeof defaultSort !== constants.string) return [];
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

// Export menu item component
export const ExportMenuItem = ({ tTranslate, tOpts, handleExport, contentType, type, isPivotExport = false }) => (
    <MenuItem
        onClick={handleExport}
        data-type={type}
        data-content-type={contentType}
        data-is-pivot-export={isPivotExport}
    >
        {tTranslate("Export", tOpts)} {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
    </MenuItem>
);

// Custom export button component
export const CustomExportButton = ({ exportFormats, ...props }) => (
    <GridToolbarExportContainer {...props}>
        {exportFormats.csv !== false && <ExportMenuItem {...props} type="csv" contentType="text/csv" />}
        {exportFormats.excel !== false && <ExportMenuItem {...props} type="excel" contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />}
        {props.showPivotExportBtn && <ExportMenuItem {...props} type="excel With Pivot" contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" isPivotExport={true} />}
        {exportFormats.xml !== false && <ExportMenuItem {...props} type="xml" contentType="text/xml" />}
        {exportFormats.html !== false && <ExportMenuItem {...props} type="html" contentType="text/html" />}
        {exportFormats.json !== false && <ExportMenuItem {...props} type="json" contentType="application/json" />}
    </GridToolbarExportContainer>
);

// Shallow props comparison
export const areEqual = (prevProps = {}, nextProps = {}) => {
    let equal = true;
    for (const o in prevProps) {
        if (prevProps[o] !== nextProps[o]) {
            equal = false;
        }
    }
    for (const o in nextProps) {
        if (!(o in prevProps)) {
            equal = false;
        }
    }
    return equal;
};