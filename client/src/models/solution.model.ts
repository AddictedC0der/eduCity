export interface ISolution {
    Content: {tasks: {elements: {type: string, properties: any}[]}[]};
    Author: number;
    Work: number;
    Rating: number;
}