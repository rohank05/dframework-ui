import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * DialogComponent is a reusable dialog/modal component based on Material-UI's Dialog.
 *
 * @param {Object} props - The props for the DialogComponent.
 * @param {boolean} props.open - Controls whether the dialog is open.
 * @param {function} props.onConfirm - Callback fired when the confirm/ok button is clicked.
 * @param {string} [props.title="Confirm"] - The title of the dialog.
 * @param {function} props.onCancel - Callback fired when the cancel button or dialog close is triggered.
 * @param {string} [props.okText] - Custom text for the confirm/ok button.
 * @param {string} [props.cancelText] - Custom text for the cancel button.
 * @param {boolean} [props.yesNo=false] - If true, uses "Yes"/"No" for button texts instead of "Ok"/"Cancel".
 * @param {React.ReactNode} props.children - The content of the dialog.
 * @param {string} [props.maxWidth='sm'] - The maxWidth of the dialog (xs, sm, md, lg, xl).
 * @param {boolean} [props.fullWidth=true] - If true, the dialog stretches to the full width of its container.
 * @param {Object} [props.props] - Additional props passed to the MUI Dialog component.
 * @returns {JSX.Element} The rendered Dialog component.
 */

const DialogComponent = ({ open, onConfirm, title = "Confirm", onCancel, okText, cancelText, yesNo = false, children, maxWidth = 'sm', fullWidth = true, ...props }) => {
    okText = okText || (yesNo ? 'Yes' : 'Ok');
    cancelText = cancelText || (yesNo ? 'No' : 'Cancel');
    return (
        <Dialog
            {...props}
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
        >
            <DialogTitle id="alert-dialog-title" >
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            {(onCancel || onConfirm) && (
                < DialogActions >
                    {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
                    {onConfirm && <Button onClick={onConfirm} autoFocus>{okText}</Button>}
                </DialogActions>
            )}
        </Dialog >
    )
}
export { DialogComponent }
