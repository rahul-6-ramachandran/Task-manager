
import prisma from "../../database/connection"
import { UserPayload } from "../../type.common"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const findUser = async(body:UserPayload)=> {
    try {
        const {email} = body
        console.log(email,"email")
        
        const user = await prisma.user.findUnique({
            where: {email}
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


const JWT_SECRET = process.env.JWT_SECRET || "default_secret";


export const generateToken = (user: any) => {
    const {id,email} = user
    return jwt.sign({id, email }, JWT_SECRET, { expiresIn: '1d' });
};


export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


export const comparePasswords = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};


export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  };