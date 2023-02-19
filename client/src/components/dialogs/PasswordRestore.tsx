import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { AuthService, UserService } from '../../http/userAPI';
import { IUser } from '../../models/user.model';


interface DialogProps {
    open: boolean;
    onClose: () => void;
    user: IUser;
}


export function PasswordRestoreDialog(props: DialogProps) {
    const [value, setValue] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [repeatPassword, setRepeatPassword] = React.useState<string>('');
    const [error, setError] = React.useState<boolean>(false);
    const [emailError, setEmailError] = React.useState<boolean>(false);

    const hideEmail = () => {
        let response = '';
        const parts = props.user.UserEmail.split('@');
        for (let i = 0; i < parts[0].length - 2; i++) {
            response += '*'
        }
        response += parts[0].charAt(parts[0].length - 2);
        response += parts[0].charAt(parts[0].length - 1);
        response += parts[1];
        return response;
    }
    
    const handleClose = () => {
        props.onClose();
    }

    const handleSubmit = () => {
        if (newPassword !== repeatPassword) {
            setError(true);
            return;
        }
        setError(false);
        if (validate()) {
            AuthService.changePasswordWithoutValidation(props.user.id, newPassword)
        }
        props.onClose();
    }

    const validate = () => {
        return value === props.user.UserEmail;
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Восстановление пароля</DialogTitle> 
            <DialogContent>
                <Typography>Мы отправили код на почту: {hideEmail()}</Typography>
                <TextField error={emailError}
                            helperText={emailError ? 'Неверный Email' : ''}
                            placeholder='Введите вашу почту...'
                            value={value}
                            onChange={e => setValue(e.target.value)}></TextField>
                <TextField error={error}
                            helperText={error ? 'Пароли не сочетаются' : ''}
                            placeholder='Введите новый пароль...'
                            value={value}
                            onChange={e => setValue(e.target.value)}></TextField>
                <TextField error={error}
                            helperText={error ? 'Пароли не сочетаются' : ''}
                            placeholder='Повторите новый пароль...'
                            value={value}
                            onChange={e => setValue(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSubmit}>Ок</Button>
            </DialogActions>
        </Dialog>
    )
}