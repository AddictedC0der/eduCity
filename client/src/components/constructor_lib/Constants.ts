import AddIcon from '@mui/icons-material/Add';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IC from './interactive_components';
import shortid from 'shortid';
import * as Types from './types';
import { TextInteractivePropertiesInitial } from './interactive_components/TextInteractive';
import { BaseInteractivePropertiesInitial } from './interactive_components/BaseInteractive';
import { CheckboxInteractivePropertiesInitial } from './interactive_components/CheckboxInteractive';
import { ButtonInteractivePropertiesInitial } from './interactive_components/ButtonInteractive';


export const initialConstructorState: Types.IConstructorState = {
    totalPages: 1,
    currentPage: 1,
    selectedComponent: ''
}



export const tools: Types.ToolType[] = [
    {id: 'TxtInt', icon: TextFieldsIcon, tooltip: 'Текст', Component: IC.TextInteractive,
        PropertiesArea: IC.TextInteractivePropertiesArea, PropertiesInitial: TextInteractivePropertiesInitial},
    {id: 'BtnInt', icon: SmartButtonIcon, tooltip: 'Кнопка', Component: IC.ButtonInteractive,
        PropertiesArea: IC.ButtonInteractivePropertiesArea, PropertiesInitial: ButtonInteractivePropertiesInitial},
    {id: 'CbxInt', icon: CheckBoxIcon, tooltip: 'Флажок', Component: IC.CheckboxInteractive,
        PropertiesArea: IC.CheckboxInteractivePropertiesArea, PropertiesInitial: CheckboxInteractivePropertiesInitial}
]


export function findToolById(id: string): Types.ToolType | undefined {
    return tools.find(tool => tool.id === id);
}


export const CodeTable = {
    Components: {
        'TextInteractive': 'TxtInt',
        'ButtonInteractive': 'BtnInt',
        'CheckboxInteractive': 'CbxInt'
    },
    Properties: {
        X: 'X',
        Y: 'Y',
        Width: 'W',
        Height: 'H',
        BackgroundColor: 'BC',
        TextColor: 'TC',
        Text: 'TXT',
        Checked: 'CHD'
    },
    PropertiesGroups: {
        Base: ['Width', 'Height', 'X', 'Y'],
        Local: ['BackgroundColor', 'TextColor', 'Text', 'Checked']
    },
    Constructors: {
        'TxtInt': IC.TextInteractive,
        'BtnInt': IC.ButtonInteractive,
        'CbxInt': IC.CheckboxInteractive
    }   
}

export function ShortcutToProperty(shortcut: string): string | undefined {
    return Object.keys(CodeTable.Properties).find(key => (CodeTable.Properties as any)[key] === shortcut);
}