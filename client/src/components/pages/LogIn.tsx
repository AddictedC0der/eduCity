import * as React from 'react';
import { Box, Typography, Paper, Container, CssBaseline, TextField, Button, Link } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { IUserLogin } from '../../models/user.model';


export function LogIn() {
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
        <Box sx={{backgroundColor: 'blue', maxHeight: '100vh', width: '100%'}}>
            <Container component='main' sx={{maxWidth: '100%'}}>
                <CssBaseline />
                <Paper sx={{marginTop: '10%', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5}}>
                    <Typography component='h1' variant='h5'>Вход в аккаунт</Typography>
                    <Box component='form' onSubmit={onSubmit} sx={{mt: 1, px: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='login'
                            label='Ваше имя'
                            name='login'
                            autoComplete='login'
                            autoFocus />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='password'
                            label='Ваш пароль'
                            name='password'
                            type='password'
                            autoComplete='password' />
                        <Button type='submit' variant='contained' fullWidth>Войти</Button>
                        <Link onClick={() => navigate('../register')}>Нет аккаунта?</Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}