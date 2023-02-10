import * as React from 'react';
import { Typography, Paper, Button, Skeleton } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { Serializer } from '../constructor_lib/algorithms/serialization';
import { useLocation , useNavigate} from 'react-router-dom';
import { RoutesEnum } from '../../router';
import { ConstructorService } from '../../http/constructorAPI';
import { useQuery } from '../../hooks/useQuery';
import { createConstructorStore } from '../constructor_lib/Session';
import { Timer } from '../complex/Timer';
import * as Constants from '../constructor_lib/Constants';


function ConclusionPage(props: any) {
    const navigate = useNavigate()
    return (
        <Paper elevation={8} sx={{width: '50%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Typography variant='h5'>Вы выполнели задание</Typography>
            <Button onClick={() => navigate(RoutesEnum.SUBJECTS)} variant='contained'>Вернуться к списку заданий</Button>
        </Paper>
    )
}


function TaskPage(props: any) {
    const canvasRef = React.createRef<HTMLDivElement>();
    const { work, tasks } = props.work;
    const serializer = new Serializer();
    const hashes = {pages: tasks.map((task: any) => {return task.TaskHashUi})}
    const store = createConstructorStore({...Constants.initialConstructorState, totalPages: hashes.pages.length});
    const repo = serializer.deserialize(hashes, canvasRef, store, 'U');
    console.log(repo)
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Timer value={work.Time} />
                <Typography sx={{marginLeft: '10%'}}>Задание 1/{tasks.length}</Typography>
            </div>
            <Paper ref={canvasRef} elevation={8} sx={{width: '90%', height: '100%'}}>
                {repo ?
                repo.renderComponents()
                : <Typography>Something went wrong!</Typography>}
            </Paper>
        </div>
    )
}


function PreviewPage(props: any) {
    const { work, tasks } = props.work;

    const renderTime = (time: number) => {
        if (time != null) {
            console.log(time)
            let hours = Math.floor(time / 3600000)
            let minutes = Math.floor((time - hours*3600000) / 6000)
            let seconds = (time - hours*3600000 - minutes*6000) / 1000
            console.log(hours, minutes, seconds)
            return `${hours}:${minutes}:${seconds}`
        }
        return 'Безлимитно'
    }

    return (
        <Paper elevation={8} sx={{width: '70%', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '100%', height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h5'>{work.Name}</Typography>
                <Typography sx={{color: 'gray'}}>{work.Category.SubjectName}</Typography>
            </div>
            <div style={{width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography>{tasks.length} заданий</Typography>
                <Typography>Время на выполнение: {renderTime(work.Time)}</Typography>
            </div>
            <Button variant='contained' onClick={() => props.swiftPage(1)}>Начать</Button>
        </Paper>
    )
}


export function TaskView() {
    const [state, setState] = React.useState<number>(-1);   // -1 - not started; 0 - in progress; 1 - finished
    const [currentTask, setCurrentTask] = React.useState<number>(1);
    const [work, setWork] = React.useState<{work: any, tasks: any}>();

    const query = useQuery();

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ConstructorService.getWorkById(query.get('id')!);
            console.log(data.data)
            setWork(data.data);
        }
        fetchData();
    }, [])

    const hashes = [
        'TxtInt-W:200px.H:200px.X:282.Y:197.TXT:Lorem ipdddsum.TC:#f2f'
    ];

    React.useEffect(() => {
        console.log(work)
    }, [work])

    const handleSwiftPage = (value: number) => {
        setState(state + value);
    }

    const renderPage = (hash: string) => {
        switch(state) {
            case -1: {
                return <PreviewPage work={work} swiftPage={handleSwiftPage} />
            }
            case 0: {
                return <TaskPage work={work} hash={hash} />
            }
            case 1: {
                return <ConclusionPage />
            }
            default: {
                return <Typography>Something went wrong</Typography>
            }
        }
    }

    const nextTask = (shift: number) => {
        if (shift > 0 && currentTask === work!.tasks.length) {
            handleSwiftPage(1);
        } else {
            if (shift < 0 && currentTask === 1) {
            } else {
                setCurrentTask(currentTask + shift);
            }
        } 
    }

    return (
        <MainLayout paddingMain='NONE'>
            { work ?
            <div style={{width: '100%', height: '100%', backgroundColor: 'rgb(230, 230, 255)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {renderPage(hashes[currentTask] ?? '')}
                </div>
                { state === 0 ?
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '3%'}}>
                        <Button variant='contained' onClick={() => nextTask(-1)}>Назад</Button>
                        <Button variant='contained' onClick={() => nextTask(1)}>Далее</Button>
                    </div> : null
                }                
                <div style={{width: '0', height: '0'}} id='PropertiesAreaPlaceholder'></div>
            </div>
            : <Skeleton width='100%' height='100%' />
            }
        </MainLayout>
    )
}