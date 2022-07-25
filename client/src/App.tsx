import * as React from 'react';
import { Box, Grid } from '@mui/material'
import SignUp from './components/pages/SignUp';
import './App.css';


export default function App() {
    return (
        <Box sx={{backgroundColor: 'blue', height: '100vh', width: '100%'}}>
            <Grid container direction='column' alignItems='center' justifyContent='center' sx={{height: '100%'}}>
                <Grid container item xs={12} justifyContent='center' alignItems='center'>
                    <SignUp />
                </Grid>
                
            </Grid>
            
        </Box>
    )
}