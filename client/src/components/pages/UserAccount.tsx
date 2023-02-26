import * as React from 'react';
import { Typography, Paper, Grid, Avatar, Box, FormControlLabel, Button, PaperProps, List, ListItem } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { AreYouSureDialog } from '../dialogs/AreYouSure';
import { UserService } from '../../http/userAPI';
import { UpdatePasswordDialog } from '../dialogs/UpdatePassword';
import { ClassService } from '../../http/classAPI';
import { IClass, IRealClass } from '../../models/class.model';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRealSchool } from '../../models/school.model';
import { IUser } from '../../models/user.model';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { SolutionService } from '../../http/solutionAPI';


interface TitledPanelProps {
    title: string;
    paperProps?: any;
    children?: React.ReactNode;
}


function TitledPanel(props: TitledPanelProps) {
    return (
        <Paper sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant='button'>{props.title}</Typography>
            </Box>
            <Box sx={props.paperProps}>
                {props.children}
            </Box>
        </Paper>
    )
}


export function UserAccount() {
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
    const [openPasswordDialog, setOpenPasswordDialog] = React.useState<boolean>(false);
    const [data, setData] = React.useState<IRealClass[]>();
    const [points, setPoints] = React.useState<number[]>([]);

    React.useEffect(() => {
        document.title = `${user.user.UserLogin} | EduCity`;

        const fetchData = async () => {
            const res = await (await ClassService.findUserClass(state.user.id)).data;
            setData(res);
            console.log(res);
        }

        const fetchStatsData = async () => {
            const response: number[] = [];
            const res = await (await SolutionService.getUserSolutions(state.user.id)).data;
            res.map((e: any) => {
                response.push(parseFloat(e.Rating));
            })
            setPoints(response);
        }
        fetchStatsData()
        fetchData();
    }, [])

    let { user } = useTypedSelector(state => state.user);
    const { logout } = useActions()
    const naviagte = useNavigate()
    const location = useLocation()
    const state = location.state as {user: IUser};

    const handleDeleteAccount = () => {
        UserService.deleteAccount(user.user.id);
    }

    const handleNavigateToSchool = (school: IRealSchool) => {
        naviagte(`/schools/${school.id}`, {state: {school: school}});
    }
    
    const renderControls = () => { return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', columnGap: 5, marginTop: '10%'}}>
            <Button variant='contained'>Изменить</Button>
            <Button variant='contained' sx={{backgroundColor: 'red'}} onClick={() => logout()}>Выйти</Button>
            <Button variant='contained' sx={{backgroundColor: 'red'}} onClick={() => setOpenDeleteDialog(true)}>Удалить</Button>
        </div>
    )
    }

    const formData = () => {
        let medium = 0;
        for (let i = 0; i < points.length; i++) {
            medium += points[i];
        }
        medium = medium / points.length;
        console.log([{name: 'Group A', value: medium}, {name: 'Group B', value: 1 - medium}])
        return [{name: 'Group A', value: medium}, {name: 'Group B', value: 1 - medium}]
    }
    
    return (
        <MainLayout paddingMain='ALL'>
            <Grid container sx={{height: '100vh', width: '100%'}} spacing={1}>
                <Grid container item xs={6} sx={{width: '100%', height: '100%'}} spacing={1}> 
                    <Grid item sx={{width: '100%', height: '50%'}}>
                        <TitledPanel title='Общие настройки' paperProps={{width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Avatar sx={{width: 200, height: 200}}></Avatar>
                                <Typography>{state.user.Role}</Typography>
                            </Box>
                            
                            <Box sx={{height: '90%'}}>
                                <Typography>Имя: {state.user.UserLogin}</Typography>
                                <FormControlLabel control={<Button onClick={() => setOpenPasswordDialog(true)}>Изменить</Button>} label='Пароль:' labelPlacement='start' />
                                <Typography>Почта: {state.user.UserEmail}</Typography>
                                {user.user.id === state.user.id ? renderControls() : <></>}
                            </Box>
                        </TitledPanel>
                            
                    </Grid>
                    <Grid item sx={{width: '100%', height: '50%'}}>
                        <TitledPanel title='Классы и школы' paperProps={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                            <List>
                                {data ? data.map(e => {return (
                                    <ListItem key={e.id}>
                                        <Button sx={{width: '100%'}}>
                                            {e.Name}
                                        </Button>
                                    </ListItem>
                                )}) : null}
                            </List>
                            <List>
                                {data ? data.map(e => {return (
                                    <ListItem key={e.id}>
                                        <Button onClick={() => handleNavigateToSchool(e.School)} sx={{width: '100%'}}>
                                            {e.School.SchoolName}
                                        </Button>
                                    </ListItem>
                                )}) : null}
                            </List>
                        </TitledPanel>
                    </Grid>
                    
                </Grid>
                <Grid item xs={6} sx={{width: '100%', height: '100%'}}>
                    <TitledPanel title='Статистика'>
                        <PieChart width={730} height={250}>
                            <Pie startAngle={180}
                                    endAngle={0}
                                    label
                                    data={formData()}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#f1802d">
                                {points.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f1802d' : '#123740'} />
                                ))}
                                <Label value='Средняя точность решения' position='outside' />
                            </Pie>
                        </PieChart>
                    </TitledPanel>
                </Grid>
            </Grid>
            <AreYouSureDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onSubmit={handleDeleteAccount}
                title='Внимание!'
                content='Вы уверены, что хотите удалить аккаунт?' />
            
            <UpdatePasswordDialog
                open={openPasswordDialog}
                onClose={() => setOpenPasswordDialog(false)}
                userId={user.user.id}
                oldPassword={user.user.UserPassword} />
        </MainLayout>
    )
}