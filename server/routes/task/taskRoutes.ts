import express, { Request, Response, Router } from "express"
import jwt from "jsonwebtoken";
import { verifyToken } from "../../services/auth/auth";
import prisma from "../../database/connection";
import { getUser } from "../../services/jwtauth";
import e from "express";
import { createNewTask, deleteTask, updateTask } from "../../services/task/task";




const router = Router()

/**
 * @swagger
 * /task:
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
 * /task:
 *   post:
 *     summary: Task Submit
 *     description: Creating a New Task for the logged-in user
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created task
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

router.post("/", async (req:any, res:any) => {
    try {
        const authHeader : any =  req.headers.authorization;
        const {body} = req

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }else{
            
        
        const newTask = await createNewTask(body)

        res.status(200).json(newTask);
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update a Task
 *     description: Update a specific task for the logged-in user
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to update
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedTask:
 *                   type: object
 *       401:
 *         description: Unauthorized User
 *       500:
 *         description: Internal Server Error
 */

router.put("/:id", async (req:any, res:any) => {
    try {
        const authHeader : any =  req.headers.authorization;
        const {userId} = req.body
        const {id} = req.params
        if (!authHeader) {
            
             res.status(401).json({ message: "Unauthorised User" });
        }else{

            const taskId = Number(id)
            const existingTask = await prisma.task.findUnique({
                where: { id: taskId },
            });
 
            
            if (!existingTask || existingTask.userId !== userId) {
                // console.log("heeyyyy",existingTask)
                return res.status(403).json({ message: "Unauthorized to update this task" });
            }else{
                const body = {
                    ...req.body,
                    id : taskId
                }
                const updatedTask = await updateTask(body)

                res.status(200).json(updatedTask);
            }   
      
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Update a Task
 *     description: Update a specific task for the logged-in user
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to update
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedTask:
 *                   type: object
 *       401:
 *         description: Unauthorized User
 *       500:
 *         description: Internal Server Error
 */


router.delete("/:id", async (req:any, res:any) => {
    try {
        const authHeader : any =  req.headers.authorization;
        const {id} = req.params
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorised User" });
        }else{

            const taskId = Number(id)
            const existingTask = await prisma.task.findUnique({
                where: { id: taskId },
            });
 
            
            if (!existingTask) {
                // console.log("heeyyyy",existingTask)
                return res.status(403).json({ message: "Task Not Found" });
            }else{
                
                const updatedTask = await deleteTask(taskId)
                if(updatedTask)
                    res.status(200).json();
            }   
      
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});




export default router