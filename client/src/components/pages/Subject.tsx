import * as React from 'react';
import { Typography, Box, Tabs, Tab, Stack, Paper, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener, GridRowsProp } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserAgreementDialog } from '../dialogs/UserAgreement';
import { MainLayout } from '../layouts/MainLayout';
import { RoutesEnum } from '../../router';
import { ConstructorService } from '../../http/constructorAPI';
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
                <Stack>
                    {classes.map(cls =>
                        <Accordion expanded={expanded === `panel-${cls}`}
                                    onChange={handleChangeExpanded(`panel-${cls}`)}
                                    sx={{width: '100%', height: '5vh', marginTop: '5%', backgroundColor: 'gray'}}
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
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ConstructorService.getAllWorks();
            console.log(data.data)
            setList(data.data)
        }

        fetchData()
    }, [])

    

    const navigate = useNavigate()

    const handleDialogClose = () => {
        setOpen(false)
        navigate(RoutesEnum.TASK_CONSTRUCTOR)
    }

    const columns: GridColDef[] = [
        {field: 'index', headerName: '№', flex: 0.1},
        {field: 'name', headerName: 'Название', flex: 0.3},
        {field: 'author', headerName: 'Автор', flex: 0.2},
        {field: 'class', headerName: 'Класс', flex: 0.2},
        {field: 'difficulty', headerName: 'Сложность', flex: 0.2},
    ]

    //@ts-ignore
    const rows: GridRowsProp = list.map(e => {return {id: e.id, index: e.id, name: e.Name, author: 'Me', class: e.Class, difficulty: e.Difficulty}})

    // const rows: GridRowsProp = [
    //     {id: 1, index: '1', name: 'Demo1', author: 'Me', class: '8', difficulty: '4'},
    //     {id: 2, index: '2', name: 'Demo2', author: 'Me', class: '2', difficulty: '2'},
    //     {id: 3, index: '3', name: 'Demo3', author: 'Me', class: '10', difficulty: '9'},
    //     {id: 4, index: '4', name: 'Demo4', author: 'Me', class: '4', difficulty: '10'},
    //     {id: 5, index: '5', name: 'Demo5', author: 'Me', class: '6', difficulty: '1'},
    // ]

    const handleClick: GridEventListener<'rowClick'> = (params, event, details) => {
        console.log(params)
        console.log(event)
        console.log(details)
        navigate(`${RoutesEnum.TASK_VIEW}?id=${params.id}`)
    }

    return (
        <>
        {value === index && (
            <Box sx={{width: '100%', height: '100%'}}>
                <Button variant='contained' sx={{marginTop: '2%'}} onClick={e => setOpen(true)}>Добавить задание</Button>
                <DataGrid onRowClick={handleClick} rows={rows} columns={columns} sx={{marginTop: '2%', height: '100%'}} />
                <UserAgreementDialog open={open} onClose={handleDialogClose} />
            </Box>
        )}
        </>
    )
}


export function Subject() {
    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }

    const location = useLocation()

    return (
        <MainLayout paddingMain='ALL'>
            <Box sx={{display: 'flex', flexDirection: 'column', JustifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
                <Typography variant='h3'>Русский язык</Typography>
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