import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';


export function Footer(props: any) {
    return (
        <Box sx={{backgroundColor: 'gray', color: 'white', width: '100%', height: '20vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography>© Egor Kuzin - all rights are reserved</Typography>
        </Box>
    )
}