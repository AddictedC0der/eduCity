import * as React from 'react';
import * as Types from '../types';
import * as Constants from '../Constants';
import shortid from 'shortid';
import { ComponentsRepository } from '../ComponentsRepository';
import { createConstructorStore } from '../Session';

/*
    Hash example: TxtInt-W:200px.H:200px.X:282.34375.Y:197.1875.TXT:Lorem ipsum.TC:#000000
    Hash template: T-P/T-P/T-P
    T - Component type (Txt, Btn, Cbx...)
    P - Component properties (W:30.H:20.BC:#fff.TC:#000)

    Legend:
    Width - W
    Height - H
    BackgroundColor - BC
    TextColor - TC
    Checked - Cd
    Text - Txt
*/


function _readProperties(properties: Types.IPropertiesLike): string {
    function _readArray(arrOfDescriptors: string[], dataTrasferObj: any): string {
        let temp: string = ''
        for (let p = 0; p < arrOfDescriptors.length; p++) {
            //@ts-ignore
            const processedName = Constants.CodeTable.Properties[arrOfDescriptors[p]];
            const chunk = `${processedName}⏵${dataTrasferObj[arrOfDescriptors[p]]}⍮`;
            temp += chunk;
        }
        return temp;
    }

    let result: string = '';
    const baseProperties = Object.getOwnPropertyNames(properties.Base);
    const localProperties = Object.getOwnPropertyNames(properties.Local);
    
    result += _readArray(baseProperties, properties.Base);
    result += _readArray(localProperties, properties.Local);

    result = result.slice(0, -1);
    return result;
}

function _createProperties(descriptor: string): Types.IPropertiesLike | null {
    try {
        //@ts-ignore
        let response: Types.IPropertiesLike = {Base: {}, Local: {}};
        const chunks = descriptor.split('⍮');
        for (let i = 0; i < chunks.length; i++) {
            const [key, value] = chunks[i].split('⏵');
            const property = Constants.ShortcutToProperty(key) as string;
            if (Constants.CodeTable.PropertiesGroups.Base.find(e => e === property.toString())) {
                //@ts-ignore
                response.Base[property] = value;
            } else {
                //@ts-ignorev
                response.Local[property] = value;
            }
        }
        return response;
    } catch(e) {
        console.log(e);
    }
    return null;
    
}


export function SerializeUI(repository: Types.RepositoryElement[][]): string[] {
    const response: string[] = [];
    let currentPage: string = '';
    for (let page = 0; page < repository.length; page++) {
        for (let e = 0; e < repository[page].length; e++) {
            //@ts-ignore
            const comp = repository[page][e].component.type.name;
            const T = (Constants.CodeTable.Components as any)[comp];
            const properties = repository[page][e].properties;
            const processedProperties = _readProperties(properties);
            const chunk = `${T}⇝${processedProperties}⁂`;
            currentPage += chunk;
        }
        currentPage = currentPage.slice(0, -1);
        response.push(currentPage);
        currentPage = '';
    }
    return response;
}


function _createComponent(descriptor: string, repo: any, parent: any) {
    const T = descriptor.split('⇝')[0];
    const tool = Constants.findToolById(T) as Types.ToolType;
    const properties = _createProperties(descriptor.split('⇝')[1]);
    if (!properties) return;
    const component = repo.createComponent(tool, parent, {X: properties.Base.X, Y: properties.Base.Y}, 'U', properties);
}


function _isHashValid(hash: string) {
    // const pattern = /\w{1,}[⇝](\w{1,}[:].{1,}.){1,}/;
    // const res = hash.match(pattern) ?? '';
    // if (res[0].length === hash.length) return true;
    // throw new Error('Invalid hash');
    return true
}

export function DeserializeUI(hashes: string[], parent: any): any {
    try {
        const store = React.useMemo(() => createConstructorStore({...Constants.initialConstructorState, totalPages: hashes.length}), []);
        const response = new ComponentsRepository(store);
        response.addPages();
        for (let i = 0; i < hashes.length; i++) {
            if (!_isHashValid(hashes[i])) return null;
            const components = hashes[i].split('⁂');
            for (let i = 0; i < components.length; i++) {
                _createComponent(components[i], response, parent);
            }
        }
        return response;
    } catch(e) {
        console.log(e);
        return;
    }
    
}