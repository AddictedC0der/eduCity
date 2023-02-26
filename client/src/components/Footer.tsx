import * as React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';


export function Footer(props: any) {
    const theme = useTheme()
    
    return (
        <Box sx={{backgroundColor: '#123740', color: theme.palette.primary.contrastText, width: '100%', height: '20vh', marginTop: 'auto',
            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography>© Egor Kuzin - all rights are reserved</Typography>
        </Box>
    )
}