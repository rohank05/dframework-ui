import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const buildTree = (data) => {
  if (!data) return {};
  const tree = {};
  data.forEach((item) => {
    if (item.ParentId && tree[item.ParentId]) {
      tree[item.ParentId].children.push({
        value: item.value.toString(),
        label: item.label
      });
    } else {
      tree[item.ParentId] = {
        label: item.ParentName,
        value: "Parent" + item.ParentId.toString(),
        children: [{
          value: item.value.toString(),
          label: item.label
        }]
      }
    }
  });
  return Object.values(tree);
};

export default function treeCheckBox({ column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) {
  const options = lookups ? lookups[column?.lookup] : [];
  const tree = buildTree(options);
  let inputValue = formik.values[field]?.length ? formik.values[field].split(", ") : [];
  let isDisabled;
  if (mode !== 'copy') {
    isDisabled = fieldConfigs?.disabled;
  }
  const handleChange = (event, newValue) => {
    formik.setFieldValue(field, newValue?.join(', ') || '');
  }
  return (
    <Box sx={{ minHeight: 352, minWidth: 290 }}>
      <SimpleTreeView
        selectedItems={inputValue}
        onSelectedItemsChange={handleChange}
        disabled={isDisabled}
        multiSelect
        checkboxSelection
      >
        {tree.map((node) => (
          <TreeItem key={node.value} itemId={node.value} label={node.label}>
            {node.children.map((child) => (
              <TreeItem key={child.value} itemId={child.value} label={child.label} />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  );
}
