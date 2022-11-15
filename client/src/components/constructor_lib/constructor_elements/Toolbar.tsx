import * as React from 'react';
import { Box, List, ListItem, Button } from '@mui/material';
import * as Constants from '../Constants';
import { useDrag, DragPreviewImage, DragSourceMonitor } from 'react-dnd';
import { TooltipWrapper } from '../../complex/Tooltip';


interface ToolIconProps {
    icon: any;
    id: string;
    tooltip: string;
}


function ToolIcon(props: ToolIconProps) {
    //@ts-ignore
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: 'interactiveComponent',
            item: {id: props.id},
            collector: (monitor: DragSourceMonitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }), []
    )
    
    return (
        <ListItem key={props.id} aria-label={`ToolIcon-${props.id}`}>
            <TooltipWrapper title={props.tooltip} placement='right'>
                <Button ref={drag} id={props.id} aria-label='ToolIconButton'
                        sx={{width: '50%', backgroundColor: 'white', border: '3px solid #5CDB95',
                            opacity: isDragging ? 0.5 : 1, '&:hover': {backgroundColor: '#5CDB95'}, resize: 'both'}}>
                    <props.icon id={props.id} />
                </Button>
            </TooltipWrapper>
        </ListItem>
    )
}


export function Toolbar() {
    return (
        <Box sx={{border: '1px solid black', width: '100%', height: '100%'}} aria-label='Toolbar-MainBox'>
            <List aria-label='ToolBar-ToolsList'>
                {Constants.tools.map(tool => <ToolIcon key={tool.id} id={tool.id} icon={tool.icon} tooltip={tool.tooltip} />)}
            </List>
        </Box>
    )
}