import * as React from 'react';
import { Paper, TextField, Divider, Typography } from '@mui/material';


interface TimePickerProps {
    label?: string
    paperProps?: any;
    value?: number;
    onChange?: (newTime: number) => any;
}


export function TimePicker(props: TimePickerProps) {
    const parseTime = (time: number) => {
        let parsedHours = Math.floor(time / HOUR);
        let parsedMinutes = Math.floor((time - parsedHours*HOUR) / MINUTE);
        let parsedSeconds = time - parsedHours*HOUR - parsedMinutes;
        return [parsedHours, parsedMinutes, parsedSeconds];
    }

    const [time, setTime] = React.useState<number>(props.value ?? 0);

    const SECOND = 1000
    const MINUTE = SECOND*60
    const HOUR = MINUTE*60

    const hoursRef = React.useRef();
    const minutesRef = React.useRef();
    const secondsRef = React.useRef();

    let parsedTime = parseTime(time);

    const [seconds, setSeconds] = React.useState<string>(parsedTime[2].toString());
    const [minutes, setMinutes] = React.useState<string>(parsedTime[1].toString());
    const [hours, setHours] = React.useState<string>(parsedTime[0].toString());

    const focusChain = {
        'hours': 'minutes',
        'minutes': 'seconds',
        'seconds': ''
    }

    const dataTable = {
        'seconds': (newValue: string) => setSeconds(newValue),
        'minutes': (newValue: string) => setMinutes(newValue),
        'hours': (newValue: string) => setHours(newValue),
    }

    React.useEffect(() => {
        console.log(time)
    }, [time])

    const handleTimeChange = () => {
        setTime(parseInt(hours)*HOUR + parseInt(minutes)*MINUTE + parseInt(seconds)*SECOND ?? 0)
    }

    const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Fired')
        if (parseInt(event.target.value) > 60) {
            event.target.value = '60';
        }
        
        props.onChange ? props.onChange(parseInt(hours)*HOUR + parseInt(minutes)*MINUTE + parseInt(seconds)*SECOND ?? 0) : handleTimeChange()
        //@ts-ignore
        dataTable[document.activeElement.id](event.target.value)
        if (event.target.value.length == 2) {
            //@ts-ignore
            const target = document.getElementById(focusChain[document.activeElement ?? '']);
            if (target) {target.focus()}
        }
    }

    const InputStyle: any = {
        variant: 'standard',
        placeholder: '00',
        type: 'number',
        inputProps: {maxLength: 2, style: {border: 'none', textAlign: 'center', fontSize: 'large'}},
        
    }

    return (
        <div>
        <Typography>{props.label}</Typography>
        <Paper elevation={7} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', jusifyContent: 'center', ...props.paperProps}}>
            <TextField ref={hoursRef} onChange={handleTimeInput} {...InputStyle} id='hours' value={hours} />
            <Divider orientation='vertical' sx={{ borderRightWidth: 1, borderColor: 'rgb(200, 200, 200)'}} />
            <TextField ref={minutesRef} onChange={handleTimeInput} {...InputStyle} id='minutes' value={minutes} />
            <Divider orientation='vertical' sx={{ borderRightWidth: 1, borderColor: 'rgb(200, 200, 200)'}} />
            <TextField ref={secondsRef} onChange={handleTimeInput} {...InputStyle} id='seconds' value={seconds} />
        </Paper>
        </div>
    )
}