import * as React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Box, Pagination, Fab, Grid, Button } from '@mui/material';
import { ConstructorCanvas } from './constructor_elements/Canvas';
import { Toolbar } from './constructor_elements/Toolbar';
import { PropertiesArea } from './constructor_elements/PropertiesArea';
import { createConstructorStore } from './Session';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as Constants from './Constants';
import * as Types from './types';
import { useConstructorStore } from '../../hooks/useConstructorStore';
import { ComponentsRepository } from './ComponentsRepository';
import AddIcon from '@mui/icons-material/Add';
import { CreateWorkDialog } from '../dialogs/CreateWork';
import { InterfaceJSON, PageJSON, Serializer } from './algorithms/serialization';
import { CodeTable } from './Constants';




export function TaskConstructor() {
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    const canvasRef = React.useRef(null)

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const store = React.useMemo(() => createConstructorStore(Constants.initialConstructorState), []);
    const currentPage = useConstructorStore(store, React.useCallback((state: Types.IConstructorState) => state.currentPage, []));
    const totalPages = useConstructorStore(store, React.useCallback((state: Types.IConstructorState) => state.totalPages, []));

    // let componentsRepo = React.useMemo(() => new ComponentsRepository(store), [])

    const [componentsRepo, setComponentsRepo] = React.useState(new ComponentsRepository(store))

    const serializer = new Serializer();

    const changeCurrentRepo = (newRepo: InterfaceJSON) => {
        console.log('Called!')
        setComponentsRepo(serializer.deserializeTask(componentsRepo, {
            elements: newRepo.tasks[0].elements.map(e => { return {properties: e.properties, type: e.type}})}, 'I'));
    }


    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        store.setState((prev: Types.IConstructorState) => ({...prev, currentPage: value}));
    }

    const handleAddPage = () => {
        store.setState((prev: Types.IConstructorState) => ({...prev, totalPages: prev.totalPages + 1, currentPage: prev.totalPages + 1}));
    }

    return (
        <MainLayout paddingMain='NONE'>
            <DndProvider backend={HTML5Backend}>
                <Grid container sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100vh'}} columnSpacing={2}>
                    <Grid item xs={2}>
                        <Toolbar changeRepo={changeCurrentRepo} store={store} parent={canvasRef} />
                    </Grid>
                    <Grid container item xs sx={{width: '100%'}}>
                        <ConstructorCanvas repo={componentsRepo} canvasRef={canvasRef} store={store} />
                        <Grid item xs={2} />
                        <Grid item xs sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage}
                                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                            <Fab size='small' onClick={handleAddPage}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={2} sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <Button variant='contained' onClick={() => setOpenDialog(true)}>Создать</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <PropertiesArea store={store} repo={componentsRepo} />
                    </Grid>
                </Grid>
            </DndProvider>

            <CreateWorkDialog open={openDialog} onClose={handleCloseDialog} repo={componentsRepo.repository} />
        </MainLayout>
    )
}