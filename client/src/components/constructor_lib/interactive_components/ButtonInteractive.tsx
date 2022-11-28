import * as React from 'react';
import { Button, List, ListItem, FormControlLabel, TextField } from '@mui/material';
import { BaseInteractive, BaseInteractivePropertiesInitial, BasePropertiesArea } from './BaseInteractive';
import { MuiColorInput } from 'mui-color-input'
import * as Types from '../types';
import * as Constants from '../Constants';


export const ButtonInteractivePropertiesInitial: Types.IButtonInteractiveProperties = {
    ...BaseInteractivePropertiesInitial,
    Local: {
        Text: 'Lorem ipsum...',
        BackgroundColor: 'blue',
        TextColor: 'white'
    }
}


const PropertiesContext = React.createContext<Types.IPropertiesContext>(
    {
        Properties: {...ButtonInteractivePropertiesInitial},
        setProperties: (obj: Types.IPropertiesLike) => {}
    }
)


export function ButtonInteractivePropertiesArea() {
    const properties = React.useContext(PropertiesContext);

    const handleChangeProperty = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        let temp = {Local: {...properties.Properties.Local}}
        //@ts-ignore
        temp.Local[key] = event.target.value
        properties.setProperties(temp)
    }
    
    const handleChangeTextColor = (newValue: string) => {
        if (newValue) {
            properties.setProperties({Local: {...properties.Properties.Local, TextColor: newValue}})
        }
    }
    const handleChangeBackgroundColor = (newValue: string) => {
        if (newValue) {
            properties.setProperties({Local: {...properties.Properties.Local, BackgroundColor: newValue}})
        }
    }

    return (
        <List component='ul'>
            <BasePropertiesArea properties={properties} />
            <ListItem>
                <FormControlLabel control={<TextField value={properties.Properties.Local.Text}
                                onChange={(e: any) => handleChangeProperty(e, 'Text')} />} label={'Текст'} id='Text' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<MuiColorInput value={properties.Properties.Local.TextColor} 
                                onChange={handleChangeTextColor} />} label={'Цвет текста'} id='TextColor' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<MuiColorInput value={properties.Properties.Local.BackgroundColor} 
                                onChange={handleChangeBackgroundColor} />} label={'Цвет фона'} id='BackgroundColor' />
            </ListItem>
        </List>
    )
}


export function ButtonInteractiveInner() {
    const properties = React.useContext(PropertiesContext);

    const handleManualChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        properties.setProperties({Local: {...properties.Properties.Local, Text: event.target.value}})
        // props.propertiesChangeHandler({Local: {Text: event.target.value}})
    }

    return (
        <Button variant='contained'
                sx={{height: '100%', width: '100%', backgroundColor: properties.Properties.Local.BackgroundColor,
                color: properties.Properties.Local.TextColor}}>
            {properties.Properties.Local.Text}
        </Button>
    )
}


export class ButtonInteractive extends React.Component<any, Types.IPropertiesLike> {
    onSelect: () => void
    onDeselect: () => void
    parent: any
    properties: any

    constructor(props: any) {
        super(props);

        this.properties = props.properties
        this.state = {...this.properties}
        this.onSelect = props.onSelect;
        this.onDeselect = props.onDeselect;
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
        this.parent = props.parent;
    }

    handlePropertyChange(transferObj: Types.IPropertiesLike | Types.IBaseInteractiveProperties) {
        this.setState(transferObj as Types.IPropertiesLike);
    }

    render() {
        return (
            <PropertiesContext.Provider value={{Properties: this.state, setProperties: this.handlePropertyChange}}>
                <BaseInteractive onSelect={this.onSelect} onDeselect={this.onDeselect} parent={this.parent}
                                propertiesChangeHandler={this.handlePropertyChange} properties={{Base: this.state.Base}}
                                propertiesArea={ButtonInteractivePropertiesArea}>
                    <ButtonInteractiveInner />
                </BaseInteractive>
            </PropertiesContext.Provider>
            
        )
    }
}