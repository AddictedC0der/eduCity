import * as React from 'react';
import * as Constants from './Constants';
import * as Types from './types';
import shortid from 'shortid';


export class ComponentsRepository {
    repository: Types.RepositoryElement[][];
    _store: Types.IConstructorStore;

    constructor(store: Types.IConstructorStore) {
        this.repository = [[]];
        this._store = store;
        
    }

    componentChangedProperties(componentId: string) {
        let target: Types.RepositoryElement | undefined;
        for (let i = 0; i < this.repository.length; i++) {
            target = this.repository[i].map(e => {if(e.id === componentId) return e})[0]
        }
        if (target) {
            const state = target.componentRef.current.getState();
            target.properties = state;
        }
    }

    createComponent(tool: Types.ToolType, parent: any, position: {X: number, Y: number}, way: 'I' | 'U', properties?: Types.IPropertiesLike) {
        const newComponentRef = React.createRef<React.ReactNode>();
        const newId = shortid.generate();
        const props = properties ?? tool.PropertiesInitial;
        props.Base = {...props.Base, X: position.X, Y: position.Y};

        const comp = <tool.Component
            way={way}
            properties={props}
            key={newId}
            parent={parent}
            ref={newComponentRef}
            onSelect={() => {this._store.setState((prev: Types.IConstructorState) => ({...prev, selectedComponent: newId}))}}
            onDeselect={() => {this._store.setState((prev: Types.IConstructorState) => ({...prev, selectedComponent: null}))}}
            onPropertyChange={() => this.componentChangedProperties(newId)}
        />

        const resultObj = {
            component: comp,
            componentRef: newComponentRef,
            properties: props,
            id: newId
        }

        this.addComponent(resultObj)
    }

    addPages() {
        const totalPages = this._store.getState().totalPages;
        const needToAdd = totalPages - this.repository.length;
        for (let i = 0; i < needToAdd; i++) {
            this.repository.push([]);
        }
    }

    addComponent(component: Types.RepositoryElement) {
        this.addPages()
        this.repository[this._store.getState().currentPage - 1].push(component);
    }

    deleteComponent(mark: number | string) {
        if (mark) {
            switch(typeof mark) {
                case 'number': {
                    this.repository.splice(mark, 1);
                }
                case 'string': {
                    this.repository.splice(this.repository[this._store.getState().currentPage - 1].map((e, i) => {if(e.id === mark) return i})[0] ?? -1, 1)
                }
            }
        }
    }

    getComponent(mark: number) {
        return this.repository[this._store.getState().currentPage - 1][mark];
    }

    findComponentById(componentId: string) {
        return this.repository[this._store.getState().currentPage - 1].map(e => {if(e.id === componentId) return e})[0];
    }

    getAllComponents() {
        return this.repository[this._store.getState().currentPage - 1];
    }

    updateComponent(id: string, component: React.ReactNode) {
        // const target = this.repository[this._store.getState().currentPage - 1].map(e => {if(e.id === id) return e})[0];
        // if (target) {
        //     target.component = component;
        // }
    }

    renderComponents() {
        if (this.repository[this._store.getState().currentPage - 1]) {
            return this.repository[this._store.getState().currentPage - 1].map(comp => {
                if (comp.componentRef.current) {
                    console.log(comp)
                    comp.componentRef.current.handlePropertyChange(comp.properties);
                }
                
                return comp.component
            })
        }
        
    }
}