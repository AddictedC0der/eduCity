import { Typography, Grid, Box, Paper, List, ListItemButton, Avatar, Drawer, ListItemIcon, ListItemText, IconButton, ListItem } from '@mui/material';
import * as React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Chat } from '../complex/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';


interface DrawerListOption {
    icon: React.ReactNode;
    title: string;
}

const toolbarOptions: DrawerListOption[] = [
    {title: 'Все задания', icon: <AssignmentIcon />},
    {title: 'Покинуть класс', icon: <ExitToAppIcon />}
]


function DrawerList(options: DrawerListOption[]) {
    return (
        <List>
        {options.map(option => {return (
            <ListItemButton key={option.title}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.title} />
            </ListItemButton>
        )})}
        </List>
    )
}


export function MyClassPage() {
    const [drawersOpen, setDrawersOpen] = React.useState({
        toolbar: true,
        members: false
    })

    return (
        <MainLayout paddingMain='TB'>
            <Grid container direction='row' width='100%' height='80vh'>
                {/* <Grid item>
                    <Drawer open={drawersOpen.toolbar}>
                        <>
                            <IconButton><MenuIcon /></IconButton>
                        </>
                        {DrawerList(toolbarOptions)}
                    </Drawer>
                </Grid> */}
                <Grid item xs sx={{height: '100%'}}>
                    <Chat />
                </Grid>
                <Grid item xs={1} sx={{backgroundColor: 'blue', height:'100%'}}>

                </Grid>
            </Grid>
        </MainLayout>
    )
}