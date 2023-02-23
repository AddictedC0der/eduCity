import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import * as Constants from '../Constants';
import { useConstructorStore } from '../../../hooks/useConstructorStore';
import { ComponentsRepository } from '../ComponentsRepository';
import shortid from 'shortid';
import * as Types from '../types';


export function ConstructorCanvas(props: Types.CanvasProps) {
    const canvasRef = React.useRef(null);

    const [demo, setDemo] = React.useState(0)

    const selectedComponent = useConstructorStore(props.store, React.useCallback((state: Types.IConstructorState) => state.selectedComponent, []));
    const currentPage = useConstructorStore(props.store, React.useCallback((state: Types.IConstructorState) => state.currentPage, []));

    React.useEffect(() => {
        document.addEventListener('keyup', handleDeleteComponent);
        return () => document.removeEventListener('keyup', handleDeleteComponent);
    }, [])

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'interactiveComponent',
        canDrop: () => true,
        drop: (item: any, monitor: DropTargetMonitor) => spawnComponent(item, monitor),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    }), [])

    const handleDeleteComponent = (event: KeyboardEvent) => {
        if (selectedComponent && event.key === 'Delete') {
            console.log('Deleting component...')
            props.repo.deleteComponent(selectedComponent);
            props.store.setState((prev: Types.IConstructorState) => ({...prev, selectedComponent: null}))
        }
    }

    const spawnComponent = (item: any, monitor: DropTargetMonitor) => {
        const tool = Constants.tools.find(element => element.id === item.id);
        if (tool) {
            const boundries = ((props.canvasRef.current as unknown) as HTMLElement).getBoundingClientRect();
            const dropPos = monitor.getClientOffset() ?? {x: boundries.x, y: boundries.y};
            const position = {X: dropPos.x - boundries.x, Y: dropPos.y - boundries.y};
            
            props.repo.createComponent(tool, props.canvasRef, position, 'I');
        }
    }

    return (
        <Paper elevation={5} ref={props.canvasRef} sx={{width: '100%', height: '90%'}}>
            <div style={{width: '65.6%', height: '90%', position: 'absolute'}} id='absolute_parent'>
                <div ref={drop} style={{width: '100%', height: '100%'}}>
                    <Typography>This is canvas {currentPage}</Typography>
                    <button onClick={() => setDemo(demo + 1)}>Force rerender</button>
                    {props.repo.renderComponents()}
                </div>
            </div>
        </Paper>
    )
}