import * as React from 'react';
import * as Types from '../types';
import * as Constants from '../Constants';
import shortid from 'shortid';
import { ComponentsRepository } from '../ComponentsRepository';
import { createConstructorStore } from '../Session';


export interface ElementJSON {
    type: string;
    properties: Types.IPropertiesLike;
}

export interface PageJSON {
    elements: ElementJSON[];
    answer: any;
}

export interface InterfaceJSON {
    pages: PageJSON[];
}


export class Serializer {
    serialize(repo: Types.RepositoryElement[][]): InterfaceJSON {
        if (repo === undefined) {throw new Error('Serialization Error: Unable to serialize data when no UI repository provided.')}
        const response: InterfaceJSON = {pages: []};
        for (let i = 0; i < repo.length; i++) {
            const current: PageJSON = {elements: [], answer: ''}
            repo[i].map(e => {
                let target = (e.component.type as React.JSXElementConstructor<any>).name
                current.elements.push({
                    type: (Constants.CodeTable.Components as any)[target] as string,
                    properties: e.properties
                })
            })
            response.pages.push(current);
        }
        return response;
    }

    deserialize(dump: InterfaceJSON, parent: any, store: any, way: 'I' | 'U'): ComponentsRepository {
        console.log(dump)
        const response: ComponentsRepository = new ComponentsRepository(store);
        response.addPages();
        for (let i = 0; i < dump.pages.length; i++) {
            dump.pages[i].elements.map(e => {
                console.log(e.type)
                const tool = Constants.findToolById(e.type) as Types.ToolType;
                console.log(tool)
                response.createComponent(tool, parent, {X: e.properties.Base.X, Y: e.properties.Base.Y}, way, e.properties);
            })
        }
        return response;
    }
}
