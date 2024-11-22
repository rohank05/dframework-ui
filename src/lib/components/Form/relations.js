import React, {
    useState,
    //  useCallback, useEffect, useMemo 
} from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { useSearchParams } from 'react-router-dom';

import { UiModel } from '../Grid/ui-models';

const childGrid = ({
    relation,
    parentFilters,
    parent,
    where,
    models
}) => {
    const modelConfigOfChildGrid = models.find((model) => model.name === relation);
    if (!modelConfigOfChildGrid) return null;
    const ChildModel = new UiModel(modelConfigOfChildGrid);
    if (!ChildModel) return null;
    // return <div>hello</div>
    return <ChildModel.ChildGrid
    // return <ChildModel.Grid
        parentFilters={parentFilters}
        parent={parent}
        where={where}
    />;

}

const Relations = ({ relations, parentFilters, parent, where, models }) => {
    const [activeTab, setActiveTab] = useState(relations?.length ? relations[0] : null);
    // const { palette } = useTheme();

    if (!relations?.length) return null;
    // if (!relations?.length || !parentFilters) return null;

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    return (
        <TabContext value={activeTab}>
            <Box>
                <TabList
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
                >
                    {relations.map((relation) => (
                        <Tab
                            key={relation}
                            label={models.find((model) => model.name === relation)?.listTitle || "ModelLabel"}
                            value={relation}
                        // sx={{
                        //     color: "gray"
                        // }}
                        />
                    ))}
                </TabList>
            </Box>
            {relations.map((relation) => (
                <TabPanel sx={{ padding: 0 }} value={relation} key={relation}>
                    {childGrid({
                        relation,
                        models,
                        parentFilters,
                        parent,
                        where
                    })}
                    {/* <ChildGrid relation={relation}
                        models={models}
                        parentFilters={parentFilters}
                        parent={parent}
                        where={where} 
                    /> */}

                </TabPanel>
            ))}
        </TabContext>
    );
};

export default Relations;
