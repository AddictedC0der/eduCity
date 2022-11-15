import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery,
    Checkbox, TextField, FormControlLabel, Button, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
import subjects from '../../Assets/subjects.json';
import { TooltipWrapper } from '../complex/Tooltip';
import { StaticTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NonNullablePickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/useViews';
import { SerializeUI } from '../constructor_lib/algorithms/serialization'; 
import * as Types from '../constructor_lib/types';

/*
    Main page: name, section, amount of tasks, use advanced checking system
    Time page: limit, addition time after completion of singular task
    Privacy page: Who has access (me, my class(es), everyone)
*/


interface TaskData {
    name: string;
    category: string;
    autoChecking: boolean;
    advanceChecking: boolean;
    timeLimit: Dayjs | null;
    additionalTime: Dayjs | null;
    privacy: 'ME' | 'CLASS' | 'PUBLIC';
}


interface DialogPageProps {
    formData: any;
    setFormData: (action: {type: string, payload: any}) => any;
    swiftPage: (direction: number) => void;
}


function DialogConclusionPage(props: DialogPageProps) {
    const { formData, setFormData } = props;

    const renderTime = (time: Dayjs | null) => {
        if (time) {
            const t = time.toDate()
            return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        }
        return 'Безлимитно'
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90%'}}>
                <Typography variant='h5'>{formData.name}</Typography>
                <Typography>{formData.category}</Typography>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '5%'}}>
                    <FormControlLabel sx={{columnGap: '5%'}} control={<Typography>{renderTime(formData.timeLimit)}</Typography>} label='Время: ' labelPlacement='start' />
                    <FormControlLabel sx={{columnGap: '5%'}} control={<Typography>{renderTime(formData.additionalTime)}</Typography>} label='Добавочное время: ' labelPlacement='start' />
                    <FormControlLabel control={<Checkbox disabled checked={formData.advanceChecking} />} label='Продвинутая проверка: ' labelPlacement='start' />
                    <FormControlLabel sx={{columnGap: '5%'}} control={<Typography>{formData.privacy}</Typography>} label='Доступно для: ' labelPlacement='start' />
                </div>
            </div>
        </div>
    )
}



function DialogPrivacyPage(props: DialogPageProps) {
    const { formData, setFormData } = props;

    const options = [
        {label: 'Только я', type: 'ME'},
        {label: 'Только мой класс', type: 'CLASS'},
        {label: 'Все', type: 'PUBLIC'}
    ]

    const findOptionByType = (type: string) => {
        return options.find(option => option.type === type);
    }

    return (
        <>
        <div style={{height: '90%'}}>
            <FormControlLabel control={
                <Autocomplete value={findOptionByType(formData.privacy)} options={options}
                            onChange={(e, newValue) => setFormData({type: 'setPrivacy', payload: newValue ? newValue.type : 'ME'})}
                            renderInput={params => <TextField {...params} />} sx={{width: '100%'}} />
            } label='Кто может решать вашу работу' labelPlacement='start' sx={{columnGap: '5%'}} />
        </div>
        </>
    )
}


function DialogTimePage(props: DialogPageProps) {
    const { formData, setFormData } = props;

    const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-07T10:15'));

    React.useEffect(() => {
        const t = date?.toDate()
        console.log(t!.getSeconds() + t!.getMinutes()*60 + t!.getHours()*60*60);
    }, [date])

    const handleLimitActivation = (event: any) => {
        if (!event.target.checked) {
            setFormData({type: 'setTime', payload: null});
            setFormData({type: 'setAddTime', payload: null});
        } else {
            setFormData({type: 'setTime', payload: dayjs('00:30:00', 'hh:mm:ss')});
            setFormData({type: 'setAddTime', payload: dayjs('00:00:00', 'hh:mm:ss')});
        }
    }

    return (
        <>
        
        <div style={{height: '90%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: '5%'}}>
            
            <FormControlLabel sx={{columnGap: '1%'}} control={
                <Checkbox checked={formData.timeLimit ? true : false} onChange={handleLimitActivation} sx={{width: '100%'}} />}
                label='Время ограничено' labelPlacement='start' />
            {formData.timeLimit ?
            (<div style={{rowGap: '5%'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
                <StaticTimePicker showToolbar={true} toolbarTitle='Время работы'
                                views={['hours', 'minutes', 'seconds']} ampm={false} orientation="landscape"
                                value={formData.timeLimit} onChange={(newDate) => setFormData({type: 'setTime', payload: newDate})}
                                renderInput={(params) => <TextField {...params} />} />
                <StaticTimePicker showToolbar={true} toolbarTitle='Добавочное время'
                                views={['hours', 'minutes', 'seconds']} ampm={false} orientation="landscape"
                                value={formData.additionalTime} onChange={(newDate) => setFormData({type: 'setAddTime', payload: newDate})}
                                renderInput={(params) => <TextField {...params} />} />
            </LocalizationProvider>
                    
            </div>)
            : null
            }
        </div>
        </>
    )
}


function DialogMainPage(props: DialogPageProps) {
    const { formData, setFormData } = props;
    
    const generateOptions = () => {
        let response: any[] = [];
        for (let i = 0; i < subjects.Groups.length; i++) {
            response = response.concat(subjects.Groups[i].Contents.map(sbj => sbj.Name));
        }
        return response;
    }

    return (
        <>
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <FormControlLabel sx={{columnGap: '1%'}} control={
                <TextField value={formData.name} onChange={e => setFormData({type: 'setName', payload: e.target.value})}
                placeholder='Делимость чисел' sx={{width: '100%'}} />}
                label='Название работы' labelPlacement='start' />

            <FormControlLabel control={
                <Autocomplete value={formData.category}
                onChange={(e, newValue) => setFormData({type: 'setCategory', payload: newValue})}
                options={generateOptions()} renderInput={params => <TextField {...params} label='Категория' />}
                sx={{width: '100%'}} />} sx={{width: '100%'}}
                label='Категория работы' labelPlacement='start' />
            
            <FormControlLabel sx={{columnGap: '1%', width: '100%'}} control={
                <Checkbox checked={formData.autoChecking} onChange={e => setFormData({type: 'setChecking', payload: e.target.checked})}
                 />} label='Автоматическая проверка' labelPlacement='start' />

            <FormControlLabel sx={{columnGap: '1%', width: '100%'}} control={
                <Checkbox checked={formData.advanceChecking} onChange={e => setFormData({type: 'setAdvChecking', payload: e.target.checked})}
                 />} label='Продвинутая проверка' labelPlacement='start' />
        </div>
        </>
    )
}


interface CreateWorkDialogProps {
    open: boolean;
    onClose: () => void;
    repo: Types.RepositoryElement[][];
}


export function CreateWorkDialog(props: CreateWorkDialogProps) {
    const steps = ['Общие настройки', 'Насткройки времени', 'Настройки доступа'];

    const initial: TaskData = {
        name: 'Делимость чисел',
        category: 'Математика',
        autoChecking: false,
        advanceChecking: false,
        timeLimit: null,
        additionalTime: null,
        privacy: 'ME'
    }

    const formReducer = (state: any, action: any) => {
        switch(action.type) {
            case 'setName': {
                return {...state, name: action.payload}
            }
            case 'setCategory': {
                return {...state, category: action.payload ?? 'Математика'}
            }
            case 'setChecking': {
                return {...state, autoChecking: action.payload}
            }
            case 'setAdvChecking': {
                return {...state, advanceChecking: action.payload}
            }
            case 'setTime': {
                return {...state, timeLimit: action.payload}
            }
            case 'setAddTime': {
                return {...state, additionalTime: action.payload}
            }
            case 'setPrivacy': {
                return {...state, privacy: action.payload}
            }
            default: {
                throw new Error(`Unknown action type: ${action.type}`);
            }
        }
    }

    const [formData, setFormData] = React.useReducer<any>(formReducer, initial)

    const [activeStep, setActiveStep] = React.useState<number>(0);

    const fullScreen = useMediaQuery('xl');


    const currentPage = () => {
        const props: DialogPageProps = {formData: formData, setFormData: setFormData, swiftPage: handleSwiftPage};
        switch(activeStep) {
            case 0: {
                return <DialogMainPage {...props} />
            }
            case 1: {
                return <DialogTimePage {...props} />
            }
            case 2: {
                return <DialogPrivacyPage {...props} />
            }
            case 3: {
                return <DialogConclusionPage {...props} />
            }
            default: {
                return <Typography>Something went wrong...</Typography>
            }
        }
    }

    const handleSwiftPage = (direction: number) => {
        setActiveStep(activeStep + direction);
    }

    const handleCreateWork = () => {
        console.log('Creation in process...')
        const result = SerializeUI(props.repo);
        console.log(result);
        // TODO: Creation process
        props.onClose()
    }

    return (
        <Dialog fullWidth maxWidth='md' PaperProps={{sx: {height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}} open={props.open} onClose={props.onClose}>
            <DialogTitle>Создание работы</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div style={{marginTop: '5%', width: '100%', height: '100%'}}>
                    {currentPage()}
                </div>
            </DialogContent>
            <DialogActions>
                    <Button disabled={activeStep <= 0 ? true : false} variant='contained' onClick={() => handleSwiftPage(-1)}>Назад</Button>
                    <Button variant='contained' onClick={() => {
                        if (activeStep >= steps.length) {
                            handleCreateWork();
                        } else {
                            handleSwiftPage(1)
                        }}}>{activeStep >= steps.length ? ' Создать' : 'Далее'}</Button>
            </DialogActions>
        </Dialog>
    )
}