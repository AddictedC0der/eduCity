import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import * as React from 'react';


interface TimerProps {
    value: number;
}


export function Timer(props: TimerProps) {
    const [time, setTime] = React.useState<number>(props.value);
    const [isExpired, setIsExpired] = React.useState<boolean>(false);

    const SECOND = 1000;
    const MINUTE = SECOND*60;
    const HOUR = MINUTE*60;

    const renderTime = (time: number) => {
        if (time != null) {
            console.log(time)
            let hours = Math.floor(time / HOUR)
            let minutes = Math.floor((time - hours*HOUR) / MINUTE)
            let seconds = (time - hours*HOUR - minutes*MINUTE) / SECOND
            console.log(hours, minutes, seconds)
            return `${hours}:${minutes}:${seconds}`
        }
        return 'Безлимитно'
    }

    const countDown = () => {
        if (time < 0 && !isExpired) {
            setTime(0);
            setIsExpired(true);
        }
        if (!isExpired) {
            setTime(time - 1000)
        } else {
            setTime(time + 1000)
        }
    }

    React.useEffect(() => {
        const interval = setInterval(countDown, 1000);
        return () => {console.log('Clearing interval'); clearInterval(interval)};
    }, []);

    return (
        <>
        <AccessTimeIcon />
        <Typography sx={{color: isExpired ? 'red' : 'black'}}>{renderTime(time)}</Typography>
        </>
    )
}