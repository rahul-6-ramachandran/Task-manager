import prisma from "../../database/connection";
import { Status } from "../../generated/prisma";
import { CreateNewTask, UserPayload } from "../../type.common";

export const createNewTask = async(body:CreateNewTask)=>{
    try {
        // console.log(body,"heyyyyyy")
        const { title, description, status,userId } = body;
      
        const validStatus: Status = (status as Status) || "Not_Yet_Started";

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
   