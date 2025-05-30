import * as React from 'react';
import { Checkbox, FormControlLabel, List, ListItem, TextField } from '@mui/material';
import { BaseInteractive, BaseInteractivePropertiesInitial, BasePropertiesArea } from './BaseInteractive';
import { MuiColorInput } from 'mui-color-input'
import * as Types from '../types';
import * as Constants from '../Constants';


export const CheckboxInteractivePropertiesInitial: Types.ICheckboxInteractiveProperties = {
    ...BaseInteractivePropertiesInitial,
    Local: {
        Text: 'Lorem ipsum...',
        TextColor: 'black',
        Checked: false
    }
}


const PropertiesContext = React.createContext<Types.IPropertiesContext>(
    {
        Properties: {...CheckboxInteractivePropertiesInitial},
        setProperties: (obj: Types.IPropertiesLike) => {}
    }
)


export function CheckboxInteractivePropertiesArea() {
    const properties = React.useContext(PropertiesContext);

    const handleChangeProperty = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        let temp = {Local: {...properties.Properties.Local}}
        //@ts-ignore
        temp.Local[key] = event.target.value
        properties.setProperties(temp)
    }

    const handleChangeColor = (newValue: string) => {
        if (newValue) {
            properties.setProperties({Local: {...properties.Properties.Local, TextColor: newValue}})
        }
    }

    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        properties.setProperties({Local: {...properties.Properties.Local, Checked: event.target.checked}})
    }

    return (
        <List component='ul'>
            <BasePropertiesArea properties={properties} />
            <ListItem>
                <FormControlLabel control={<TextField value={properties.Properties.Local.Text}
                                onChange={(e: any) => handleChangeProperty(e, 'Text')} />} labelPlacement='start' label={'Текст'} id='Text' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<MuiColorInput value={properties.Properties.Local.TextColor}
                                onChange={handleChangeColor} />} labelPlacement='start' label={'Цвет текста'} id='TextColor' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<Checkbox checked={properties.Properties.Local.Checked}
                                onChange={handleChangeChecked} />} labelPlacement='start' label={'Установлен'} id='Checked' />
            </ListItem>
        </List>
    )
}


export function CheckboxInteractiveInner(props: any) {
    const properties = React.useContext(PropertiesContext);

    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        properties.setProperties({Local: {...properties.Properties.Local, Checked: event.target.checked}})
    }

    const shift = props.way !== 'I' ? {
        left: properties.Properties.Base.X,
        top: properties.Properties.Base.Y,
    } : {}

    return (
        <FormControlLabel control={<Checkbox checked={properties.Properties.Local.Checked} onChange={handleChangeChecked} />} label={properties.Properties.Local.Text}
                        sx={{height: props.way === 'I' ? '100%' : properties.Properties.Base.Height, width: props.way === 'I' ? '100%' : properties.Properties.Base.Width,
                            position: 'absolute',
                            ...shift
                        }} />
    )
}


export class CheckboxInteractive extends React.Component<any, Types.IPropertiesLike> {
    onSelect: () => void
    onDeselect: () => void
    onPropertyChange: (transferObj: Types.IPropertiesLike) => void;
    parent: any
    properties: any
    way: 'I' | 'U'

    constructor(props: any) {
        super(props);

        this.properties = props.properties
        this.state = {...this.properties}
        
        this.way = props.way;
        this.onSelect = props.onSelect;
        this.onDeselect = props.onDeselect;
        this.onPropertyChange = props.onPropertyChange;
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
        this.parent = props.parent;
    }

    handlePropertyChange(transferObj: Types.IPropertiesLike | Types.IBaseInteractiveProperties) {
        this.setState(transferObj as Types.IPropertiesLike);
        this.onPropertyChange(transferObj as Types.IPropertiesLike);
    }

    render() {
        return (
            <PropertiesContext.Provider value={{Properties: this.state, setProperties: this.handlePropertyChange}}>
                {this.way === 'I' ? (
                <BaseInteractive onSelect={this.onSelect} onDeselect={this.onDeselect} parent={this.parent}
                                propertiesChangeHandler={this.handlePropertyChange} properties={{Base: this.state.Base}}
                                propertiesArea={CheckboxInteractivePropertiesArea}>
                    <CheckboxInteractiveInner way={this.way} />
                </BaseInteractive>
                ) : <CheckboxInteractiveInner way={this.way} />}
            </PropertiesContext.Provider>
        )
    }
}