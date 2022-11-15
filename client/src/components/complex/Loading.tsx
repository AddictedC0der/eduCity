import * as React from 'react';
import { CircularProgress, Typography } from '@mui/material';


interface LoadingComponentProps {
    title?: string;
}


export function LoadingComponent(props: LoadingComponentProps) {
    const lines = ['Выполняем квантовые рассчеты...', 'Ещё секундочку...', 'Интерполируем матрицы...', 'Загружаем ИИ...']

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    const [loadingTitle, setLoadingTitle] = React.useState(lines[getRandomInt(lines.length)]);

    let timerId: any;

    const bindTimer = () => {
        timerId = setInterval(() => setLoadingTitle(lines[getRandomInt(lines.length)]), 5000)
    }

    const unbindTimer = () => {
        clearInterval(timerId)
    }

    React.useEffect(() => {
        if (!props.title) {
            bindTimer();
            return (() => {
                unbindTimer();
            })
        }
    }, [])

    return (
        <div style={{width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            rowGap: '5%'}}>
            <CircularProgress />
            <Typography>{props.title ?? loadingTitle}</Typography>
        </div>
        
    )
}