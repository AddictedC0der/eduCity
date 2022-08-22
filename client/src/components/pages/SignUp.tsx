import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid, CssBaseline, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { IUserDto } from '../../models/user.model';
import { useActions } from '../../hooks/useActions';


type Role = {name: string, label: string}


export default function SignUp() {
    const roles: Role[] = [
        {name: 'Student', label: 'Ученик' },
        {name: 'Teacher', label: 'Учитель'},
        {name: 'Parent', label: 'Родитель'}
    ]

    const [role, setRole] = React.useState<Role>(roles[0]);
    const { register } = useActions();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const dto: IUserDto = {
            UserLogin: data.get('login') as string,
            UserPassword: data.get('password') as string,
            UserEmail: data.get('email') as string,
            UserRole: role.name
        }
        console.log(dto);
        register(dto);
    }

    const handleChangeRole = (event: React.MouseEvent<HTMLElement>, newRole: Role | null) => {
        console.log(newRole)
        if (newRole) {
            setRole(newRole);
        }
    }

    return (
        <Box sx={{backgroundColor: 'blue', maxHeight: '100vh', width: '100%'}}>
            <Container component='main' sx={{maxWidth: '100%'}}>
                <CssBaseline />
                <Paper sx={{marginTop: '10%', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5}}>
                    <Typography component='h1' variant='h5'>Регистрация</Typography>
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
                            id='email'
                            label='Ваша почта'
                            name='email'
                            autoComplete='email' />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='password'
                            label='Ваш пароль'
                            name='password'
                            type='password'
                            autoComplete='password' />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='password-check'
                            label='Повтор пароля'
                            name='password-check'
                            type='password' />
                        <ToggleButtonGroup value={role} onChange={handleChangeRole} sx={{my: 3}} exclusive>
                            <ToggleButton value={roles[0]}>Ученик</ToggleButton>
                            <ToggleButton value={roles[1]}>Учитель</ToggleButton>
                            <ToggleButton value={roles[2]}>Родитель</ToggleButton>
                        </ToggleButtonGroup>
                        <Button type='submit' variant='contained' fullWidth>Зарегестрироваться</Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}