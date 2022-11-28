import * as React from 'react';
import { Typography, Paper, Grid, Avatar, Box, FormControlLabel, Button } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';


export function UserAccount() {
    const { user } = useTypedSelector(state => state.user);
    const { logout } = useActions()
    console.log(user)
    return (
        <MainLayout paddingMain='ALL'>
            <Grid container sx={{height: '100vh', width: '100%'}} spacing={1}>
                <Grid container item xs={6} sx={{width: '100%', height: '100%'}} spacing={1}> 
                    <Grid item sx={{width: '100%', height: '50%'}}>
                        <Paper sx={{backgroundColor: 'blue', width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Box sx={{height: '100%', display: 'flex', direction: 'column', alignItems: 'center'}}>
                                <Avatar sx={{width: 200, height: 200}}></Avatar>
                                <Typography>Role {user.UserRole}</Typography>
                            </Box>
                            
                            <Box sx={{height: '90%'}}>
                                <Typography>Общие настройки</Typography>
                                <div>
                                    <Typography>Имя: {user.UserLogin}</Typography>
                                    <FormControlLabel control={<Button>Изменить</Button>} label='Пароль:' labelPlacement='start' />
                                    <Typography>Почта: {user.UserEmail}</Typography>
                                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <Button variant='contained'>Изменить</Button>
                                        <Button variant='contained' sx={{backgroundColor: 'red'}} onClick={() => logout()}>Выйти</Button>
                                        <Button variant='contained' sx={{backgroundColor: 'red'}}>Удалить</Button>
                                    </div>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item sx={{width: '100%', height: '50%'}}>
                        <Paper sx={{backgroundColor: 'blue', width: '100%', height: '100%'}}>
                        
                        </Paper>
                    </Grid>
                    
                </Grid>
                <Grid item xs={6} sx={{width: '100%', height: '100%'}}>
                    <Paper sx={{backgroundColor: 'red', width: '100%', height: '100%'}}>

                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    )
}