import React from "react";
import { useFormik } from "formik";
import { useState, useEffect, createContext, useMemo } from "react";
import {
  getRecord,
  saveRecord,
  deleteRecord
} from "../Grid/crud-helper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormLayout from "./field-mapper";
import { useSnackbar } from "../SnackBar";
import { DialogComponent } from "../Dialog";
import { useStateContext, useRouter } from "../useRouter/StateProvider";
import actionsStateProvider from "../useRouter/actions";
import PageTitle from "../PageTitle";
import { getPermissions } from "../utils";
import Relations from "./relations";
export const ActiveStepContext = createContext(1);
const defaultFieldConfigs = {};

const Form = ({
  model,
  api,
  models,
  relationFilters = {},
  permissions = {},
  Layout = FormLayout,
  baseSaveData = {},
  sx,
  readOnly,
  beforeSubmit
}) => {
  const formTitle = model.formTitle || model.title;
  const { navigate, getParams, useParams, pathname } = useRouter();
  const { relations = [] } = model;
  const { dispatchData, stateData } = useStateContext();
  const params = useParams() || getParams;
  const { id: idWithOptions } = params;
  const id = idWithOptions?.split("-")[0];
  const searchParams = new URLSearchParams(window.location.search);
  const baseDataFromParams = searchParams.has('baseData') && searchParams.get('baseData');
  if (baseDataFromParams) {
    const parsedData = JSON.parse(baseDataFromParams);
    if (typeof parsedData === 'object' && parsedData !== null) {
      baseSaveData = { ...baseSaveData, ...parsedData };
    }
  }
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lookups, setLookups] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const snackbar = useSnackbar();
  const combos = {};
  const [validationSchema, setValidationSchema] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const url = stateData?.gridSettings?.permissions?.Url;
  const fieldConfigs = model?.applyFieldConfig
    ? model?.applyFieldConfig({ data, lookups })
    : defaultFieldConfigs;
  let gridApi = `${url}${model.api || api}`;
  const { mode } = stateData.dataForm;
  const userData = stateData.getUserData || {};
  const userDefinedPermissions = {
    add: true,
    edit: true,
    delete: true,
    ...model.permissions,
    ...permissions
  };
  const { canEdit } = getPermissions({
    userData,
    model,
    userDefinedPermissions
  });
  const { hideBreadcrumb = false, navigateBack } = model;

  const handleNavigation = () => {
    let navigatePath;

    if (typeof navigateBack === "function") {
      navigatePath = navigateBack({ params, searchParams, data });
    } else {
      navigatePath = typeof navigateBack === "string" ? navigateBack : pathname.substring(0, pathname.lastIndexOf("/"));
    }

    if (navigatePath.includes("window.history")) {
      window.history.back();
    }
    navigate(navigatePath);
  }

  const isNew = useMemo(() => [null, undefined, '', '0', 0].includes(id), [id]);

  const initialValues = useMemo(() => isNew
    ? { ...model.initialValues, ...data, ...baseSaveData }
    : { ...baseSaveData, ...model.initialValues, ...data }, [model.initialValues, data, id]);

  useEffect(() => {
    if (!url) return;
    setValidationSchema(model.getValidationSchema({ id, snackbar }));
    const options = idWithOptions?.split("-");
    const params = {
      api: api || gridApi,
      modelConfig: { ...model },
      setError: errorOnLoad
    };
    getRecord({
      ...params,
      id: options.length > 1 ? options[1] : options[0],
      setIsLoading,
      setActiveRecord
    });

  }, [id, idWithOptions, model, url]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      for (const key in values) {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
      }
      setIsLoading(true);
      saveRecord({
        id,
        api: gridApi,
        values: values,
        setIsLoading,
        setError: snackbar.showError,
      })
        .then((success) => {
          if (success) {
            if (model.reloadOnSave) {
              return window.location.reload();
            }
            const operation = id == 0 ? "Added" : "Updated";
            snackbar.showMessage(`Record ${operation} Successfully.`);
            handleNavigation();
          }
        })
        .catch((err) => {
          snackbar.showError(
            "An error occured, please try after some time.second",
            err
          );
          if (model.reloadOnSave) {
            resetForm();
          }
        })
        .finally(() => setIsLoading(false));
    }
  });

  const { dirty } = formik;

  const handleDiscardChanges = () => {
    formik.resetForm();
    setIsDiscardDialogOpen(false);
    handleNavigation();
  };

  const warnUnsavedChanges = () => {
    if (dirty) {
      setIsDiscardDialogOpen(true);
    }
  };

  const errorOnLoad = function (title, error) {
    snackbar.showError(title, error);
    handleNavigation();
  };

  const setActiveRecord = function ({ id, title, record, lookups }) {
    const isCopy = idWithOptions.indexOf("-") > -1;
    const isNew = !id || id === "0";
    const localTitle = isNew ? "Create" : isCopy ? "Copy" : "Edit";
    const localValue = isNew ? "" : record[model.linkColumn];
    const breadcrumbs = [{ text: model?.breadCrumbs }, { text: localTitle }];

    if (isCopy) {
      record[model.linkColumn] = "";
    }

    model.columns.forEach((item) => {
      if (item.skipCopy && isCopy) {
        record[item.field] = "";
      }
    })

    setData(record);
    setLookups(lookups);

    if (localValue !== "") {
      breadcrumbs.push({ text: localValue });
    }
    dispatchData({
      type: actionsStateProvider.PAGE_TITLE_DETAILS,
      payload: {
        showBreadcrumbs: true,
        breadcrumbs: breadcrumbs
      }
    });
  };
  const handleFormCancel = function (event) {
    if (dirty) {
      warnUnsavedChanges();
      event.preventDefault();
    } else {
      handleNavigation();
      event.preventDefault();
    }
  };
  const handleDelete = async function () {
    setIsDeleting(true);
    try {
      const response = await deleteRecord({
        id,
        api: api || model?.api,
        setIsLoading,
        setError: snackbar.showError,
        setErrorMessage
      });
      if (response === true) {
        snackbar.showMessage("Record Deleted Successfully.");
        handleNavigation();
      }
    } catch (error) {
      snackbar?.showError("An error occured, please try after some time.");
    } finally {
      setIsDeleting(false);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", pt: "20%", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  const handleChange = function (e) {
    const { name, value } = e.target;
    const gridData = { ...data };
    gridData[name] = value;
    setData(gridData);
  };

  const handleSubmit = function (e) {
    if (e) e.preventDefault();
    if(typeof beforeSubmit === 'function') {
      beforeSubmit({ formik });
    }
    const { errors } = formik;
    formik.handleSubmit();
    const fieldName = Object.keys(errors)[0];
    const errorMessage = errors[fieldName];
    if (errorMessage) {
      snackbar.showError(errorMessage, null, "error");
    }
    const fieldConfig = model.columns.find(
      (column) => column.field === fieldName
    );
    if (fieldConfig && fieldConfig.tab) {
      const tabKeys = Object.keys(model.tabs);
      setActiveStep(tabKeys.indexOf(fieldConfig.tab));
    }
  };

  const breadcrumbs = [
    { text: formTitle },
    { text: id === "0" ? "New" : "Update" }
  ];
  const showRelations = Number(id) !== 0 && Boolean(relations.length);
  const showSaveButton = searchParams.has("showRelation");
  const recordEditable = !("canEdit" in data) || data.canEdit;
  const readOnlyRelations = !recordEditable || data.readOnlyRelations;
  return (
    <>
      <PageTitle
        title={formTitle}
        showBreadcrumbs={!hideBreadcrumb}
        breadcrumbs={breadcrumbs}
        model={model}
      />
      <ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
        <Paper sx={{ padding: 2, ...sx }}>
          <form>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              mb={1}
            >
              {canEdit && recordEditable && !showSaveButton && !readOnly && (
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  onClick={handleSubmit}
                >{`${"Save"}`}</Button>
              )}
              <Button
                variant="contained"
                type="cancel"
                color="error"
                onClick={(e) => handleFormCancel(e)}
              >{`${"Cancel"}`}</Button>
              {permissions.delete && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsDeleting(true)}
                >{`${"Delete"}`}</Button>
              )}
            </Stack>
            <Layout
              model={model}
              formik={formik}
              data={data}
              fieldConfigs={fieldConfigs}
              combos={combos}
              onChange={handleChange}
              lookups={lookups}
              id={id}
              handleSubmit={handleSubmit}
              mode={mode}
            />
          </form>
          {errorMessage && (
            <DialogComponent
              open={!!errorMessage}
              onConfirm={clearError}
              onCancel={clearError}
              title="Info"
              hideCancelButton={true}
            >
              {" "}
              {errorMessage}
            </DialogComponent>
          )}
          <DialogComponent
            open={isDiscardDialogOpen}
            onConfirm={handleDiscardChanges}
            onCancel={() => setIsDiscardDialogOpen(false)}
            title="Changes not saved"
            okText="Discard"
            cancelText="Continue"
          >
            {"Would you like to continue to edit or discard changes?"}
          </DialogComponent>
          <DialogComponent
            open={isDeleting}
            onConfirm={handleDelete}
            onCancel={() => {
              setIsDeleting(false);
              setDeleteError(null);
            }}
            title={deleteError ? "Error Deleting Record" : "Confirm Delete"}
          >{`Are you sure you want to delete ${data?.GroupName || data?.SurveyName
            }?`}</DialogComponent>
          {showRelations ? (
            <Relations
              readOnly={readOnlyRelations}
              models={models}
              relationFilters={relationFilters}
              relations={relations}
              parentFilters={[]}
              parent={model.name || model.title || ""}
              where={[]}
            />
          ) : null}
        </Paper>
      </ActiveStepContext.Provider>
    </>
  );
};
export default Form;
