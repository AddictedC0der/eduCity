import { Grid, Typography, Box, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import * as React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import subjects from '../../Assets/subjects.json'
import { useNavigate } from 'react-router-dom';


function SubjectBox(props: {title: string, path: string}) {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate(props.path, {state: {subject: props.title}})} sx={{backgroundColor: 'primary.light', color: 'white',
                width: '10vw', height: '10vw',
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

const subjectsList2 = subjects.Groups.map(group => {return {
    Title: group.Title,
    Contents: group.Contents.map(sbj => {return (
        <SubjectBox title={`${sbj.Name}`} path={sbj.Path} />
    )})
}})


export function Subjects() {
    React.useEffect(() => {
        document.title = 'Предметы | EduCity';
    }, [])
    console.log(subjectsList)
    return (
        <MainLayout paddingMain='ALL'>
            <div>
            <Typography variant='h4' sx={{marginBottom: '5%'}}>Предметы</Typography>
            {subjectsList2.map(e => {return (
                <Accordion>
                    <AccordionSummary>
                        <Typography>{e.Title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', columnGap: '5%', rowGap: '5%'}}>
                        {e.Contents}
                    </AccordionDetails>
                </Accordion>
            )})}
            </div>
        </MainLayout>
    )
}