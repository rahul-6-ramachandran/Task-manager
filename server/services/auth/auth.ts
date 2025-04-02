
import prisma from "../../database/connection"
import { UserPayload } from "../../type.common"

export const findUser = async(body:UserPayload)=> {
    try {
        const {email,password} = body
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        return user ;
    } catch (error) {
        console.log(error)
    }
}

export const createNewUser = async(body:UserPayload)=>{
 try {
    const {email,password} = body
    const newUser = await prisma.user.create({
        data: {
            email : email,
            password : password
        }
    })
    
    return newUser;


 } catch (error) {
    console.log(error)
 }

}