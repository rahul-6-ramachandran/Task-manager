import {  useState } from "react"
import {CreateUser} from '../../../common.type'
import { login, signup } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const navigate = useNavigate()

    const [formfields,setFormFields] = useState<CreateUser>({
        email : "",
        password : ""
    })

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>)=>{
        setFormFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const hanleSubmit = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
   
            signup(formfields).then((res:any)=>{
                if(res?.id){
                    alert("Login Successful")
                    navigate(`/taskboard/${res?.id}`)
                }
            })

    }

    return(
        <>
        
<div className="flex flex-col gap-0 h-screen justify-center container items-center ">

<form className="flex flex-col gap-2 max-w-md mx-auto" onSubmit={(e:any)=> hanleSubmit(e)}>
<h3 className=" text-2xl font-extrabold text-gray-900 dark:text-black md:text-2xl lg:text-4xl my-8 pb-10 ">Welcome To<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> Doit</span></h3>
  <div className="flex flex-col gap-6 w-full ">
  <div className="relative z-0 w-full mb-10 group ">
      <input type="email" name="email" id="email" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" id="password" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  </div>
  

  
</form>

</div>
        
        </>
    )
}