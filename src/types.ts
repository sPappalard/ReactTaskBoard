export type Id = string | number;       //define the type "Id"--> it is a string or a number

export type Column = {
    id: Id;
    title: string;
}

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
}