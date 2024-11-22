import React, {
    memo,
    useState,
    //  useCallback, useEffect, useMemo 
} from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { useTheme } from '@mui/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { useSearchParams } from 'react-router-dom';

import { UiModel } from '../Grid/ui-models';
/**
 * Memoized ChildGrid Component
 * @param {Object} params - Parameters for rendering the child grid
 * @param {string} params.relation - Name of the related model
 * @param {Object} params.parentFilters - Filters to apply to the parent
 * @param {Object} params.parent - Parent data
 * @param {Object} params.where - Conditions for the grid
 * @param {Array} params.models - List of available models
 */
const ChildGrid = memo(({ relation, parentFilters, parent, where, models }) => {
    const modelConfigOfChildGrid = models.find((model) => model.name === relation);
    if (!modelConfigOfChildGrid) return null;

    const ChildModel = new UiModel(modelConfigOfChildGrid);
    if (!ChildModel) return null;
    console.log('0000000');

    return (
        <>
            <ChildModel.ChildGrid
                parentFilters={parentFilters}
                parent={parent}
                model={modelConfigOfChildGrid}
                where={where}
                isChildGrid={true}
            />
            <div>HH</div>
        </>

    );
});

const Relations = ({ relations, parentFilters, parent, where, models }) => {
    const [activeTab, setActiveTab] = useState(relations[0]);
    // const { palette } = useTheme();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    return (
        <TabContext value={activeTab}>
            <Box>
                {/* <TabList
                    // sx={{
                    //     '& .css-1mhpt05-MuiButtonBase-root-MuiTab-root': {
                    //         color: "red"
                    //         // color: palette.primary.text.dark
                    //     },
                    //     '.Mui-selected': {
                    //         color: `blue !important`
                    //         // color: `${palette.primary.selected_tab} !important`
                    //     },
                    //     '.MuiButtonBase-root': {
                    //         color: `green`
                    //         // color: `${palette.primary.unselected_tab}`
                    //     }
                    // }}
                    onChange={handleChange}
                > */}
                {/* {relations.map((relation) => (
                    <Tab
                        key={relation}
                        label={models.find((model) => model.name === relation)?.listTitle || "ModelLabel"}
                        value={relation}
                    // sx={{
                    //     color: "gray"
                    // }}
                    />
                ))} */}
                {/* </TabList> */}
            </Box>
            {relations.map((relation) => (
                // <TabPanel sx={{ padding: 0 }} value={relation} key={relation}>
                <ChildGrid relation={relation}
                    models={models}
                    parentFilters={parentFilters}
                    parent={parent}
                    where={where}
                />

                // </TabPanel>
            ))}
        </TabContext>
    );
};

export default Relations;
