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
}

export interface InterfaceJSON {
    tasks: PageJSON[];
}


export class Serializer {
    serialize(repo: Types.RepositoryElement[][]): InterfaceJSON {
        if (repo === undefined) {throw new Error('Serialization Error: Unable to serialize data when no UI repository provided.')}
        const response: InterfaceJSON = {tasks: []};
        for (let i = 0; i < repo.length; i++) {
            const current: PageJSON = {elements: []}
            repo[i].map(e => {
                let target = (e.component.type as React.JSXElementConstructor<any>).name
                current.elements.push({
                    type: (Constants.CodeTable.Components as any)[target] as string,
                    properties: e.properties
                })
            })
            response.tasks.push(current);
        }
        return response;
    }

    deserialize(dump: InterfaceJSON, parent: any, store: any, way: 'I' | 'U'): ComponentsRepository {
        const response: ComponentsRepository = new ComponentsRepository(store);
        response.addPages();
        for (let i = 0; i < dump.tasks.length; i++) {
            dump.tasks[i].elements.map(e => {
                const tool = Constants.findToolById(e.type) as Types.ToolType;
                response.createComponent(tool, parent, {X: e.properties.Base.X, Y: e.properties.Base.Y}, way, e.properties);
            })
        }
        return response;
    }
}
