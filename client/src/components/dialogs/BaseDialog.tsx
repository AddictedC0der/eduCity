import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';


interface BaseDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title?: string;
    children?: React.ReactNode;
    controlsNode?: React.ReactNode;
}

export function BaseDialog(props: BaseDialogProps) {
    const handleCancel = () => {
        props.onSubmit ? props.onSubmit() : null;
        props.onClose();
    }

    const handleSubmit = () => {
        props.onClose()
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth='md'
                PaperProps={{sx: {height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}}>
            <DialogTitle sx={{color: 'secondary.contrastText'}}>{props.title ?? ''}</DialogTitle>
            <DialogContent sx={{marginTop: '5%', width: '90%', height: '100%'}}>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.controlsNode ? props.controlsNode : (
                    <Box>
                        <Button variant='contained' onClick={handleCancel}>Отмена</Button>
                        <Button variant='contained' onClick={handleSubmit}>Ок</Button>
                    </Box>
                    
                )}
            </DialogActions>
        </Dialog>
    )
}