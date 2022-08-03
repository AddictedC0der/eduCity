import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { AuthService } from '../../http/userAPI';


export default function SignUp() {

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');

    const onSubmit = () => {
        AuthService.register({login, password, email, role})
    }

    return (
        <Paper sx={{width: '35%', height: '70vh'}}>
            <Grid container direction='column' alignItems='center' justifyContent='space-evenly' sx={{height: '100%'}}>
                <Grid item>
                    <Typography variant='h4'>Sign up</Typography>
                </Grid>
                <Grid container item direction='column' alignItems='center' justifyContent='center' rowSpacing={2}>
                    <Grid item>
                        <TextField placeholder='Enter your name...'></TextField>
                    </Grid>
                    <Grid item>
                        <TextField placeholder='Enter your password...'></TextField>
                    </Grid>
                    <Grid item>
                        <TextField placeholder='Enter your email...'></TextField>
                    </Grid>
                    <Grid item>
                        <Button variant='contained'>Sign up</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}