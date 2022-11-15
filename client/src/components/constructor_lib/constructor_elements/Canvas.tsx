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
            const boundries = ((canvasRef.current as unknown) as HTMLElement).getBoundingClientRect();
            const dropPos = monitor.getClientOffset() ?? {x: boundries.x, y: boundries.y};
            const position = {X: dropPos.x - boundries.x, Y: dropPos.y - boundries.y};
            
            props.repo.createComponent(tool, canvasRef, position, 'I');
        }
    }

    return (
        <Paper ref={canvasRef} sx={{width: '100%', height: '90%', position: 'relative',
                webkitBoxShadow: '0px 3px 8px 6px rgba(34, 60, 80, 0.2)',
                mozBoxShadow: '0px 3px 8px 6px rgba(34, 60, 80, 0.2)',
                boxShadow: '0px 3px 8px 6px rgba(34, 60, 80, 0.2)'}}>
            <div ref={drop} style={{width: '100%', height: '100%'}}>
                <Typography>This is canvas {currentPage}</Typography>
                {props.repo.renderComponents()}
            </div>
        </Paper>
    )
}