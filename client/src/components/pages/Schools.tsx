import { Autocomplete, Box, Button, List, ListItem, Skeleton, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolService } from '../../http/schoolAPI';
import { ISchool, ISchoolDto } from '../../models/school.model';
import { CreateSchoolDialog } from '../dialogs/CreateSchool';
import { MainLayout } from '../layouts/MainLayout';


interface SchoolListProps {
    schools: ISchoolDto[];
}

function SchoolsList(props: SchoolListProps) {
    const navigate = useNavigate()

    return (
        <>
        {
        props.schools.length ?
        props.schools.map(school => { return (
            <ListItem key={school.SchoolName}>
                <Button sx={{width: '20%', height: '10vh', backgroundColor: 'rgb(200, 80, 20)', color: 'white', padding: '5%'}}
                        onClick={() => navigate(`/schools/${school.id}`, {state: {school: school}})}>
                    <Typography>{school.SchoolName}</Typography>
                </Button>
            </ListItem>)
        }) : 
        <div>
            <Typography>Мы не нашли ни одной школы</Typography>
        </div>
        
        }</>
    )
}


export function Schools() {
    const [search, setSearch] = React.useState<string>('');
    const [schools, setSchools] = React.useState<ISchoolDto[]>([]);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    const generateOptions = () => {
        return schools.map(e => {return e.SchoolName});
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await SchoolService.getAll()).data;
            setSchools(data);
        }
        fetchData();
    }, [])

    const navigate = useNavigate();

    const findSchool = () => {
        const result = schools.find(school => school.SchoolName === search);
        if (result) {
            navigate(`/schools/${result.id}`, {state: {school: result}});
        }
    }

    return (
        <MainLayout paddingMain='ALL'>
            <div style={{width: '100%', height: '100vh'}}>
                <Box sx={{width: 'inherit', height: '30%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Typography variant='h3'>Школы</Typography>
                    <div style={{width: '50%', display: 'flex', flexDirection: 'row'}}>
                    <Autocomplete
                            sx={{width: '80%'}}
                            value={selected}
                            inputValue={search}
                            onChange={(_, newValue) => setSelected(newValue ?? '')}
                            onInputChange={(_, newValue: string) => setSearch(newValue)}
                            options={generateOptions()}
                            renderInput={(params) => <TextField {...params} />} />
                    <Button variant='contained' onClick={findSchool}>Найти</Button>
                    </div>
                </Box>
                <Box sx={{width: 'inherit', height: '70%'}}>
                    <Button onClick={() => setOpenDialog(true)} variant='contained'>Создайте новую</Button>
                    <List>
                        <SchoolsList schools={schools} />
                    </List>
                </Box>
                <CreateSchoolDialog open={openDialog} onClose={() => setOpenDialog(false)} />
            </div>
        </MainLayout>
    )
}