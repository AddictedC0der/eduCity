import * as React from 'react';
import { Box, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Masonry } from '@mui/lab';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import * as types from '../../models/layout.model';


type MainLayoutProps = {
    paddingMain: types.paddingMain;
    renderFooter?: boolean;
    children?: React.ReactNode;
}


export const MainLayout: React.FC<MainLayoutProps> = ({children, paddingMain, renderFooter}) => {
    const [warning, setWarning] = React.useState(true);

    renderFooter = renderFooter ?? true;

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

    const paddingValue: any = types.paddingConstants[paddingMain] //sx={{maxWidth: '100vw', minHeight: '98vh'}}
    return (
        // <Masonry sx={{display: 'flex', minHeight: '100vh'}} aria-label='MainGrid' columns={1} spacing={0}>
        <Box sx={{width: '100%', minHeight: '100vh'}}>
            <NavBar />
            <Grid container item sx={{width: '100%', boxSizing: 'border-box', marginTop: '5%', ...paddingValue}}>
                {children}
            </Grid>
            {renderFooter ? <Footer /> : null}
            {/* <Snackbar open={warning} onClose={hideWarning}>
                <Alert onClose={hideWarning} severity="warning">
                    У вас есть невыполненные задания!
                </Alert>
            </Snackbar> */}
        
        {/* </Masonry> */}
        </Box>
    )
}