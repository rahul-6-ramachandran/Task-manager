import { NextFunction } from "express";
import { verifyToken } from "./auth/auth";

export const authenticateJWT = (req:any, res:any, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  
    req.user = decoded; 
    next();
  };

  export const getUser= async(authHeader:any)=>{
    const token = authHeader.split(" ")[1]; 
    const decoded = verifyToken(token);

    const userId = (decoded as any).id; 
    return userId

  }