import * as React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';


function ResourcesBlock(props: {title: string}) {
    return (
        <Button sx={{backgroundColor: 'rgb(200, 80, 20)', color: 'white', width: '80%', height: '20vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            '&:hover': {backgroundColor: 'black'}}}>
            <Typography>{props.title}</Typography>
        </Button>
    )
}


export function MainPage() {

    return (
        <MainLayout>
            <Grid container direction='row' alignItems='center' justifyContent='center' height='80vh' width='100%'
                aria-label='ContentGrid'>
                <Grid container item xs={5} justifyContent='center'>
                    <ResourcesBlock title='Лучшие ресуры для подготовки к ОГЭ и ЕГЭ' />
                </Grid>
                <Grid container item xs={5} justifyContent='center'>
                    <ResourcesBlock title='Решайте более 10000 задач разных предметов' />
                </Grid>
            </Grid>
        </MainLayout>
    )
}