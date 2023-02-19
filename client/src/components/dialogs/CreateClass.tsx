import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, List, ListItem, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { IClass, IRealClass } from '../../models/class.model';
import { ISchool, ISchoolDto } from '../../models/school.model';
import { SchoolService } from '../../http/schoolAPI';
import { IUser, IUserDto } from '../../models/user.model';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { UserService } from '../../http/userAPI';
import { ClassService } from '../../http/classAPI';



interface DialogPageProps {
    formData: IClass;
    setFormData: (action: {type: string, payload: any}) => void;
}

function AddTeachersPage(props: DialogPageProps) {
    const [search, setSearch] = React.useState<string>('');                     // Text typed in Autocomplete
    const [selected, setSelected] = React.useState<string | null>(null);        // Selected teachers in Autocomplete
    const [totalTeachers, setTotalTeachers] = React.useState<IUser[]>([]);      // All existing teachers
    const [teachers, setTeachers] = React.useState<IUser[]>(
        props.formData.ContainedTeachers.map(teacher => {return totalTeachers.find(e => e.id === teacher)!}));  // Teachers of type IUserDto that were added to list
    
    console.log(teachers)

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await UserService.getAllTeachers()).data;
            setTotalTeachers(data);
        }
        fetchData();
    }, [])

    React.useEffect(() => {
        setTeachers(props.formData.ContainedTeachers.map(teacher => {return totalTeachers.find(e => e.id === teacher)!}));
    }, [totalTeachers])

    const generateOptions = () => {
        return totalTeachers.map(teacher => {return teacher.UserLogin});
    }

    const handleAddStudent = () => {
        if (selected) {
            const target = totalTeachers.find(teacher => teacher.UserLogin === selected)!;
            setTeachers(teachers.concat([target]));
            props.setFormData({type: 'addTeacher', payload: target.id})
            setSearch('');
            setSelected(null);
        }
    }

    const handleRemoveStudent = (teacher: IUser) => {
        const targetIndex = teachers.indexOf(teacher);
        const copy = teachers;
        copy.splice(targetIndex, 1);
        setTeachers(copy);
        props.setFormData({type: 'removeTeacher', payload: teacher});
    }

    return (
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Typography>Вы можете добавлять учителей в будущем</Typography>
            <Paper elevation={5} sx={{width: '80%', height: '100%'}}>
                <List>
                    {
                        teachers.map(teacher => { return (
                            <ListItem key={teacher?.UserLogin}>
                                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Typography sx={{width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{teacher?.UserLogin}</Typography>
                                    <Fab size='small' onClick={() => handleRemoveStudent(teacher)}>
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


function AddStudentsPage(props: DialogPageProps) {
    const [search, setSearch] = React.useState<string>('');                     // Text typed in Autocomplete
    const [selected, setSelected] = React.useState<string | null>(null);      // Selected student in Autocomplete
    const [totalStudents, setTotalStudents] = React.useState<IUser[]>([]);   // All existing students
    const [students, setStudents] = React.useState<IUser[]>(
        props.formData.ContainedStudents.map(student => {return totalStudents.find(e => e.id === student)!}));  // Students of type IUserDto that were added to list
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await UserService.getAllStudents()).data;
            setTotalStudents(data);
        }
        fetchData();
    }, [])

    const generateOptions = () => {
        return totalStudents.map(student => {return student.UserLogin});
    }

    const handleAddStudent = () => {
        if (selected) {
            const target = totalStudents.find(student => student.UserLogin === selected)!;
            setStudents(students.concat([target]));
            props.setFormData({type: 'addStudent', payload: target.id})
            setSearch('');
            setSelected(null);
        }
    }

    const handleRemoveStudent = (student: IUser) => {
        const targetIndex = students.indexOf(student);
        const copy = students;
        copy.splice(targetIndex, 1);
        setStudents(copy);
        props.setFormData({type: 'removeStudent', payload: student});
    }

    return (
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Typography>Вы можете добавлять участников в будущем</Typography>
            <Paper elevation={5} sx={{width: '80%', height: '100%'}}>
                <List>
                    {
                        students.map(student => { return (
                            <ListItem key={student.UserLogin}>
                                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Typography sx={{width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{student.UserLogin}</Typography>
                                    <Fab size='small' onClick={() => handleRemoveStudent(student)}>
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
                        onChange={(_, newValue) => setSelected(newValue)}
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


function MainSettingsPage(props: DialogPageProps) {
    const [schools, setSchools] = React.useState<ISchoolDto[]>([]);

    const initial = schools.find(school => school.id === props.formData.School)?.SchoolName ?? null;
    const [selected, setSelected] = React.useState<string | null>(initial);
    const [search, setSearch] = React.useState<string>(selected ?? '');

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

    return (
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <FormControlLabel sx={{columnGap: '1%', width: '80%'}} control={
                <TextField value={props.formData.Name} onChange={e => props.setFormData({type: 'setName', payload: e.target.value})}
                        placeholder='9 Б' sx={{width: '100%'}} />}
                label='Название класса' labelPlacement='start' />
            
            <FormControlLabel sx={{columnGap: '1%', width: '80%'}} control={
                <Autocomplete
                    options={generateOptions()}
                    value={selected}
                    inputValue={search}
                    onInputChange={(_, newValue) => setSearch(newValue)}
                    onChange={(_, newValue) => {props.setFormData({type: 'setSchool', payload: schools.find(school => school.SchoolName === newValue)!.id}); setSelected(newValue);}}
                    sx={{width: '100%'}} renderInput={(params) => <TextField {...params} />} />}
                label='Школа' labelPlacement='start' />
        </div>
    )
}


interface CreateClassDialogProps {
    open: boolean;
    onClose: () => void;
    dto?: IClass;
}


export function CreateClassDialog(props: CreateClassDialogProps) {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const steps = ['Общие настрйоки', 'Добавление учеников', 'Добавление учителей'];

    const initial: IClass = {
        Name: props.dto?.Name ?? '',
        School: props.dto?.School ?? 0,
        ContainedStudents: props.dto?.ContainedStudents ?? [],
        ContainedTeachers: props.dto?.ContainedTeachers ?? []
    }

    const formReducer = (state: IClass, action: {type: string, payload: any}) => {
        switch(action.type) {
            case 'setName': {
                return {...state, Name: action.payload};
            }
            case 'setSchool': {
                return {...state, School: action.payload};
            }
            case 'addStudent': {
                return {...state, ContainedStudents: state.ContainedStudents.concat([action.payload as number])};
            }
            case 'removeStudent': {
                const copy = state.ContainedStudents;
                const targetIndex = copy.indexOf(action.payload);
                copy.splice(targetIndex, 1);
                return {...state, ContainedStudents: copy};
            }
            case 'addTeacher': {
                return {...state, ContainedTeachers: state.ContainedTeachers.concat([action.payload as number])}
            }
            case 'removeTeacher': {
                const copy = state.ContainedTeachers;
                const targetIndex = copy.indexOf(action.payload);
                copy.splice(targetIndex, 1);
                return {...state, ContainedTeachers: copy};
            }
            default: {
                throw new Error(`Unknown action type: ${action.type}`);
            }
        }
    }

    const [formData, setFormData] = React.useReducer(formReducer, initial)

    React.useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleCreateClass = () => {
        ClassService.createClass(formData);
        props.onClose();
    }

    const handleEditClass = async () => {
        const targetClass = await ClassService.getClassByName(props.dto!.Name);
        ClassService.updateClass(targetClass.data.id, formData);
    }

    const renderCurrentPage = () => {
        const pageProps: DialogPageProps = {formData: formData, setFormData: setFormData}
        switch(activeStep) {
            case 0: {
                return <MainSettingsPage {...pageProps} />
            }
            case 1: {
                return <AddStudentsPage {...pageProps} />
            }
            case 2: {
                return <AddTeachersPage {...pageProps} />
            }
            default: {
                return <Typography>Something went worng!</Typography>
            }
        }
    }

    return (
        <Dialog fullWidth maxWidth='md' open={props.open} onClose={props.onClose}
                PaperProps={{sx: {height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}}>
            <DialogTitle>Создание класса</DialogTitle>
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
                    {renderCurrentPage()}
                </div>
            </DialogContent>
            <DialogActions>
                    <Button disabled={activeStep <= 0 ? true : false} variant='contained' onClick={() => setActiveStep(activeStep - 1)}>Назад</Button>
                    <Button variant='contained' onClick={() => {
                        if (activeStep >= steps.length - 1) {
                            if (props.dto) {
                                handleEditClass();
                            } else {
                                handleCreateClass();
                            }
                            
                        } else {
                            setActiveStep(activeStep + 1)
                        }}}>{activeStep >= steps.length - 1 ? ' Создать' : 'Далее'}</Button>
            </DialogActions>
        </Dialog>
    )
}