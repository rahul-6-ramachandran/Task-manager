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
    description : string
    userId : number
    status : string
    createdAt : Date
    updatedAt : Date
}

export enum Status {
    Completed = "Completed",
    Started = "Started",
    NotYetStarted = "Not_Yet_Started"
}