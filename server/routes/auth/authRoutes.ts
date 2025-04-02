import express, { Request, Response, Router } from "express"
import { createNewUser, findUser,  } from "../../services/auth/auth"

const router = Router()

router.post('/login',async(req: Request,res : Response)=>{
   try {
    const {body} = req
    const user = await findUser(body) 
    if(!user){
         res.status(404).json({message : "User Does Not Exist"})
    }else{
        const sanitizedUser = {
            ...user,
            password: "", // Hide password
        };
    
        res.status(200).json({ message: "Login Successful", sanitizedUser });
    }
    
  

   } catch (error) {
         res.status(500).json({ message: "Something Went Wrong" });
   }
})


router.post('/register',async(req,res)=>{
    try {
     const {body} = req
     const user = await findUser(body) 
     if(user){
         res.status(404).json({message : "User Already Exists"})
     }else{
        const newUser = await createNewUser(body)
     if(!newUser){
        res.status(404).json({message : "Please Try Again Later"})
     }

     res.status(200).json({ message: "Login Successful", newUser });
     }
     
     
 
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
 })

 export default router