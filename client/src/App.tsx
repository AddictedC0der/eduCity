import * as React from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material'
import SignUp from './components/pages/SignUp';
import './App.css';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { CoreRouter } from './components/CoreRouter';


export default function App() {
    const { refreshAuth } = useActions();
    const { user, isLoading, isAuth, error } = useTypedSelector(state => state.user);

    console.log(isAuth)
    console.log(user)
    console.log('Started!');

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            refreshAuth();
        }
    }, [])

    return (
        <>
        {isLoading ?
            <Box>
                <Grid container direction='column' alignItems='center' justifyContent='center' sx={{height: '100%'}}>
                    <Grid container item xs={12} justifyContent='center' alignItems='center'>
                        <Typography>Подождите!</Typography>
                        <CircularProgress></CircularProgress>
                    </Grid>
                    
                </Grid> 
            </Box>
            : <>
                <CoreRouter />
            </>
        }
        </>
    )
}