import express, { Request, Response, Router } from "express"
import jwt from "jsonwebtoken";
import { verifyToken } from "../../services/auth/auth";
import prisma from "../../database/connection";
import { getUser } from "../../services/jwtauth";
import e from "express";
import { createNewTask } from "../../services/task/task";




const router = Router()

/**
 * @swagger
 * /auth/register:
 *   get:
 *     summary: Task Fetch
 *     description: Fetching the Tasks of a Logged in User
 *     tags:
 *       - Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              headers:
 *               authorisation : token
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: object
 *       401:
 *         description: No token provided , Invalid token
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req:any, res:any) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }


     

        const userId = await getUser(authHeader);
        if (!userId) {
            return res.status(401).json({ message: "Invalid token" }); 
        }

        const tasks = await prisma.task.findMany({
            where: { userId }, 
        });

        return res.status(200).json({ tasks })
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @swagger
 * /auth/register:
 *   get:
 *     summary: Task Fetch
 *     description: Creating a New Task for Logged in user
 *     tags:
 *       - Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              headers:
 *               authorisation : token
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newTask:
 *                   type: object
 *       401:
 *         description: No token provided 
 *       500:
 *         description: Internal server error
 */

router.post("/", async (req, res) => {
    try {
        const authHeader : any =  req.headers.authorization;
        const {body} = req

        if (!authHeader) {
             res.status(401).json({ message: "No token provided" });
        }else{
            
        
        const newTask = await createNewTask(body)

        res.status(200).json(newTask);
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});




export default router