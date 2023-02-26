import * as React from 'react';
import { Box, Typography, Grid, Button, useTheme } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../router';


function ResourcesBlock(props: {title: string, link: string}) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Button onClick={() => navigate(props.link)} sx={{backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText, width: '80%', height: '20vh',
            display: 'flex', justifyContent: 'center', alignItems: 'center', '&:hover': {backgroundColor: '#f8a638'}}}>
            <Typography>{props.title}</Typography>
        </Button>
    )
}


export function MainPage() {
    React.useEffect(() => {
        document.title = 'Главная | EduCity'
    }, [])

    return (
        <MainLayout paddingMain='ALL'>
            <Grid container direction='row' alignItems='center' justifyContent='center' height='80vh' width='100%'
                aria-label='ContentGrid'>
                <Grid container item xs={5} justifyContent='center'>
                    <ResourcesBlock link={RoutesEnum.RESOURCES} title='Лучшие ресуры для подготовки к ОГЭ и ЕГЭ' />
                </Grid>
                <Grid container item xs={5} justifyContent='center'>
                    <ResourcesBlock link={RoutesEnum.SUBJECTS} title='Решайте более 10000 задач разных предметов' />
                </Grid>
            </Grid>
        </MainLayout>
    )
}