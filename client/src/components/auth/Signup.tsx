import {  useState } from "react"
import {CreateUser} from '../../../common.type'
import {  signup } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
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
        setLoading(true)
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
  {

!loading ? (<button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-200 hover:text-black focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">   Sign Up    </button>)  : (
    <div role="status text-center justify-center flex items-center ">
    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only"></span>
</div>
)}
  </div>
  

  
</form>

</div>
        
        </>
    )
}