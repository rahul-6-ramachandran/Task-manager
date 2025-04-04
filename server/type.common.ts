export type UserPayload = {
    email : string,
    password : string
}

export type CreateNewTask ={
    title : string
    description : string
    userId :  number
    status : string
}



export type UpdateTask ={
    id : number
    title : string
    Description : string
    userId :  number
    status : string
}



export enum TaskStatus {
    Completed = "Completed",
    Started = "Started",
    NotYetStarted = "Not_Yet_Started"
}