import { Typography, Grid, Box, Paper, List, ListItemButton, Avatar, Drawer, ListItemIcon, ListItemText, IconButton, ListItem, TextField, Button, Autocomplete, Divider, Fab, Menu, MenuItem, Tabs, Tab } from '@mui/material';
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
import { AreYouSureDialog } from '../dialogs/AreYouSure';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../router';
import { UserService } from '../../http/userAPI';
import { TasksTable } from '../complex/TasksTable';
import { TooltipWrapper } from '../complex/Tooltip';


interface MyClassProps {
    classes: IRealClass[];
    user: IUser;
}


function RenderClassesList(props: {classes: IRealClass[], changeClass: React.Dispatch<React.SetStateAction<number>>;}) {
    // Left panel with classes buttons
    return (
        <>
        {
            props.classes.map((e, index) => {return (
                <ListItem key={e.Name} sx={{display: 'flex', justifyContent: 'center'}}>
                    <TooltipWrapper title={e.Name} placement='right'>
                        <Fab onClick={() => props.changeClass(index)}>{e.Name}</Fab>
                    </TooltipWrapper>
                    
                </ListItem>
            )})
        }
        </>
    )
}


function RenderMembersList(props: {members: IUser[]}) {
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchor);

    const navigate = useNavigate()

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchor(null);
    }

    const renderTeachersList = () => {
        return (
            props.members.map(member => {return (
                    member.Role === 'Teacher' ?
                    <ListItem key={member.UserLogin} sx={{padding: '0'}}>
                        <Button id={member.id.toString()} onClick={handleOpenMenu}>{member.UserLogin}</Button>
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
                    <ListItem key={member.UserLogin} sx={{padding: '0'}}>
                        <Button id={member.id.toString()} onClick={handleOpenMenu}>{member.UserLogin}</Button>
                    </ListItem> : null
                )
            })
        )
    }

    const redirectToProfile = (user: IUser) => {
        navigate(`/account/${user.id}`, {state: {user: user}})
    }

    const renderMenuOptions = () => {
        const fetchData = async (func: any) => {
            const id = anchor?.id
            if (id) {
                const targetUser = await (await UserService.getUserById(parseInt(id))).data
                func(targetUser);
            }
            return;
        }

        const decorator = (func: any) => {
            fetchData(func).then(() => {
                setAnchor(null);
            })
        }

        const options = [
            {label: 'Профиль', func: () => decorator(redirectToProfile), id: '1'}
        ]

        return (
            options.map(option => {return (
                <MenuItem key={option.id} onClick={option.func}>{option.label}</MenuItem>
            )})
        )
    }

    return (
        <Box sx={{height: '100%', width: '100%', paddingLeft: '5%', boxSizing: 'border-box'}}>
            <Typography sx={{width: '100%'}}>Ученики</Typography>
            {renderStudentsList()}
            <Typography sx={{width: '100%'}}>Учителя</Typography>
            {renderTeachersList()}
            <Menu
                id="basic-menu"
                anchorEl={anchor}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {renderMenuOptions()}
            </Menu>
        </Box>
    )
}


function TabPanel(props: {value: number, index: number, children?: React.ReactNode}) {
    return (
        <>
        {props.value === props.index && (
            <>
            {props.children}
            </>
        )}
        </>
    )
}


function MyClass(props: MyClassProps) {
    const [currentClass, setCurrentClass] = React.useState<number>(0);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
    const [currentTab, setCurrentTab] = React.useState<number>(0);

    const convertToClass = (realClass: IRealClass) => {
        const response: IClass = {...realClass, ContainedStudents: [], ContainedTeachers: [], School: realClass.School.id};
        realClass.ContainedStudents.map(e => response.ContainedStudents.push(e.id));
        realClass.ContainedTeachers.map(e => response.ContainedTeachers.push(e.id));
        return response;
    }

    const handleDeleteClass = async () => {
        const targetClass = await ClassService.getClassByName(props.classes[currentClass].Name);
        ClassService.deleteClass(targetClass.data.id);
    }

    const renderControlPanel = () => {
        if (props.user.Role === 'Teacher') {
            return (
                <>
                <Button variant='contained' onClick={() => setOpenDialog(true)}>Редактировать класс</Button>
                <Button sx={{backgroundColor: 'red', marginLeft: '3%'}} variant='contained' onClick={() => setOpenDeleteDialog(true)}>Удалить класс</Button>
                </>
            )
        }
    }
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%', maxHeight: '100%'}}>
            <Box sx={{height: '100%', width: '5%'}}>
                <List sx={{height: '100%'}}>
                    <RenderClassesList classes={props.classes} changeClass={setCurrentClass} />
                </List>
            </Box>
            <Box sx={{width: '95%', height: '100%', backgroundColor: '#e9ecef', borderRadius: '9px'}} aria-label='ClassArea'>
                <Box sx={{boxSizing: 'border-box', height: '5%', paddingLeft: '2%', width: '100%', borderBottom: '1px solid #f1802d', display: 'flex', alignItems: 'center'}}
                    aria-label='ClassInfoArea'>
                    <Typography sx={{marginRight: '5%'}}>
                        {props.classes[currentClass].Name} | {props.classes[currentClass].ContainedStudents.length + props.classes[currentClass].ContainedTeachers.length} участников
                    </Typography>
                    {renderControlPanel()}
                </Box>
                
                <Box sx={{display: 'flex', flexDirection: 'row', height: '95%', width: '100%'}} aria-label='ChatAndMemebersArea'>
                    <Box sx={{ height: '100%', width: '87%'}} aria-label='ChatArea'>
                        <Tabs value={currentTab} onChange={(_, newValue: number) => setCurrentTab(newValue)} aria-label='ClassTabs'>
                            <Tab label='Чат' />
                            <Tab label='Задания' />
                        </Tabs>
                        <TabPanel index={0} value={currentTab}>
                            <div style={{height: '95%'}}>
                                <Chat />
                            </div>
                        </TabPanel>
                        <TabPanel index={1} value={currentTab}>
                            <TasksTable masterClass={props.classes[currentClass]} />
                        </TabPanel>
                    </Box>
                    <Box sx={{height: '100%', width: '13%', backgroundColor: '#dee2e6'}} aria-label='MembersArea'>
                        <List sx={{overflow: 'auto', maxHeight: '100%', height: '100%', paddingBottom: '0', width: '100%'}} aria-label='MemebersList'>
                            <RenderMembersList members={props.classes[currentClass].ContainedStudents.concat(props.classes[currentClass].ContainedTeachers)} />
                        </List>
                    </Box>
                </Box>
            </Box>
        </Box>
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
        if (props.user.Role === 'Teacher') {
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
    const [component, setComponent] = React.useState<JSX.Element>();

    const { user } = useTypedSelector(state => state.user);
    
 
    React.useEffect(() => {
        document.title = 'Мой класс | EduCity';

        const fetchData = async () => {
            const data = await (await ClassService.findUserClass(user.user.id)).data;
            if (data.length) {
                setComponent(<MyClass classes={data} user={user.user} />);
                return data;
            }
            setComponent(<FindClass user={user.user} />);
            return data;
        }
        fetchData();
    }, [])

    return (
        <MainLayout paddingMain='NONE' renderFooter={false}>
            <div style={{maxHeight: '90vh', height: '90vh', width: '100%', overflow: 'hidden', boxSizing: 'border-box'}}>
                {component}
            </div>
        </MainLayout>
    )
}