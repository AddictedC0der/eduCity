import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { AuthService } from '../../http/userAPI';


interface DialogProps {
    open: boolean;
    onClose: () => void;
    oldPassword: string;
    userId: number;
}


export function UpdatePasswordDialog(props: DialogProps) {
    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [error, setError] = React.useState<boolean>(false);
    const [color, setColor] = React.useState<'success' | 'error' | 'secondary'>('secondary');

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

    const handleClose = () => {
        props.onClose();
    }

    const handleChange = async () => {
        const res = AuthService.changePassword(props.userId, {old: oldPassword, new: newPassword});
        if (res === null) {
            setColor('error');
            setError(true);
        } else {
            setColor('success');
            setError(false);
            await delay(1000);
            props.onClose();
        }
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Изменение пароля</DialogTitle> 
            <DialogContent>
                <TextField color={color} error={error} value={oldPassword} onChange={e => setOldPassword(e.target.value)} type='password' placeholder='Введите старый пароль...'></TextField>
                <TextField color={color} value={newPassword} onChange={e => setNewPassword(e.target.value)} type='password' placeholder='Введите новый пароль...'></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleChange}>Изменить</Button>
            </DialogActions>
        </Dialog>
    )
}