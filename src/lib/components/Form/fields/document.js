import React, { useState } from "react";
import { Box, RadioGroup, FormControlLabel, Radio, TextField, Button, Typography } from "@mui/material";
import { useRouter, useStateContext } from "../../useRouter/StateProvider";
import { transport } from "../../Grid/httpRequest";
import { useSnackbar } from "../../SnackBar";

function Document({ column, field, fieldLabel, formik, lookups, data, otherProps, model, fieldConfigs, mode }) {
    let inputValue = formik.values[field] || "";
    const [formState, setFormState] = useState({
        isExternal: "no",
        selectedFile: null,
    });
    const snackbar = useSnackbar();
    const { stateData } = useStateContext();
    const uploadApi = stateData?.gridSettings?.permissions?.uploadApi;
    const mediaApi = stateData?.gridSettings?.permissions?.mediaApi;
    const { getParams, useParams } = useRouter();
    const { associationId, id: documentId } = useParams() || getParams;
    const showDownloadButton = Number(documentId) !== 0;
    const id = associationId?.split("-")[0] || 1;
    const handleRadioChange = (event) => {
        const isExternal = event.target.value;
        setFormState({
            ...formState,
            isExternal,
            selectedFile: null,
        });
        formik.setFieldValue(field, formik.values[field]); // Reset form field value
    };

    const handleInputChange = (value) => {
        formik.setFieldValue(field, value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormState((prev) => ({ ...prev, selectedFile: file }));
        }
    };

    const handleFileUpload = async () => {
        if (!formState.selectedFile) return;
        try {
            const formData = new FormData();
            formData.append("file", formState.selectedFile);
            formData.append("DocumentGroupId", formik.values.DocumentGroupId); // Doc group ID
            formData.append("AssociationId", id); // Association ID
            const response = await transport({
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'multipart/form-data' },
                url: uploadApi,
                data: formData
            });
            const data = response.data || {};
            if (!data.success) {
                snackbar.showError(data.message || "Upload failed");
                return;
            }
            const fileUrl = mediaApi + '/' + data.filePath;
            formik.setFieldValue(field, fileUrl);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleDownload = async () => {
        if (!inputValue) return;
        try {
            const response = await fetch(inputValue);
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileName = inputValue.split("/").pop() || `downloaded-file.${blob.type.split("/")[1] || "txt"}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the file:", error);
            snackbar.showError("Failed to download the file. Please try again.");
        }
    };


    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ width: "150px", marginRight: 2 }}>
                    External Link?
                </Typography>
                <RadioGroup
                    row
                    value={formState.isExternal}
                    onChange={handleRadioChange}
                    aria-label="is-external-link"
                    name="is-external-link"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ width: "150px", marginRight: 2 }}>
                    Document Link
                </Typography>
                {formState.isExternal === "yes" ? (
                    <TextField
                        fullWidth
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Enter external link"
                    />
                ) : (
                    <TextField
                        fullWidth
                        value={inputValue}
                        placeholder="Link autopopulated once uploaded"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                )}
            </Box>

            {formState.isExternal === "no" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Choose File
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {formState.selectedFile && (
                        <Typography variant="body2">{formState.selectedFile.name}</Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFileUpload}
                        disabled={!formState.selectedFile}
                    >
                        Upload File
                    </Button>
                </Box>
            )}

            {showDownloadButton && (
                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDownload}
                    >
                        Download Document
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Document;
