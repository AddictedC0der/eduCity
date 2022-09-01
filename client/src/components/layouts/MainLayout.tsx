import * as React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';

type MainLayoutProps = {
    children: React.ReactNode
}


export function MainLayout(props: MainLayoutProps) {
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

    return (
        <NavBar>
            {warningLabel}
            <Box sx={{width: '100%', height: '100%', padding: '5%'}} aria-label='MainLayoutBox'>
                {props.children}
            </Box>
        </NavBar>
    )
}