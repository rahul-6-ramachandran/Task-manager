import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteTask, getAllTask } from "../../actions/TaskActions"
import { TaskData, UpdateTask } from "../../../common.type"
import Edit from "./Edit"
import { useAuth } from "../../context/AuthContext"

export default function Taskview(){
    const {id} = useParams()
    const navigate = useNavigate()
    const user = useAuth()
    const [tasks,setTasks] = useState<TaskData[] | []>([])
    const [editTask,setEditTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState<UpdateTask | null>()
    const [isDelete,setIsDelete] = useState(false)
    
    useEffect(()=>{
        getAllUserTask()
    },[editTask])
   
    const getAllUserTask = ()=>{
        getAllTask()
        .then((res)=>{
            setTasks(res?.tasks)
            console.log(res?.tasks)
        })
    }

    const handleDeleteClick = (id:number)=>{
        setIsDelete(true)
            deleteTask(id).then(()=>{
            alert("Delete Task Successful")
            setIsDelete(false)
            getAllUserTask()
        })
    }

    const handleEditClick = (task : UpdateTask) => {
        
        setSelectedTask(task);
        setEditTask(true);
      };
    return(<>

    {!user ? navigate('/login') :(
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
                <tbody >
                    {
                        tasks && tasks.length > 0 ? (
                            tasks?.map((task,index)=>(
                                <>
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index+1}
                        </th>
                        <td className="px-6 py-4">
                        {task?.title}
                        </td>
                        <td className="px-6 py-4">
                          {task?.status.replace(/_/g, " ")}
                        </td>
                        <td className="px-6 py-4">
                           {task.Description}
                        </td>
                        <td className="px-6 py-4">
                         { new Date(task.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                         { new Date(task.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="px-3 w-full flex">
                            {
                                !isDelete ? (
                                    <button type="button"  onClick={()=>handleDeleteClick(task.id)} className="text-white px-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                ):
                                (
                                    <button disabled type="button" className="text-white  bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        
        </button>
                                )
                            }
                          <button type="button"  onClick={()=>handleEditClick(task)} className="text-white px-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                          </div>
                        </td>
                       
                    </tr>
                    
        
                                </>
                            ))
                        ): (<>
                       
                        <div className="w-full">
                        <span className="text-black flex text-2xl justify-center items-center">No Tasks Available.! create New</span>

                        </div>
                  
                    
                        </>)
                    }
                    
                    
                </tbody>
            </table>
            
            {editTask && selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center  bg-white z-50">
                            <Edit 
                            title={selectedTask?.title}
                            description = {selectedTask?.Description}
                            userId= {selectedTask.userId}
                            status = {selectedTask.status}
                            taskId = {selectedTask.id}
                            setEditTask = {setEditTask}
                           
                                />
                                </div>
                            )}
        
        
           </div>
        
        
                </div>
               
            </div>
    )}
 
    </>)
}