import * as Types from './types';


export function createConstructorStore(initialState: Types.IConstructorState): Types.IConstructorStore {
    let state = initialState;
    const listeners = new Set()

    const getState = () => state;
    
    const setState = (func: any) => {
        state = func(state);
        listeners.forEach((e: any) => e())
    }

    const subscribe = (listener: any) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    return {getState, setState, subscribe};
}


// export class TaskConstructorSession {
//     private _store = createSessionStore(Constants.initialSessionState);
//     private _selectedComponent = useSessionStore(this._store, (state: Types.SessionState) => state.selectedComponent);
//     private _currentPage = useSessionStore(this._store, (state: Types.SessionState) => state.currentPage);
//     private _totalPages = useSessionStore(this._store, (state: Types.SessionState) => state.totalPages);

//     private _componentsRepo: ComponentsRepository = new ComponentsRepository();


//     constructor() {
//         this.increaseTotalPages = this.increaseTotalPages.bind(this);
//         this.decreaseTotalPages = this.decreaseTotalPages.bind(this);
//         this.addComponent = this.addComponent.bind(this);
//         this.renderComponents = this.renderComponents.bind(this);
//     }

//     public getSelectedComponent(): string {
//         return this._selectedComponent;
//     }

//     public setSelectedComponent(newComponent: string): void {
//         this._store.setState((prev: Types.SessionState) => ({...prev, selectedComponent: newComponent}));
//     }

//     public getTotalPages(): number {
//         return this._totalPages;
//     }

//     public increaseTotalPages(): void {
//         this._store.setState((prev: Types.SessionState) => ({...prev, totalPages: prev.totalPages + 1}));
//     }

//     public decreaseTotalPages(): void {
//         this._store.setState((prev: Types.SessionState) => ({...prev, totalPages: prev.totalPages - 1}));
//     }

//     public getCurrentPage(): number {
//         return this._currentPage;
//     }

//     public setCurrentPage(newPage: number): void {
//         if (newPage > this._totalPages) {
//             return;
//         }
//         this._store.setState((prev: Types.SessionState) => ({...prev, currentPage: newPage}));
//     }

//     public addComponent(component: RepositoryElement) {
//         this._componentsRepo.addComponent(component);
//     }

//     public getComponent(componentId: string) {
//         return this._componentsRepo.findComponentById(componentId)
//     }

//     public handlePropertyChange(propertiesLikeObj: any): void {
//         if (this._selectedComponent) {
//             const target = this._componentsRepo.findComponentById(this._selectedComponent);
//             if (target) {
//                 target.componentRef.current.handlePropertyChange(propertiesLikeObj);
//                 target.areaRef.current.handleExternalChange(propertiesLikeObj);
//             }
//         }
//     }

//     public renderComponents(): React.ReactNode {
//         return this._componentsRepo.getAllComponents().map(e => {return e.component});
//     }
// }