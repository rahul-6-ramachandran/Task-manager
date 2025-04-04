import { AxiosError } from "axios"
import { CreateNewTask, UpdateTask } from "../../common.type"
import Axios from "../config/Axios"




export const createNewTask = async(body: CreateNewTask)=> {
    try {
        console.log(body,"vody")
         await Axios.post('/api/task',body)
    } catch (error) {
        const err = error as AxiosError
       
            console.log(err.message || "Error Occured")
        
    }
}



export const getAllTask = async()=> {
    try {

        const {data} = await Axios.get('/api/task')
        return data
    } catch (error) {
        const err = error as AxiosError
       
            console.log(err.message || "Error Occured")
        
    }
}



export const updateTask = async(body: UpdateTask)=> {
    try {

        const {data} = await Axios.put(`/api/task/${body.id}`,body)
        return data
    } catch (error) {
        const err = error as AxiosError
       
            console.log(err.message || "Error Occured")
        
    }
}


export const deleteTask = async(id:Number)=> {
    try {

        await Axios.delete(`/api/task/${id}`)
    } catch (error) {
        const err = error as AxiosError
       
            console.log(err.message || "Error Occured")
        
    }
}


