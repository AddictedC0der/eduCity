import * as React from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material'
import SignUp from './components/pages/SignUp';
import './App.css';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { CoreRouter } from './components/CoreRouter';
import { LoadingComponent } from './components/complex/Loading';


export default function App() {
    const { refreshAuth } = useActions();
    const { user, isLoading, isAuth, error } = useTypedSelector(state => state.user);

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            refreshAuth();
        }
    }, [])

    return (
        <>
        {isLoading ?
            <>
                
                <Box sx={{width: '100%', height: '100vh'}}>
                    <Grid container direction='column' alignItems='center' justifyContent='center' sx={{height: '100%'}}>
                        <Grid container item xs={12} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                            <LoadingComponent />
                        </Grid>
                    </Grid>
                </Box>
            </>
            : <>
                <CoreRouter />
            </>
        }
        </>
    )
}