export type CreateUser ={
    email : string
    password : string
}

export type CreateNewTask ={
    title : string
    description : string
    userId : number
    status : string
}

export type TaskData ={
    id : number
    title : string
    Description : string
    userId : number
    status : string
    createdAt : string
    updatedAt : string
}

export enum Status {
    Completed = "Completed",
    Started = "Started",
    NotYetStarted = "Not_Yet_Started"
}


export type UpdateTask ={
    id : number
    title : string
    Description : string
    userId :  number
    status : string
}