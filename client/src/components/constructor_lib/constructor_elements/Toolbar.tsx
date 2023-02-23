import * as React from 'react';
import { Box, List, ListItem, Button, Tabs, Tab } from '@mui/material';
import * as Constants from '../Constants';
import { useDrag, DragPreviewImage, DragSourceMonitor } from 'react-dnd';
import { TooltipWrapper } from '../../complex/Tooltip';
import { Backpack } from '@mui/icons-material';
import Presets from '../../../Assets/ui_presets.json';
import { Serializer } from '../algorithms/serialization';


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


function PresetIcon(props: ToolIconProps & {changeRepo: any, contents: any, parent: any, store: any}) {
    const handleClick = () => {
        props.changeRepo(props.contents)
    }

    return (
        <ListItem arial-label={`PresetIcon-${props.id}`}>
            <TooltipWrapper title={props.tooltip} placement='right'>
                <Button id={props.id} key={props.id} arial-label='PresetIconButton' onClick={handleClick}
                        sx={{width: '50%', backgroundColor: 'white', border: '3px solid #5CDB95', '&:hover': {backgroundColor: '#5CDB95'}, resize: 'both'}}>
                    <props.icon id={props.id} />
                </Button>
            </TooltipWrapper>
        </ListItem>
    )
}


interface TabProps {
    index: number;
    value: number;
    repo?: any
}


function ComponentsTab(props: TabProps) {
    const {index, value} = props;
    return (
        <div>
            {index === value && (
            <List aria-label='ToolBar-ToolsList'>
                {Constants.tools.map(tool => <ToolIcon key={tool.id} id={tool.id} icon={tool.icon} tooltip={tool.tooltip} />)}
            </List>
            )
            }
        </div>
        
    )
}


function PresetsTab(props: TabProps & {changeRepo: (newRepo: any) => void, parent: any, store: any}) {
    const handleChangeRepo = (newRepo: any) => {
        props.changeRepo(newRepo);
    }
    return (
        <div>
            {props.index === props.value && (
                Presets.Presets.map(e => { return (
                    <PresetIcon
                        key={`${e.Name}`}
                        store={props.store}
                        changeRepo={handleChangeRepo}
                        parent={props.parent}
                        contents={e.UI.Repo}
                        tooltip={e.Name}
                        id={e.Name}
                        icon={Backpack} />
                )  
                })
            )}
        </div>
    )
}


export function Toolbar(props: any) {
    const [tab, setTab] = React.useState<number>(0);

    return (
        <Box sx={{border: '1px solid black', width: '100%', height: '100%'}} aria-label='Toolbar-MainBox'>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label='Компоненты' / >
                <Tab label='Присеты' / >
            </Tabs>
            <ComponentsTab index={0} value={tab} />
            <PresetsTab index={1} value={tab} store={props.store} changeRepo={props.changeRepo} parent={props.parent} />
        </Box>
    )
}