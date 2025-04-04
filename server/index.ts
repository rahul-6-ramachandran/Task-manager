import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth/authRoutes'
import { setupSwagger } from "./config/swagger";
import cors from "cors";
import taskRoutes from "./routes/task/taskRoutes";
dotenv.config()

const app = express()



// middlewares
app.use(cors());
app.use(express.json())

setupSwagger(app);

// routes
app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

const port = process.env.PORT || 7070;
app.get('/',(req:any,res : any)=>{
    res.send("Hello World")
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
  })