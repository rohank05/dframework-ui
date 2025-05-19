import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogComponent = ({
    open,
    onConfirm,
    title = "Confirm",
    onCancel,
    okText,
    cancelText,
    yesNo = false,
    children,
    maxWidth = 'sm',
    fullWidth = true,
    customActions = false,
    ...props
}) => {
    okText = okText ? okText : (yesNo ? 'Yes' : 'Ok');
    cancelText = cancelText ? cancelText : (yesNo ? 'No' : 'Cancel');
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
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#e0e0e0', mb: 2 }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            {!customActions && (
                <DialogActions>
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <Button onClick={onConfirm} autoFocus>{okText}</Button>
                </DialogActions>
            )}
        </Dialog>
    )
}
export { DialogComponent }
