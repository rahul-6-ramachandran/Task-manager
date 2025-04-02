import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth/authRoutes'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

const port = process.env.PORT || 7070;
app.get('/',(req:any,res : any)=>{
    res.send("Hello World")
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
  })