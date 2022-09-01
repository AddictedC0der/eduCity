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

    const lines = ['Выполняем квантовые рассчеты...', 'Ещё секундочку...', 'Интерполируем матрицы...', 'Загружаем ИИ...']

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            refreshAuth();
        }
    }, [])

    return (
        <>
        {isLoading ?
            <Box sx={{width: '100%', height: '100vh'}}>
                <Grid container direction='column' alignItems='center' justifyContent='center' sx={{height: '100%'}}>
                    <Grid container item xs={12} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Typography>{lines[getRandomInt(lines.length)]}</Typography>
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