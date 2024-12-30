import React, {
  memo,
  useState
} from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { UiModel } from "../Grid/ui-models";
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
  const modelConfigOfChildGrid = models.find(
    (model) => model.name === relation
  );
  if (!modelConfigOfChildGrid) return null;
  const config = { ...modelConfigOfChildGrid, hideBreadcrumb: true };
  const ChildModel = config instanceof UiModel ? config : new UiModel(config);
  if (!ChildModel) return null;

  return (
    <ChildModel.ChildGrid
      parentFilters={parentFilters}
      parent={parent}
      model={config}
      where={where}
      isChildGrid={true}
    />
  );
});

const Relations = ({ relations, parent, where, models, relationFilters }) => {
  const [activeTab, setActiveTab] = useState(relations[0]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <TabContext value={activeTab}>
      <Box>
        <TabList
          onChange={handleChange}
        >
          {relations.map((relation) => {
            const modelConfigOfChildGrid = models.find(
              (model) => model.name === relation
            ) || {};
            const label = modelConfigOfChildGrid.listTitle || modelConfigOfChildGrid.title || "";
            return (
              <Tab
                key={relation}
                label={label}
                value={relation}
              />
            )
          })}
        </TabList>
      </Box>
      {relations.map((relation) => (
        <TabPanel
          sx={{ padding: 0 }}
          value={relation}
          key={relation}
        >
          <ChildGrid
            relation={relation}
            key={relation}
            models={models}
            parentFilters={relationFilters[relation] || []}
            parent={parent}
            where={where}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default Relations;
