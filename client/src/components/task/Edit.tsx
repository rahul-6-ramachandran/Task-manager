import {  useEffect, useState } from "react"
import {CreateNewTask, Status, UpdateTask} from '../../../common.type'

import { useNavigate, useParams } from "react-router-dom";
import { createNewTask, getAllTask, updateTask } from "../../actions/TaskActions";
export default function Edit(
    { 
        title, 
        description ,
        userId ,
        status,
        taskId,
        setEditTask,
    }:any
){
    const navigate = useNavigate()

    const [formfields,setFormFields] = useState<UpdateTask>({
        title : title,
        Description : description,
        id : taskId ? parseInt(taskId, 10) : 0,
        status : status,
        userId : userId ? parseInt(userId, 10) : 0
    })


    const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setFormFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const hanleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      
         if(taskId) {
            console.log(formfields,"Heyhey")
           
            updateTask(formfields).then((res)=>{
                if(res){
                    alert("Task Updation Successful")
                    setEditTask(false)
                    getAllTask()
                }
            })
        }

    }

    return(
        <>
        
<div className="flex flex-col gap-0 h-screen absolute justify-center container items-center ">

<form className="flex flex-col gap-2 max-w-md mx-auto" onSubmit={(e: React.FormEvent<HTMLFormElement>)=> hanleSubmit(e)}>
<h3 className=" text-2xl font-extrabold text-gray-900 dark:text-black md:text-2xl lg:text-4xl my-8 pb-10 ">Edit The<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Task</span></h3>
  <div className="flex flex-col gap-6 w-full ">
  <div className="relative z-0 w-full mb-10 group ">
      <input type="text"  name="title" value={formfields?.title} id="title" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task Name</label>
  </div>
  <div className="relative z-0 w-full mb-10 group ">
      <input type="text" value={formfields?.Description} name="description" id="description" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>
  <div className="relative z-0 w-full mb-10 group ">
     
      <label htmlFor="status"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
  <select  id="status"
        name="status"
        value={formfields?.status}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {Object.values(Status).map((status) => (
    <option key={status} value={status}>
      {status.replace(/_/g, " ")}
    </option>
  ))}
   
  </select>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  </div>
  

  
</form>

</div>
        
        </>
    )
}