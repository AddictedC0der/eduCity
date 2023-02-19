import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import * as React from 'react';


interface DialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    content: string;
    title: string;
}


export function AreYouSureDialog(props: DialogProps) {
    const handleClose = () => {
        props.onClose();
    }

    const handleSubmit = () => {
        props.onSubmit();
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle> 
            <DialogContent>
                <Typography>{props.content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSubmit}>Ок</Button>
            </DialogActions>
        </Dialog>
    )
}