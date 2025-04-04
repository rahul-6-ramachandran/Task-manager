import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTask } from "../../actions/TaskActions"
import { TaskData } from "../../../common.type"

export default function Taskview(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [tasks,setTasks] = useState<TaskData[] | []>([])

    useEffect(()=>{
        getAllTask()
        .then((res)=>{
            setTasks(res?.tasks)
            console.log(res?.tasks)
        })
    },[])
  

    return(<>
    <div className="h-screen p-4 ">
   <div className="text-end bg-white sticky-top">
   <button type="button" onClick={()=>navigate(`/createTask/${id}`)} className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none ">Create New Task</button>
   </div>
        <div className="pt-5">
        <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Task Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Created At
                </th>
                <th scope="col" className="px-6 py-3">
                    Updated At
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
            </tr>
        </thead>
        <tbody>
            {
                tasks && tasks.length > 0 ? (
                    tasks?.map((task,index)=>(
                        <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index+1}
                </th>
                <td className="px-6 py-4">
                {task?.title}
                </td>
                <td className="px-6 py-4">
                  {task?.status}
                </td>
                <td className="px-6 py-4">
                   {task.Description}
                </td>
                <td className="px-6 py-4">
                 { task.createdAt}
                </td>
                <td className="px-6 py-4">
                 { task.updatedAt}
                </td>
                <td className="px-6 py-4">
                  <div className="px-3">
                  <button type="button" className="text-white px-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                  <button type="button" className="text-white px-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                  </div>
                </td>
            </tr>
                        </>
                    ))
                ): (<>
               <tr className="w-full"> 
                <th className="text-black flex text-2xl justify-center items-center">               <span className="text-black flex text-2xl justify-center items-center">No Tasks Available.! create New</span>
                </th>
               </tr>
                </>)
            }
            
            
        </tbody>
    </table>
</div>
        </div>

        

    </div>
    </>)
}