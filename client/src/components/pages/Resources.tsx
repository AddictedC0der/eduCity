import * as React from 'react';
import { Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent, Link, Menu, MenuItem } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { DataGrid, GridColDef, GridRowsProp, GridCellParams } from '@mui/x-data-grid';
import { AddResourceDialog } from '../dialogs/AddResource';
import { IRealResource } from '../../models/resource.model';
import { ResourceService } from '../../http/ResourceAPI';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const columns: GridColDef[] = [
    {field: 'ref', headerName: 'Ресурс', flex: 0.4},
    {field: 'category', headerName: 'Категоия', flex: 0.2},
    {field: 'adder', headerName: 'Добавил', flex: 0.4}
]


export function Resources() {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [data, setData] = React.useState<IRealResource[]>([]);

    React.useEffect(() => {
        document.title = 'Ресурсы | EduCity';

        const fetchData = async () => {
            const res = await (await ResourceService.getAll()).data;
            setData(res);
        }
        fetchData();
    }, [])

    const openDialog = () => {
        setDialogOpen(true);
    }

    const handleCellClick = (params: GridCellParams) => {
        if (params.colDef.field === 'ref') {
            window.location.replace('http://' + params.value);
        }
    }

    const generateRows = (): GridRowsProp => {
        if (data) {
            return data.map(e => {return {id: e.id, ref: e.Link, category: e.Category.SubjectName, adder: e.Author.UserLogin}})
        }
        return [];
    }

    return (
        <MainLayout paddingMain='ALL'>
            <div style={{height: '100vh', width: '100%'}}>
                <Button onClick={openDialog} variant='contained'>Добавить ресурс</Button>
                <DataGrid columns={columns} rows={generateRows()} onCellClick={handleCellClick} sx={{marginTop: '1%'}} />
            </div>
            <AddResourceDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </MainLayout>
    )
}