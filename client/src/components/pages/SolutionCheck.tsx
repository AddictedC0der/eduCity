import { Box, Button, Pagination, Paper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConstructorStore } from '../../hooks/useConstructorStore';
import { SolutionService } from '../../http/solutionAPI';
import { IRealSolution } from '../../models/solution.model';
import { Serializer } from '../constructor_lib/algorithms/serialization';
import { createConstructorStore } from '../constructor_lib/Session';
import { MainLayout } from '../layouts/MainLayout';


interface SummaryProps {
    points: number[];
    solutionId: number;
}


function Summary(props: SummaryProps) {
    const acquired = props.points.reduce((a, b) => {return a + b});
    const maximum = 10*props.points.length;
    
    const renderMark = (fraction: number) => {
        if (fraction > 0.85)
            return 5;
        if (fraction > 0.7)
            return 4;
        if (fraction > 0.55)
            return 3;
        return 2;
    }

    const navigate = useNavigate();

    const assessWork = () => {
        SolutionService.assessSolution(props.solutionId, (acquired/maximum).toString());
    }

    return (
        <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant='h4'>{acquired}/{maximum}</Typography>
            <Typography variant='h2'>{renderMark(acquired/maximum)}</Typography>
            <Button onClick={assessWork}>Поставить</Button>
        </Box>
    )
}


export function SolutionCheck() {
    const [currentTask, setCurrentTask] = React.useState<number>(0);
    const [points, setPoints] = React.useState<number[]>([]);

    const canvasRef = React.useRef();
    const store = createConstructorStore({totalPages: 1, selectedComponent: null, currentPage: 1});
    const location = useLocation();
    const solution = (location.state as {solution: IRealSolution}).solution;
    const serializer = new Serializer();
    
    const [repo, setRepo] = React.useState(serializer.deserialize(solution.Content, canvasRef, store, 'U'));
    const [renderPointsPanel, setRenderPointsPanel] = React.useState<boolean>(false);

    const handleChangePage = (event: any, newValue: number) => {
        setCurrentTask(newValue);
        repo._store.setState(state => {return {...state, currentPage: newValue}})
    }

    const handleCorrect = () => {
        setPoints([...points, 10]);
        repo.shiftPage(1);
        
    }

    const handleIncorrect = () => {
        setPoints([...points, 0]);
        repo.shiftPage(1);
    }

    const handlePartial = (phase: number, newValue?: string) => {
        if (phase === 0) {
            setRenderPointsPanel(true);
        } else {
            setRenderPointsPanel(false);
            setPoints([...points, parseInt(newValue!)]);
            repo.shiftPage(1);
        }
    }

    console.log(repo._store.getState())

    return (
        <MainLayout paddingMain='ALL'>
            {repo._store.getState().currentPage <= solution.Content.tasks.length ? (
                <Box sx={{width: '100%', height: '100vh'}}>
                    <Paper elevation={5} sx={{width: 'inherit', height: 'inherit'}}>
                        <Box sx={{width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Pagination count={solution.Content.tasks.length} page={currentTask} onChange={handleChangePage} />
                        </Box>
                        <Box sx={{position: 'absolute'}} ref={canvasRef}>
                            {repo.renderComponents()}
                        </Box>
                    </Paper>
                    <Box id='controls' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <div style={{width: '60%', display: 'flex', justifyContent: 'center'}}>
                            <Button variant='contained'>Назад</Button>
                        </div>
                        
                        <div style={{width: '40%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Button onClick={handleIncorrect} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'DarkRed'}}}>Неверно</Button>
                            <Button onClick={handleCorrect} sx={{backgroundColor: 'OliveDrab', color: 'white', '&:hover': {backgroundColor: 'SaddleBrown'}}}>Верно</Button>
                            <Button onClick={() => handlePartial(0)} sx={{backgroundColor: 'gray', color: 'white', '&:hover': {backgroundColor: 'DarkGray'}}}>Частично</Button>
                            {renderPointsPanel ? (
                                <>
                                <TextField sx={{width: '10%'}} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePartial(1, event.target.value)} value={points[repo._store.getState().currentPage - 1] ?? 0} id="standard-basic" label="Баллы" variant="standard" />
                                <Typography sx={{height: '100%', display: 'flex', alignItems: 'flex-end'}}>/10</Typography>
                                </>
                            ) : null}
                        </div>
                        
                    </Box>
                </Box>
            ) : <Summary points={points} solutionId={solution.id} />}
            
            
        </MainLayout>
    )

}
