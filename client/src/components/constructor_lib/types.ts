import { ComponentsRepository } from "./ComponentsRepository";


// ========= ConstructorStore =========

export interface IConstructorState {
    totalPages: number;
    currentPage: number;
    selectedComponent: string | null;
}

export interface IConstructorStore {
    setState: (func: (state: IConstructorState) => any) => void;
    getState: () => IConstructorState;
    subscribe: (listener: any) => () => void;
}


// ========= Repository ==========

export interface RepositoryElement {
    id: string;
    component: React.ReactElement;
    componentRef: any;
    properties: IPropertiesLike;
}

export interface RepositoryPage {
    index: number;
    elements: RepositoryElement[];
}


// ========= ConstructorElements =========

export interface CanvasProps {
    repo: ComponentsRepository;
    store: IConstructorStore;
    canvasRef: any
}

export interface PropetiesAreaProps {
    store: IConstructorStore;
    repo: ComponentsRepository;
}

export type ToolType = {id: string, icon: React.FC, tooltip: string, Component: any, PropertiesArea: any, PropertiesInitial: IPropertiesLike}


// ========= Properties ===========

export interface IPropertiesLike extends IBaseInteractiveProperties {
    Local: any
}

export interface IPropertiesContext {
    Properties: IPropertiesLike;
    setProperties: (obj: any) => void;
}


// ========= BaseInteractive ===========

export interface IBaseInteractiveProperties {
    Base: {
        Width: string,
        Height: string,
        X: number,
        Y: number
    }
}

export interface IStateInteractive {
    selected: boolean,
    properties: IBaseInteractiveProperties
}


// ========= TextInteractive ===========

export interface ITextInteractiveProperties extends IBaseInteractiveProperties {
    Local: {
        Text: string,
        TextColor: string
    }
}

// ========= CheckboxInteractive ===========

export interface ICheckboxInteractiveProperties extends IBaseInteractiveProperties {
    Local: {
        Text: string,
        TextColor: string,
        Checked: boolean
    }
}

// ========= ButtonInteractive ==========

export interface IButtonInteractiveProperties extends IBaseInteractiveProperties {
    Local: {
        Text: string,
        BackgroundColor: string,
        TextColor: string
    }
}
