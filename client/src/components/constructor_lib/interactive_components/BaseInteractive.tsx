import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, FormControlLabel, List, ListItem, TextField } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox, ResizeCallbackData } from 'react-resizable';
import * as Types from '../types';


export const BaseInteractivePropertiesInitial: Types.IBaseInteractiveProperties = {
    Base: {
        Width: '200px',
        Height: '200px',
        X: 0,
        Y: 0
    }
}


export function BasePropertiesArea(props: {properties: any}) {
    const properties = props.properties

    const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedData = {Base: {...properties.Properties.Base, Width: event.target.value}}
        properties.setProperties(formattedData)
    }

    const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedData = {Base: {...properties.Properties.Base, Height: event.target.value}}
        properties.setProperties(formattedData)
    }

    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedData = {Base: {...properties.Properties.Base, X: parseInt(event.target.value)}}
        properties.setProperties(formattedData);
    }

    const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedData = {Base: {...properties.Properties.Base, X: parseInt(event.target.value)}}
        properties.setProperties(formattedData);
    }

    return (
        <List>
            <ListItem>
                <FormControlLabel control={<TextField sx={{width: '90%'}} value={properties.Properties.Base.Width} onChange={handleChangeWidth} />}
                                labelPlacement='start' label={'Ширина'} id='Width' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<TextField sx={{width: '90%'}} value={properties.Properties.Base.Height} onChange={handleChangeHeight} />}
                                labelPlacement='start' label={'Высота'} id='Height' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<TextField sx={{width: '90%'}} value={properties.Properties.Base.X} onChange={handleChangeX} />}
                                labelPlacement='start' label={'X'} id='X' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<TextField sx={{width: '90%'}} value={properties.Properties.Base.Y} onChange={handleChangeY} />}
                                labelPlacement='start' label={'Y'} id='Y' />
            </ListItem>
        </List>
    )
}


export class BaseInteractive extends React.Component<
                {children?: React.ReactNode,
                onSelect: () => void,
                onDeselect: () => void,
                parent: any,
                properties: any,
                propertiesArea: any,
                propertiesChangeHandler: (transferObj: Types.IBaseInteractiveProperties) => void}, Types.IStateInteractive> {
    children: React.ReactNode
    onSelect: () => void
    onDeselect: () => void
    parent: any
    wrapperRef: any
    properties: any
    propertiesChangeHandler: (transferObj: Types.IBaseInteractiveProperties) => void
    PropertiesArea: any

    constructor(props: any) {
        super(props);
        this.state = {
            selected: false,
            properties: {...props.properties}
            
        }
        this.children = props.children;
        this.onSelect = props.onSelect;
        this.onDeselect = props.onDeselect;
        this.wrapperRef = React.createRef();
        this.parent = props.parent;
        this.propertiesChangeHandler = props.propertiesChangeHandler;
        this.PropertiesArea = props.propertiesArea

        this.selectSelf = this.selectSelf.bind(this);
        this.deselectSelf = this.deselectSelf.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.changePosition = this.changePosition.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.parent.current.contains(event.target)) {
            this.deselectSelf()
        } else {
            if (this.wrapperRef && this.wrapperRef.current.contains(event.target)) {
                this.selectSelf()
            }
        }
    }

    selectSelf() {
        this.onSelect();
        this.setState({selected: true});
    }

    deselectSelf() {
        this.onDeselect();
        this.setState({selected: false});
    }

    changeSize(event: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) {
        const formattedData = {Width: data.size.width.toString() + 'px', Height: data.size.height.toString() + 'px',
                                X: this.state.properties.Base.X, Y: this.state.properties.Base.Y}
        this.setState({properties: {Base: {...formattedData}}});
        this.propertiesChangeHandler({Base: {...formattedData}});
    }

    changePosition(event: any, ui: any) {
        this.setState({
            properties: {Base: {
                X: this.state.properties.Base.X + ui.deltaX,
                Y: this.state.properties.Base.Y + ui.deltaY,
                Width: this.state.properties.Base.Width,
                Height: this.state.properties.Base.Height
            }}
        })
        this.propertiesChangeHandler(this.state.properties);
    }

    render() {
        const PropertiesArea = ReactDOM.createPortal(
            <this.PropertiesArea />,
            //@ts-ignore
            document.getElementById('PropertiesAreaPlaceholder')
        )
        return (
            <>
            {this.state.selected ? PropertiesArea : null}
            <Draggable handle='#handle' bounds='parent' onDrag={this.changePosition} position={{x: this.state.properties.Base.X, y: this.state.properties.Base.Y}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', width: this.state.properties.Base.Width, height: this.state.properties.Base.Height}}>
                    {this.state.selected ?
                    <div ref={this.wrapperRef} aria-label='InteractivePlaceholder'>
                        <div id='handle' style={{backgroundColor: 'green', width: '10px', height: '10px'}} />
                        <ResizableBox style={{display: 'flex', justifyContent: 'flex-end',
                                    alignItems: 'flex-end', border: '1px solid green'}}
                                    width={parseInt(this.state.properties.Base.Width)} height={parseInt(this.state.properties.Base.Height)}
                                    resizeHandles={['se']}
                                    handle={<div style={{backgroundColor: 'black', width: '10px', height: '10px'}} />} 
                                    onResize={this.changeSize}>
                            <div style={{width: '100%', height: '100%'}}>
                                {this.children}
                            </div>
                        </ResizableBox>
                    </div> : 
                    <div ref={this.wrapperRef} style={{width: this.state.properties.Base.Width, height: this.state.properties.Base.Height}}>
                        {this.children}
                    </div>
                    }
                </div>
            </Draggable>
            </>
        )
    }
}
