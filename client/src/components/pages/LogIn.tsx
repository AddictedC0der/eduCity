import * as React from 'react';
import { Box, Typography, Paper, Container, CssBaseline, TextField, Button, Link, Slide } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { IUserLogin } from '../../models/user.model';
import { PasswordRestoreDialog } from '../dialogs/PasswordRestore';


interface LoginProps {
    slide: boolean
    restoreSlide: () => void;
}


export function LogIn(props: LoginProps) {
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        document.title = 'Вход в аккаунт | EduCity';
    }, [])

    const { login } = useActions()
    const navigate = useNavigate();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const dto: IUserLogin = {
            UserLogin: data.get('login') as string,
            UserPassword: data.get('password') as string
        }
        login(dto.UserLogin, dto.UserPassword)
    }

    return (
        <Slide direction='left' in={props.slide} mountOnEnter unmountOnExit>
            <Paper sx={{marginTop: '10%',
                        width: '50%',
                        minHeight: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        boxShadow: '-1px 4px 57px 40px rgba(34, 60, 80, 0.2)'}}>
                <Typography sx={{color: '#f6f6f6'}} component='h1' variant='h5'>Вход в аккаунт</Typography>
                <Box component='form' onSubmit={onSubmit} sx={{mt: 1, px: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField
                        sx={{input: {color: '#f6f6f6'}}}
                        margin='normal'
                        required
                        fullWidth
                        id='login'
                        label='Ваше имя'
                        name='login'
                        autoComplete='off'
                        autoFocus />
                    <TextField
                        sx={{input: {color: '#f6f6f6'}}}
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Ваш пароль'
                        name='password'
                        type='password'
                        autoComplete='password' />
                    <Button>Забыли пароль?</Button>
                    <Button type='submit' variant='contained' fullWidth>Войти</Button>
                    <Link onClick={props.restoreSlide}>Нет аккаунта?</Link>
                </Box>
            </Paper>
        </Slide>

    )
}