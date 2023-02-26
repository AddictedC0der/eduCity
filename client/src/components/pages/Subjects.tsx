import { Grid, Typography, Box, Button } from '@mui/material';
import * as React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import subjects from '../../Assets/subjects.json'
import { useNavigate } from 'react-router-dom';


function SubjectBox(props: {title: string, path: string}) {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate(props.path, {state: {subject: props.title}})} sx={{backgroundColor: 'primary.light', color: 'white', width: '90%', height: '10vh',
                '&:hover': {backgroundColor: '#f8a638'}}}>
            <Typography>{props.title}</Typography>
        </Button>
    )
}


const subjectsList = subjects.Groups.map(group => {return (
    <Box key={`${group.Title}`} sx={{width: '100%'}} aria-label='SubjectGroupBox'>
        <Typography variant='button'>{group.Title}</Typography>
        <Grid container item direction='row' aria-label='SubjectsGroupGrid' spacing={1} columns={3}>
            {group.Contents.map(sbj => {return (
                <Grid item key={`${sbj.Name}`} width='40%' height='80%' aria-label='SubjectBoxGrid'>
                    <SubjectBox title={`${sbj.Name}`} path={sbj.Path} />
                </Grid>
            )})}
        </Grid>
    </Box>
    )
})


export function Subjects() {
    React.useEffect(() => {
        document.title = 'Предметы | EduCity';
    }, [])

    return (
        <MainLayout paddingMain='ALL'>
            <Grid container direction='column' sx={{width: '100%'}} rowGap={4} aria-label='SubjectsMainGrid'>
                {subjectsList}
            </Grid>
        </MainLayout>
    )
}