import * as React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { DeserializeUI } from '../constructor_lib/algorithms/serialization';


function ConclusionPage(props: any) {
    return (
        <Paper>
            <Typography>You've done</Typography>
        </Paper>
    )
}


function TaskPage(props: any) {
    const canvasRef = React.createRef<HTMLDivElement>();
    
    const repo = DeserializeUI(props.hash, canvasRef);

    return (
        <Paper ref={canvasRef} sx={{width: '90%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {repo ?
        repo.renderComponents()
        : <Typography>Something went wrong!</Typography>}
        </Paper>
    )
}


function PreviewPage(props: any) {
    return (
        <Paper elevation={8} sx={{width: '70%', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '100%', height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h5'>Work Name</Typography>
                <Typography sx={{color: 'gray'}}>Math</Typography>
            </div>
            <div style={{width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography>15 tasks</Typography>
                <Typography>Time: 00:30:00</Typography>
            </div>
            <Button variant='contained' onClick={() => props.swiftPage(1)}>Начать</Button>
        </Paper>
    )
}


export function TaskView() {
    const [state, setState] = React.useState<number>(-1);   // -1 - not started; 0 - in progress; 1 - finished
    const [currentTask, setCurrentTask] = React.useState<number>(0);

    const hashes = [
        'TxtInt-W:200px.H:200px.X:282.Y:197.TXT:Lorem ipdddsum.TC:#f2f'
    ];

    const handleSwiftPage = (value: number) => {
        setState(state + value);
    }

    const renderPage = (hash: string) => {
        switch(state) {
            case -1: {
                return <PreviewPage swiftPage={handleSwiftPage} />
            }
            case 0: {
                return <TaskPage hash={hash} />
            }
            case 1: {
                return <ConclusionPage />
            }
            default: {
                return <Typography>Something went wrong</Typography>
            }
        }
    }

    return (
        <MainLayout paddingMain='ALL'>
            <div style={{width: '100%', height: '100%', backgroundColor: 'rgb(230, 230, 255)'}}>
            <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {renderPage(hashes[currentTask] ?? '')}
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '3%'}}>
                <Button variant='contained' onClick={() => setCurrentTask(currentTask - 1)}>Назад</Button>
                <Button variant='contained' onClick={() => setCurrentTask(currentTask + 1)}>Далее</Button>
            </div>
            <div style={{width: '0', height: '0'}} id='PropertiesAreaPlaceholder'></div>
            </div>
        </MainLayout>
    )
}