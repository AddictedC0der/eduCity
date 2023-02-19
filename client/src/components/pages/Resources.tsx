import * as React from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { DataGrid, GridColDef, GridRowsProp, GridCellParams } from '@mui/x-data-grid';
import { AddResourceDialog } from '../dialogs/AddResource';


const columns: GridColDef[] = [
    {field: 'ref', headerName: 'Ресурс', flex: 0.4},
    {field: 'category', headerName: 'Категоия', flex: 0.2},
    {field: 'adder', headerName: 'Добавил', flex: 0.4}
]

const rows: GridRowsProp = [
    {id: 0, ref: 'www.problems.ru', category: 'Математика', adder: 'Me'}
]


export function Resources() {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        document.title = 'Ресурсы | EduCity';
    }, [])

    const openDialog = () => {
        setDialogOpen(true);
    }

    const handleCellClick = (params: GridCellParams) => {
        if (params.colDef.field === 'ref') {
            window.location.replace('http://' + params.value);
        }
    }

    const handleAddResource = () => {
        // TODO: Add later
    }

    return (
        <MainLayout paddingMain='ALL'>
            <div style={{height: '100vh', width: '100%'}}>
                <Button onClick={openDialog} variant='contained'>Добавить ресурс</Button>
                <DataGrid columns={columns} rows={rows} onCellClick={handleCellClick} sx={{marginTop: '1%'}} />
            </div>
            <AddResourceDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </MainLayout>
    )
}