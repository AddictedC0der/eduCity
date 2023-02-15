import { Box, Typography, Rating, Link, Button } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IRealSchool, ISchool, ISchoolDto } from '../../models/school.model';
import { MainLayout } from '../layouts/MainLayout';


export function School() {
    const location = useLocation();
    const data = (location.state as {school: IRealSchool}).school;
    const user = useTypedSelector(state => state.user);

    const isAdmin = data.Admins.find(admin => admin.id === user.user.user.id) ? true : false;

    const handleNavigateToSite = (link: string) => {
        window.location.replace('http://' + link);
    }

    return (
        <MainLayout paddingMain='ALL'>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100vh'}}>
                <Box sx={{width: '50%'}}>

                </Box>
                <Box sx={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button variant='contained'>Редактировать</Button>
                        <Button sx={{backgroundColor: 'red'}} variant='contained'>Удалить</Button>
                    </div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Typography variant='h2'>{data.SchoolName}</Typography>
                        <Typography variant='h5'>{data.Address}</Typography>
                        <Link href={data.Link} variant='h4'>{data.Link}</Link>
                        <Rating value={data.Rating} precision={0.5} readOnly />
                    </div>
                </Box>
                
            </Box>
        </MainLayout>
    )
}