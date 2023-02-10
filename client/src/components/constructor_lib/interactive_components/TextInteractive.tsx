import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TextField, List, ListItem, FormControlLabel } from '@mui/material';
import { BaseInteractive, BaseInteractivePropertiesInitial, BasePropertiesArea } from './BaseInteractive';
import { MuiColorInput } from 'mui-color-input'
import * as Types from '../types';
import * as Constants from '../Constants';


export const TextInteractivePropertiesInitial: Types.IPropertiesLike = {
    ...BaseInteractivePropertiesInitial,
    Local: {
        Text: 'Lorem ipsum...',
        TextColor: '#000000'
    }
}


const PropertiesContext = React.createContext<Types.IPropertiesContext>(
    {
        Properties: {...TextInteractivePropertiesInitial},
        setProperties: (obj: Types.IPropertiesLike) => {}
    }
)


export function TextInteractivePropertiesArea() {
    const properties = React.useContext(PropertiesContext);

    const handleChangeColor = (newValue: string) => {
        if (newValue) {
            properties.setProperties({Local: {...properties.Properties.Local, TextColor: newValue}})
        }
    }

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        properties.setProperties({Local: {...properties.Properties.Local, Text: event.target.value}})
    }

    return (
        <List component='ul'>
            <BasePropertiesArea properties={properties} />
            <ListItem>
                <FormControlLabel control={<TextField value={properties.Properties.Local.Text} onChange={handleChangeText} />}
                                labelPlacement='start' label={'Текст'} id='Text' />
            </ListItem>
            <ListItem>
                <FormControlLabel control={<MuiColorInput value={properties.Properties.Local.TextColor} onChange={handleChangeColor} />}
                                labelPlacement='start' label={'Цвет текста'} id='TextColor' />
            </ListItem>
        </List>
    )
}


export function TextInteractiveInner(props: any) {
    const properties = React.useContext(PropertiesContext);

    const handleManualChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        properties.setProperties({Local: {...properties.Properties.Local, Text: event.target.value}})
        // props.propertiesChangeHandler({Local: {Text: event.target.value}})
    }

    const shift = props.way !== 'I' ? {
        left: properties.Properties.Base.X,
        top: properties.Properties.Base.Y,
    } : {}

    return (
        <TextField multiline fullWidth={props.inter} value={properties.Properties.Local.Text} onChange={handleManualChange}
            inputProps={{style: {color: properties.Properties.Local.TextColor}}}
            sx={{height: props.way === 'I' ? '100%' : properties.Properties.Base.Height, width: props.way === 'I' ? '100%' : properties.Properties.Base.Width,
            position: 'absolute',
            ...shift
        }} />
    )
}


export class TextInteractive extends React.Component<any, Types.IPropertiesLike> {
    onSelect: () => void
    onDeselect: () => void
    parent: any
    // onPropertyChange: () => void
    way: 'I' | 'U'
    properties: Types.IPropertiesLike
    
    constructor(props: any) {
        super(props);

        this.properties = props.properties
        this.state = {...this.properties};
        console.log(this.state)

        this.way = props.way;
        // this.onPropertyChange = props.onPropertyChange;
        this.onSelect = props.onSelect;
        this.onDeselect = props.onDeselect;
        this.parent = props.parent;
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
    }

    handlePropertyChange(transferObj: Types.IPropertiesLike | Types.IBaseInteractiveProperties) {
        this.setState(transferObj as Types.IPropertiesLike);
        // this.onPropertyChange()
    }

    render() {
        return (
            
                <PropertiesContext.Provider value={{Properties: this.state, setProperties: this.handlePropertyChange}}>
                    {this.way === 'I' ? (
                    <BaseInteractive onSelect={this.onSelect} onDeselect={this.onDeselect} parent={this.parent}
                                propertiesChangeHandler={this.handlePropertyChange} properties={{Base: this.state.Base}}
                                propertiesArea={TextInteractivePropertiesArea}>
                        <TextInteractiveInner way={this.way} />
                    </BaseInteractive>
                    ) : <TextInteractiveInner way={this.way} />}
                </PropertiesContext.Provider>
        )
    }
}