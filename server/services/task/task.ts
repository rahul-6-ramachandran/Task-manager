import prisma from "../../database/connection";
import { Status } from "../../generated/prisma";
import { CreateNewTask, TaskStatus, UpdateTask, UserPayload } from "../../type.common";

export const createNewTask = async(body:CreateNewTask)=>{
    try {
        // console.log(body,"heyyyyyy")
        const { title, description, status,userId } = body;
      
        const validStatus: TaskStatus = Object.values(TaskStatus).includes(status as TaskStatus) 
        ? (status as TaskStatus) 
        : TaskStatus.NotYetStarted;
    

       const newTask = await prisma.task.create({
           data: {
            title,
            Description: description,
            status: validStatus, 
            userId, 
        },
       })
       
       return newTask;
   
   
    } catch (error) {
       console.log(error)
    }
   
   }
   
   
export const updateTask = async(body:UpdateTask  )=>{
    try {
        // console.log(body,"heyyyyyy")
        const { title, Description, status ,id} = body;
       

        const validStatus: TaskStatus = Object.values(TaskStatus).includes(status as TaskStatus) 
    ? (status as TaskStatus) 
    : TaskStatus.NotYetStarted;

       const newTask = await prisma.task.update({
        where: {
             id, 
        },
           data: {
            title,
            Description,
            status: validStatus, 
        },
       })
       
       return newTask;
   
   
    } catch (error) {
       console.log(error)
    }
   
   }

   
export const deleteTask = async(id : number)=>{
    try {
     

       const newTask = await prisma.task.delete({
        where: {
             id, 
        }
       })
       return true
   
   
    } catch (error) {
       console.log(error)
    }
   
   }
   
   