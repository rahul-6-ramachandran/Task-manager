import express, { Request, Response, Router } from "express"
import { comparePasswords, createNewUser, findUser, generateToken, hashPassword,  } from "../../services/auth/auth"

const router = Router()


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns login success/failure.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   token : object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/login',async(req: Request,res : Response)=>{
   try {
    const {body} = req

    console.log(body,"body")
    const user = await findUser(body) 
    if(!user){
        res.status(404).json({message : "User Does Not Exist"})
   }else{

    const isMatch = await comparePasswords(body.password, user.password);
    if (!isMatch) {
         res.status(401).json({ message: "Invalid credentials" });
    }else{
        const sanitizedUser = {
            ...user,
            password: "", // Hide password
        };

        const token = generateToken(sanitizedUser);

    
        res.status(200).json({ message: "Login Successful", token });
    }
      
    }
    
  

   } catch (error) {
         res.status(500).json({ message: "Something Went Wrong" });
   }
})



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User Register
 *     description: Registers a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: object
 *       404:
 *         description: User Already Exists
 *       500:
 *         description: Internal server error
 */
router.post('/register',async(req,res)=>{
    try {
     const {body} = req
     const user = await findUser(body) 
     if(user){
         res.status(404).json({message : "User Already Exists"})
     }else{
        const hashedPassword = await hashPassword(body.password);
        const newBody  = {
        ...body,
        password : hashedPassword
        }
        const newUser = await createNewUser(newBody)
        
     if(!newUser){
        res.status(404).json({message : "Please Try Again Later"})
     }else{
        const token = generateToken(newUser);


        res.status(200).json({ message: "Login Successful", token });
     }
  
     }
     
     
 
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
    }
 })

 export default router