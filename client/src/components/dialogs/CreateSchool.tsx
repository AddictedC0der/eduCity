import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, List, ListItem, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { SchoolService } from '../../http/schoolAPI';
import { ISchool } from '../../models/school.model';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { IUser } from '../../models/user.model';
import { UserService } from '../../http/userAPI';


interface CreateSchoolDialogProps {
    open: boolean;
    onClose: () => void;
}


interface DialogPageProps {
    formData: ISchool;
    setFormData: (action: {type: string, payload: any}) => void;
}


function DialogAdminsPage(props: DialogPageProps) {
    const [search, setSearch] = React.useState<string>('');                     // Text typed in Autocomplete
    const [selected, setSelected] = React.useState<string | null>(null);        // Selected teachers in Autocomplete
    const [totalAdmins, setTotalAdmins] = React.useState<IUser[]>([]);          // All existing teachers
    const [admins, setAdmins] = React.useState<IUser[]>(
        props.formData.Admins.map(admin => {return totalAdmins.find(e => e.id === admin)!}));  // Teachers of type IUserDto that were added to list
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await UserService.getAll()).data;
            setTotalAdmins(data);
        }
        fetchData();
    }, [])

    const generateOptions = () => {
        return totalAdmins.map(admin => {return admin.UserLogin});
    }

    const handleAddStudent = () => {
        if (selected) {
            const target = totalAdmins.find(admin => admin.UserLogin === selected)!;
            setAdmins(admins.concat([target]));
            props.setFormData({type: 'addAdmin', payload: target.id})
            setSearch('');
            setSelected(null);
        }
    }

    const handleRemoveStudent = (admin: IUser) => {
        const targetIndex = admins.indexOf(admin);
        const copy = admins;
        copy.splice(targetIndex, 1);
        setAdmins(copy);
        props.setFormData({type: 'removeAdmin', payload: admins});
    }

    return (
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Typography>Администраторы могут редактировать данные о школе</Typography>
            <Typography>Вы можете добавлять администраторов в будущем</Typography>
            <Paper elevation={5} sx={{width: '80%', height: '100%'}}>
                <List>
                    {
                        admins.map(admin => { return (
                            <ListItem key={admin.UserLogin}>
                                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Typography sx={{width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{admin.UserLogin}</Typography>
                                    <Fab size='small' onClick={() => handleRemoveStudent(admin)}>
                                        <ClearIcon />
                                    </Fab>
                                </Box>
                            </ListItem>
                        )})
                    }
                </List>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Autocomplete
                        sx={{width: '80%'}}
                        value={selected}
                        inputValue={search}
                        onChange={(_, newValue) => setSelected(newValue ?? null)}
                        onInputChange={(_, newValue) => setSearch(newValue)}
                        options={generateOptions()}
                        renderInput={(params) => <TextField {...params} />} />
                    <Fab onClick={handleAddStudent}>
                        <AddIcon />
                    </Fab>
                </div>
            </Paper>
        </div>
    )
}


function DialogMainPage(props: DialogPageProps) {
    const { formData, setFormData } = props;
    return (
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <FormControlLabel
                    control={
                        <TextField value={formData.SchoolName} onChange={(e) => setFormData({type: 'setName', payload: e.target.value})} placeholder='Comprehensive school №2' />
                    } 
                    label='Название' labelPlacement='start' sx={{columnGap: '5%'}} 
                />
            <FormControlLabel
                    control={
                        <TextField value={formData.Address} onChange={(e) => setFormData({type: 'setAddress', payload: e.target.value})} placeholder='Address' />
                    } 
                    label='Адрес' labelPlacement='start' sx={{columnGap: '5%'}} 
                />
            <FormControlLabel
                    control={
                        <TextField value={formData.Link} onChange={(e) => setFormData({type: 'setLink', payload: e.target.value})} placeholder='www.example.com' />
                    } 
                    label='Ссылка на сайт' labelPlacement='start' sx={{columnGap: '5%'}} 
                />
        </div>
    )
}


export function CreateSchoolDialog(props: CreateSchoolDialogProps) {
    const [activeStep, setActiveStep] = React.useState<number>(0);
    
    const steps = ['Общие настройки', 'Добавление администраторов']

    const initial: ISchool = {
        SchoolName: '',
        Address: '',
        Link: '',
        Admins: []
    }

    const formReducer = (state: ISchool, action: {type: string, payload: any}) => {
        switch(action.type) {
            case 'setName': {
                return {...state, SchoolName: action.payload};
            }
            case 'setAddress': {
                return {...state, Address: action.payload};
            }
            case 'setLink': {
                return {...state, Link: action.payload};
            }
            case 'addAdmin': {
                return {...state, Admins: state.Admins.concat([action.payload])};
            }
            case 'removeAdmin': {
                const copy = state.Admins;
                const targetIndex = copy.indexOf(action.payload);
                copy.splice(targetIndex, 1);
                return {...state, Admins: copy};
            }
            default: {
                throw new Error(`Unknown action type: ${action.type}`);
            }
        }
    }

    const [formData, setFormData] = React.useReducer(formReducer, initial);

    const handleCreateSchool = () => {
        SchoolService.createSchool(formData);
        props.onClose();
    }

    const renderPage = () => {
        const pageProps = {formData: formData, setFormData: setFormData}
        switch(activeStep) {
            case 0: {
                return <DialogMainPage {...pageProps} />
            }
            case 1: {
                return <DialogAdminsPage {...pageProps} />;
            }
            default: {
                return <Typography>Something went wrong!</Typography>
            }
        }
    }

    return (
        <Dialog fullWidth maxWidth='md' open={props.open} onClose={props.onClose}
                PaperProps={{sx: {height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}}>
            <DialogTitle>Создание школы</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div style={{marginTop: '5%', width: '100%', height: '100%'}}>
                    {renderPage()}
                </div>
            </DialogContent>
            <DialogActions>
                <Button disabled={activeStep <= 0 ? true : false} variant='contained' onClick={() => setActiveStep(activeStep - 1)}>Назад</Button>
                <Button variant='contained' onClick={() => {
                    if (activeStep >= steps.length) {
                        handleCreateSchool();
                    } else {
                        setActiveStep(activeStep + 1)
                    }}}>{activeStep >= steps.length - 1 ? ' Создать' : 'Далее'}</Button>
            </DialogActions>
        </Dialog>
    )
}