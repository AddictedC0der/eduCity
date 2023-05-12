import * as React from 'react';
import { Typography, Box, Tabs, Tab, Stack, Paper, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener, GridRowsProp } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserAgreementDialog } from '../dialogs/UserAgreement';
import { MainLayout } from '../layouts/MainLayout';
import { RoutesEnum } from '../../router';
import { ConstructorService } from '../../http/constructorAPI';
import { SubjectService } from '../../http/subjectsAPI';
import { TimePicker } from '../complex/TimePicker';


interface TabProps {
    value: number;
    index: number;
}


function CoursesTab(props: TabProps) {
    const { value, index } = props;

    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeExpanded = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    const classes = ['1 класс', '2 класс', '3 класс', '4 класс', '5 класс',
        '6 класс', '7 класс', '8 класс', '9 класс', '10 класс', '11 класс']

    return (
        <>
        {value === index && (
            <Box sx={{width: '100%', paddingTop: '2%'}}>
                <Button variant='contained' onClick={() => navigate(RoutesEnum.THEORY_CONSTRUCTOR)}>Добавить курс</Button>
                <Stack sx={{marginTop: '1%'}}>
                    {classes.map(cls =>
                        <Accordion expanded={expanded === `panel-${cls}`}
                                    onChange={handleChangeExpanded(`panel-${cls}`)}
                                    sx={{width: '100%', height: '5vh'}}
                                    key={cls}>
                            <AccordionSummary>
                                <Typography>{cls}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{marginBottom: '1vh'}}>
                                <Stack>
                                    <Typography>Course 1</Typography>
                                    <Typography>Course 2</Typography>
                                    <Typography>Course 3</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Stack>
            </Box>
        )}
        </>
    )
}

function TasksTab(props: TabProps) {
    const { value, index } = props;

    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState([]);
    const location = useLocation()

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await SubjectService.getSubjectWorks((location.state as {subject: string}).subject);
            console.log(data.data)
            setList(data.data)
        }

        fetchData()
    }, [])

    
    const navigate = useNavigate()

    const handleDialogClose = (confirm: boolean) => {
        setOpen(false);
        if (confirm) navigate(RoutesEnum.TASK_CONSTRUCTOR);
    }

    const columns: GridColDef[] = [
        {field: 'index', headerName: '№', flex: 0.1},
        {field: 'name', headerName: 'Название', flex: 0.3},
        {field: 'author', headerName: 'Автор', flex: 0.2},
        {field: 'class', headerName: 'Класс', flex: 0.2},
        {field: 'difficulty', headerName: 'Сложность', flex: 0.2},
    ]

    //@ts-ignore
    const rows: GridRowsProp = list.map(e => {return {id: e.id, index: e.id, name: e.Name, author: e.Author.UserLogin, class: e.Class, difficulty: `${e.Difficulty} / 10`}})

    const handleClick: GridEventListener<'rowClick'> = (params, event, details) => {
        navigate(`${RoutesEnum.TASK_VIEW}?id=${params.id}`)
    }

    return (
        <>
        {value === index && (
            <Box sx={{width: '100%', height: '100%'}}>
                <Button variant='contained' sx={{marginTop: '2%'}} onClick={e => setOpen(true)}>Добавить задание</Button>
                <DataGrid onRowClick={handleClick} rows={rows} columns={columns} sx={{marginTop: '2%', height: '90%'}} />
                <UserAgreementDialog open={open} onClose={handleDialogClose} />
            </Box>
        )}
        </>
    )
}


export function Subject() {
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        document.title = `${(location.state as {subject: string}).subject} | EduCity`;
    }, [])

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }

    const location = useLocation()

    return (
        <MainLayout paddingMain='ALL'>
            <Box sx={{display: 'flex', flexDirection: 'column', JustifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
                <Typography variant='h3'>{(location.state as {subject: string}).subject}</Typography>
                <Tabs value={tab} onChange={handleChangeTab} sx={{width: '100%'}}>
                    <Tab label='Курсы' />
                    <Tab label='Задания' />
                </Tabs>
                <CoursesTab value={tab} index={0} />
                <TasksTab value={tab} index={1} />
            </Box>
        </MainLayout>
        
    )
}