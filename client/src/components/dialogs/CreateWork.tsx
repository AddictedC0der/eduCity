import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery,
    Checkbox, TextField, FormControlLabel, Button, Stepper, Step, StepLabel, Typography, Grid, Slider } from '@mui/material';
import subjects from '../../Assets/subjects.json';
import { TooltipWrapper } from '../complex/Tooltip';
import { StaticTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NonNullablePickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/useViews';
import { SerializeUI } from '../constructor_lib/algorithms/serialization'; 
import * as Types from '../constructor_lib/types';
import { ConstructorService } from '../../http/constructorAPI';
import { IWork, ITask } from '../../models/constructor.model';
import { useTypedSelector } from '../../hooks/useTypedSelector';

/*
    Main page: name, section, amount of tasks, use advanced checking system
    Time page: limit, addition time after completion of singular task
    Privacy page: Who has access (me, my class(es), everyone)
*/


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
                <Autocomplete value={findOptionByType(formData.Privacy)} options={options}
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
            setFormData({type: 'setTime', payload: dayjs('00:00:00', 'hh:mm:ss').toString()});
            setFormData({type: 'setAddTime', payload: dayjs('00:00:00', 'hh:mm:ss').toString()});
        } else {
            setFormData({type: 'setTime', payload: dayjs('00:30:00', 'hh:mm:ss').toString()});
            setFormData({type: 'setAddTime', payload: dayjs('00:00:00', 'hh:mm:ss').toString()});
        }
    }

    return (
        <>
        
        <div style={{height: '90%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: '5%'}}>
            
            <FormControlLabel sx={{columnGap: '1%'}} control={
                <Checkbox checked={formData.Time !== dayjs('00:00:00', 'hh:mm:ss').toString() ? true : false} onChange={handleLimitActivation} sx={{width: '100%'}} />}
                label='Время ограничено' labelPlacement='start' />
            {formData.Time ?
            (<div style={{rowGap: '5%'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
                <StaticTimePicker showToolbar={true} toolbarTitle='Время работы'
                                views={['hours', 'minutes', 'seconds']} ampm={false} orientation="landscape"
                                value={formData.Time} onChange={(newDate) => setFormData({type: 'setTime', payload: newDate})}
                                renderInput={(params) => <TextField {...params} />} />
                <StaticTimePicker showToolbar={true} toolbarTitle='Добавочное время'
                                views={['hours', 'minutes', 'seconds']} ampm={false} orientation="landscape"
                                value={formData.AdditionalTime} onChange={(newDate) => setFormData({type: 'setAddTime', payload: newDate})}
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

    React.useEffect(() => {
        console.log(formData.Difficulty)
    }, [formData.Difficulty])

    return (
        <>
        <div style={{height: '90%', display: 'flex', flexDirection: 'column', rowGap: '5%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <FormControlLabel sx={{columnGap: '1%'}} control={
                <TextField value={formData.Name} onChange={e => setFormData({type: 'setName', payload: e.target.value})}
                placeholder='Делимость чисел' sx={{width: '100%'}} />}
                label='Название работы' labelPlacement='start' />

            <FormControlLabel control={
                <Autocomplete value={formData.Category}
                onChange={(e, newValue) => setFormData({type: 'setCategory', payload: newValue})}
                options={generateOptions()} renderInput={params => <TextField {...params} label='Категория' />}
                sx={{width: '100%'}} />} sx={{width: '100%'}}
                label='Категория работы' labelPlacement='start' />
            
            <FormControlLabel control={
                <Autocomplete value={formData.Class.toString()}
                onChange={(e, newValue) => setFormData({type: 'setClass', payload: parseInt(newValue)})}
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']} renderInput={params => <TextField {...params} label='Класс' />}
                sx={{width: '100%'}} />} sx={{width: '100%'}}
                label='Класс' labelPlacement='start' /> 

            <Slider marks={true} min={1} max={10} step={1} value={formData.Difficulty} onChange={(e, newValue) => setFormData({type: 'setDifficulty', payload: (newValue as number)})}
                    sx={{color: `rgb(${formData.Difficulty*20}, ${255 - formData.Difficulty*20}, 77)`,
                    height: 8,
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                      backgroundColor: '#fff',
                      border: '2px solid currentColor',
                      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                      },
                      '&:before': {
                        display: 'none',
                      },
                    },
                    '& .MuiSlider-valueLabel': {
                      lineHeight: 1.2,
                      fontSize: 12,
                      background: 'unset',
                      padding: 0,
                      width: 32,
                      height: 32,
                      borderRadius: '50% 50% 50% 0',
                      backgroundColor: `rgb(${formData.Difficulty*20}, ${255 - formData.Difficulty*20}, 77)`,
                      transformOrigin: 'bottom left',
                      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                      '&:before': { display: 'none' },
                      '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                      },
                      '& > *': {
                        transform: 'rotate(45deg)',
                      },
                    },}} valueLabelDisplay="auto" />

            <FormControlLabel sx={{columnGap: '1%', width: '100%'}} control={
                <Checkbox checked={formData.AutoChecking} onChange={e => setFormData({type: 'setChecking', payload: e.target.checked})}
                 />} label='Автоматическая проверка' labelPlacement='start' />

            <FormControlLabel sx={{columnGap: '1%', width: '100%'}} control={
                <Checkbox checked={formData.AdvancedChecking} onChange={e => setFormData({type: 'setAdvChecking', payload: e.target.checked})}
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

    const { user } = useTypedSelector(state => state.user);

    const initial: IWork = {
        Name: 'Делимость чисел',
        Author: user.id,
        Category: 'Математика',
        Difficulty: 3,
        Class: 9,
        AutoChecking: false,
        AdvancedChecking: false,
        Time: dayjs('00:00:00', 'hh:mm:ss').toString(),
        AdditionalTime: dayjs('00:00:00', 'hh:mm:ss').toString(),
        Privacy: 'ME',
        Tasks: []
    }

    const formReducer = (state: IWork, action: {type: string, payload: any}) => {
        switch(action.type) {
            case 'setName': {
                return {...state, Name: action.payload};
            }
            case 'setCategory': {
                return {...state, Category: action.payload ?? 'Математика'};
            }
            case 'setDifficulty': {
                return {...state, Difficulty: action.payload};
            }
            case 'setClass': {
                return {...state, Class: action.payload};
            }
            case 'setChecking': {
                return {...state, AutoChecking: action.payload};
            }
            case 'setAdvChecking': {
                return {...state, AdvancedChecking: action.payload};
            }
            case 'setTime': {
                return {...state, TimeLimit: action.payload};
            }
            case 'setAddTime': {
                return {...state, AdditionalTime: action.payload};
            }
            case 'setPrivacy': {
                return {...state, Privacy: action.payload};
            }
            default: {
                throw new Error(`Unknown action type: ${action.type}`);
            }
        }
    }

    const [formData, setFormData] = React.useReducer(formReducer, initial)

    const [activeStep, setActiveStep] = React.useState<number>(0);

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
        formData.Tasks = result.map((res, i) => {return {TaskHashUi: res, TaskIndex: i}})
        // formData.Time = formData.Time ? formData.Time : -1;
        // formData.AdditionalTime = formData.AdditionalTime ? formData.AdditionalTime : -1;
        ConstructorService.createWork(formData)
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