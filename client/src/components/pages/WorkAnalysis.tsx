import { Box, Button, List, ListItem, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConstructorService } from '../../http/constructorAPI';
import { SolutionService } from '../../http/solutionAPI';
import { ITask, IWork } from '../../models/constructor.model';
import { IRealSolution, ISolution } from '../../models/solution.model';
import { MainLayout } from '../layouts/MainLayout';


interface TabProps {
    index: number;
    value: number;
    work: IWork & {id: number};
}


function SolutionsTab(props: TabProps) {
    const [solutions, setSolutions] = React.useState<IRealSolution[]>();

    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            const solutions = await (await SolutionService.getWorkSolutions(props.work.id)).data;
            setSolutions(solutions);
        }
        fetchData();
    }, [])

    const handleClick = (solution: IRealSolution) => {
        navigate(`/solutions/${solution.id}`, {state: {solution: solution}});
    }

    const renderMark = (fraction: number) => {
        if (fraction > 0.85)
            return 5;
        if (fraction > 0.7)
            return 4;
        if (fraction > 0.55)
            return 3;
        return 2;
    }

    console.log(solutions)

    return (
        props.index === props.value ? (
            solutions ? (
                <Box sx={{width: '100%', height: '100%'}}>
                    <List>
                        {solutions.map(solution => {return (
                            <ListItem key={solution.id}>
                                <Button onClick={() => handleClick(solution)} sx={{width: '100%', height: '5vh', backgroundColor: 'rgb(240, 240, 240)', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <Typography>{solution.Author.UserLogin}</Typography>
                                    <Typography>{renderMark(parseFloat(solution.Rating))}</Typography>
                                </Button>
                                
                            </ListItem>
                        )})}
                    </List>
                </Box>
            ) : <Skeleton variant='rectangular' width={500} height={500} />
            
        ) : null
        
    )
}


function MainTab(props: TabProps) {
    const privacyDescriptor = {'ME': 'меня', 'CLASS': 'ваших классов', 'ALL': 'всех'}
    
    const renderTime = (time: number | string) => {
        if (typeof time === 'string') {
            return 'Безлимитно'
        }
        const SECOND = 1000;
        const MINUTE = 60*SECOND;
        const HOUR = 60*MINUTE;
        
        const hours = Math.floor(time / HOUR);
        const minutes = Math.floor((time - hours*HOUR) / MINUTE);
        const seconds = Math.floor((time - hours*HOUR - minutes*MINUTE) / SECOND);
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        props.index === props.value ? (
            <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center'}}>
                <Box sx={{marginTop: '10%'}}>
                {/* @ts-ignore */}
                <Typography>Автор: {props.work.Author.UserLogin}</Typography>
                <Typography>Задание доступно для {(privacyDescriptor as any)[props.work.Privacy]}</Typography>
                <Typography>Время на выполнение: {renderTime(props.work.Time ?? '')}</Typography>
                <Typography>Добавочное время: {renderTime(props.work.AdditionalTime ?? '')}</Typography>
                <Typography>Сложность: {props.work.Difficulty}/10</Typography>           
                </Box>
            </Box>
        ) : null
    )
}


export function WorkAnalysis() {
    const [currentTab, setCurrentTab] = React.useState<number>(0);

    const location = useLocation()

    const [data, setData] = React.useState<{work: IWork & {id: number}, tasks: ITask[]}>();
    

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await ConstructorService.getWorkById((location.state as {classId: string}).classId)).data;
            setData(data);
        }
        fetchData();
    }, [])

    console.log(data);
    return (
        data ? (
            <MainLayout paddingMain='ALL'>
                <Box sx={{width: '100%', height: '100vh'}}>
                    <Paper elevation={5} sx={{width: '100%', height: '100%'}}>
                        <Box sx={{width: 'inherit', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <Typography variant='h4'>{data.work.Name}</Typography>
                            {/* @ts-ignore */}
                            <Typography variant='h6' sx={{color: 'rgb(180, 180, 180)'}}>{data.work.Category.SubjectName}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 'inherit', height: 'inherit'}}>
                            <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} >
                                <Tab label='Общая информация' />
                                <Tab label='Решения' />
                            </Tabs>
                            <MainTab index={0} value={currentTab} work={data.work} />
                            <SolutionsTab index={1} value={currentTab} work={data.work} />
                        </Box>
                    </Paper>
                </Box>
            </MainLayout>
        ) : (
            <Skeleton variant='rectangular' width={500} height={500} />
        )
        
    )
}