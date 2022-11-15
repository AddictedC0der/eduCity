import * as React from 'react';
import { List, ListItemButton, ListItemText, Box, Avatar, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

// #5CDB95 - main
// #05386B - Interaction and contrast
// #EDF5E1 - Text of main

const variants = [
    {title: 'Главная', path: '/home'},
    {title: 'Мой класс', path: '/my_class'},
    {title: 'Предметы', path: '/subjects'}
]


function Navigation() {
    const navigate = useNavigate()
    return variants.map(variant => (
        <ListItemButton key={variant.title} onClick={() => {navigate(variant.path)}}>
            <ListItemText sx={{fontWeight: 'bold'}}>{variant.title}</ListItemText>
        </ListItemButton>
    ))
}


function UserSection() {
    return (
        <Grid container direction='column' alignItems='center' width='30%' aria-label='UserSectionMainGrid'>
            <Grid item xs={4} aria-label='UserAvatarGrid'>
                <Avatar></Avatar>
            </Grid>
            <Grid item xs={8} aria-label='UserNameGrid'>
                <Typography variant='h6'>Username</Typography>
            </Grid>
        </Grid>
    )
}


export function NavBar(props: any) {
    return (
            <Grid container item sx={{ backgroundColor: '#5CDB95', width: '100%'}} aria-label='HeaderMainGrid'>
                <Box sx={{color: '#EDF5E1', padding: '1%', width: '100vw'}} aria-label='NavBarBox'>
                    <Grid container item direction='row' aria-label='NavBarGrid'>
                        <Grid item aria-label='UserSectionGrid'>
                            <UserSection />
                        </Grid>
                        <Grid item aria-label='NavigationListGrid'>
                            <List>
                                <Grid container direction='row' aria-label='NavigationGrid'>
                                    {Navigation()}
                                </Grid>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
    )
}