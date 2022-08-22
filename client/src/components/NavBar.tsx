import * as React from 'react';
import { List, ListItemButton, ListItemText, Box, Avatar, Grid, Typography } from '@mui/material';


// #5CDB95 - main
// #05386B - Interaction and contrast
// #EDF5E1 - Text of main

const variants = [
    {title: 'Главная', path: '/Home'},
    {title: 'Мой класс', path: '/MyClass'},
    {title: 'Предметы', path: '/Subjects'}
]


function Navigation() {
    return (
        <Grid container direction='row'>
            <List>
                <Grid item>
                    <ListItemButton>
                        <ListItemText></ListItemText>
                    </ListItemButton>
                </Grid>
                <Grid item>
                    <ListItemButton>
                        <ListItemText>Мой класс</ListItemText>
                    </ListItemButton>
                </Grid>
                <Grid item>
                    <ListItemButton>
                        <ListItemText>Предметы</ListItemText>
                    </ListItemButton>
                </Grid>
            </List>
        </Grid>
    )
}


function UserSection() {
    return (
        <Grid container>
            <Grid item>
                <Avatar></Avatar>
            </Grid>
            <Grid item>
                <Typography>Username</Typography>
            </Grid>
        </Grid>
        
    )
}


export function NavBar(props: any) {
    return (
        <Grid container direction='column'>
            <Grid item>
                <Box sx={{width: '100%', backgroundColor: '#5CDB95', color: '#EDF5E1'}}>
                    <Grid container direction='row'>
                        <Grid item>
                            <UserSection />
                        </Grid>
                        <Grid item>
                            <Navigation />
                        </Grid>
                    </Grid>
                    
                </Box>
            </Grid>
            <Grid item>
                {props.children}
            </Grid>
        </Grid>
    )
}