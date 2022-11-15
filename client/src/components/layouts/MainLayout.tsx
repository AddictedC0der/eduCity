import * as React from 'react';
import { Box, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Masonry } from '@mui/lab';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import * as types from '../../models/layout.model';


type MainLayoutProps = {
    paddingMain: types.paddingMain;
    children?: React.ReactNode;
}


export const MainLayout: React.FC<MainLayoutProps> = ({children, paddingMain}) => {
    const [warning, setWarning] = React.useState(true);

    const hideWarning = () => {
        setWarning(false);
    }

    const warningLabel = warning ? (
        <Box sx={{backgroundColor: 'orange', color: 'white', width: '100%', maxHeight: '5vh', minHeight: '5vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography sx={{fontWeight: 'bold'}}>У вас есть невыполненные задания</Typography>
            <Button sx={{color: 'white'}} onClick={hideWarning}>X</Button>
        </Box>)
    : null

    const paddingValue: any = types.paddingConstants[paddingMain]
    return (
        <Masonry sx={{maxWidth: '100vw', minHeight: '98vh'}} aria-label='MainGrid' columns={1} spacing={0}>
            <Grid container item width='100%'>
                <NavBar />
            </Grid>
            <Grid container item sx={{width: '100%', boxSizing: 'border-box', ...paddingValue}}>
                {children}
            </Grid>
            <Grid item width='100%'>
                <Footer />
            </Grid>
            <Snackbar open={warning} onClose={hideWarning}>
                <Alert onClose={hideWarning} severity="warning">
                    У вас есть невыполненные задания!
                </Alert>
            </Snackbar>
        </Masonry>
    )
}