import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { NavBar } from '../NavBar';


type MainLayoutProps = {
    children: React.ReactNode
}


export function MainLayout(props: MainLayoutProps) {
    return (
        <NavBar>
            <Box sx={{width: '100%', height: '100%'}}>
                {props.children}
            </Box>
        </NavBar>
    )
}