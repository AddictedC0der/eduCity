import { Typography, Grid, Box, Paper, List, ListItemButton, Avatar, Drawer, ListItemIcon, ListItemText, IconButton, ListItem, TextField, Button, Autocomplete, Divider } from '@mui/material';
import * as React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Chat } from '../complex/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ClassService } from '../../http/classAPI';
import { IClass, IRealClass } from '../../models/class.model';
import { IUser, IUserDto } from '../../models/user.model';
import { CreateClassDialog } from '../dialogs/CreateClass';


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


interface MyClassProps {
    class: IRealClass;
}


function RenderMembersList(props: {members: IUser[]}) {
    const renderTeachersList = () => {
        return (
            props.members.map(member => {
                return (
                    member.Role === 'Teacher' ?
                    <ListItem key={member.UserLogin}>
                        <Typography>{member.UserLogin}</Typography>
                    </ListItem> : null
                )
            })
        )
    }

    const renderStudentsList = () => {
        return (
            props.members.map(member => {
                return (
                    member.Role === 'Student' ?
                    <ListItem key={member.UserLogin}>
                        <Typography>{member.UserLogin}</Typography>
                    </ListItem> : null
                )
            })
        )
    }

    return (
        <>
        {renderStudentsList()}
        <Divider />
        {renderTeachersList()}
        </>
    )
}


function MyClass(props: MyClassProps) {

    console.log(props)

    return (
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
                <List>
                    <RenderMembersList members={props.class.ContainedStudents.concat(props.class.ContainedTeachers)} />
                </List>
            </Grid>
        </Grid>
    )
}


interface FindClassProps {
    user: IUser;
}


function FindClass(props: FindClassProps) {
    const [search, setSearch] = React.useState<string>('');
    const [classes, setClasses] = React.useState<IClass[]>([]);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    const generateOptions = () => {
        return classes.map(e => {return {label: e.Name}});
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await ClassService.getAll()).data;
            setClasses(data);
        }
        fetchData()
    }, [])

    const renderCreateArea = () => {
        if (props.user.Role === 'Student') {
            return (
                <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant='h5'>Не нашли нужный класс? Создайте новый!</Typography>
                    <Button variant='contained' onClick={() => setOpenDialog(true)}>Создать класс</Button>
                </Box>
            )
        }
    }

    return (
        <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant='h4'>Найдите класс, в котором вы учитесь</Typography>
            <div style={{display: 'flex', flexDirection: 'row', width: 'inherit', alignItems: 'center', justifyContent: 'center'}}>
                <Autocomplete options={generateOptions()} sx={{width: '80%'}} value={{label: search}} onChange={(e, newValue) => setSearch(newValue?.label ?? '')} renderInput={(params) => <TextField {...params} />}></Autocomplete>
                <Button sx={{height: '100%'}} variant='contained'>Найти</Button>
            </div>
            {renderCreateArea()}
            <CreateClassDialog open={openDialog} onClose={() => setOpenDialog(false)} />
        </Box>
    )
}


export function MyClassPage() {
    const [drawersOpen, setDrawersOpen] = React.useState({
        toolbar: true,
        members: false
    })
    const [component, setComponent] = React.useState<JSX.Element>();

    const { user } = useTypedSelector(state => state.user);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await ClassService.findUserClass(user.user.id)).data;
            if (data.length) {
                setComponent(<MyClass class={data[0]} />);
                return data;
            }
            setComponent(<FindClass user={user.user} />);
            return data;
        }
        fetchData();
    }, [])

    return (
        <MainLayout paddingMain='TB'>
            {component}
        </MainLayout>
    )
}