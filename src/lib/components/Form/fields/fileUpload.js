import React, { useState } from "react";
import { Box, RadioGroup, FormControlLabel, Radio, TextField, Button, Typography, Tooltip, CircularProgress  } from "@mui/material";
import { useRouter, useStateContext } from "../../useRouter/StateProvider";
import { transport } from "../../Grid/httpRequest";
import { useSnackbar } from "../../SnackBar";
import utils from "../../utils";

const { errorMapping } = utils;

function FileUpload({ column, field, formik}) {
    let inputValue = formik.values[field] || "";
    const { stateData } = useStateContext();
    const { maxSize } = column;
    const { uploadApi, mediaApi, Url } = stateData?.gridSettings?.permissions;
    const [formState, setFormState] = useState({
        isExternal: "no",
        selectedFile: null,
    });
    const [loading, setLoading] = useState(false); // Add loading state
    const snackbar = useSnackbar();
    const { getParams, useParams } = useRouter();
    const { associationId } = useParams() || getParams;
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
            if (maxSize && file.size > maxSize * 1024 * 1024) {
                snackbar.showError(`File size exceeds the maximum limit of ${maxSize} MB.`);
                return;
            }
            setFormState((prev) => ({ ...prev, selectedFile: file }));
        }
    };

    const handleFileUpload = async () => {
        if (!formState.selectedFile) return;

        setLoading(true); // Start loading
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
                data: formData,
            });
            const data = response.data || {};
            if (!data.success) {
                snackbar.showError(data.message || "Upload failed");
                return;
            }
            const fileUrl = mediaApi + '/' + data.filePath;
            formik.setFieldValue(field, fileUrl);
        } catch (error) {
            const statusCode = (error.message.match(/status code (\d{3})/) || [])[1];
            snackbar.showError(errorMapping[statusCode]);
            console.error("Error uploading file: ", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const host = new URL(Url, window.location.origin).hostname.toLowerCase();
    React.useEffect(() => {
        setFormState({
            ...formState,
            isExternal: !inputValue.toLowerCase().includes(host) ? "yes" : "no",
        });
    }, [inputValue]);

    const isLengthExceded = formik.values[field]?.length > (column.max || 500);
    const colorScheme = isLengthExceded ? 'red' : '';

    return (
        <Box>
            {/* Radio group */}
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

            {/* Document link */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ width: "150px", marginRight: 2 }}>
                    Document Link
                </Typography>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {formState.isExternal === "yes" ? (
                        <TextField
                            fullWidth
                            value={inputValue}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: colorScheme },
                                    "&.Mui-focused fieldset": { borderColor: colorScheme },
                                    "&:hover fieldset": { borderColor: colorScheme },
                                },
                            }}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Enter external link"
                        />
                    ) : (
                        <TextField
                            fullWidth
                            value={inputValue}
                            placeholder="Link autopopulated once uploaded"
                            InputProps={{ readOnly: true }}
                        />
                    )}
                    {isLengthExceded && <Typography sx={{ color: 'red' }}>Maximum allowed length for the document link is {column.max} characters.</Typography>}
                </Box>
            </Box>

            {/* File upload */}
            {formState.isExternal === "no" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        disabled={loading} // Disable while loading
                    >
                        Choose File
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {formState.selectedFile && (
                        <Tooltip title={formState.selectedFile.name} arrow>
                            <Typography variant="body2">
                                {formState.selectedFile.name.length > 20
                                    ? `${formState.selectedFile.name.substring(0, 20)}...`
                                    : formState.selectedFile.name}
                            </Typography>
                        </Tooltip>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFileUpload}
                        disabled={!formState.selectedFile || loading} // Disable while loading
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Upload File"}
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default FileUpload;
