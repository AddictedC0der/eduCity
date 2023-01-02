import * as React from 'react';
import { Typography } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';


export function ErrorPage() {
    return (
        <MainLayout paddingMain='ALL'>
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant='h2'>Error 404</Typography>
                <Typography>Этой страницы не существует</Typography>
            </div>
        </MainLayout>
    ) 
    
}