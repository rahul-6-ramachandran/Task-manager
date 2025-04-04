import { AxiosError } from "axios"
import { CreateUser } from "../../common.type"
import Axios from "../config/Axios"
import { jwtDecode } from "jwt-decode"

export const login = async(body: CreateUser)=> {
    try {
        const {data} = await Axios.post('/api/auth/login',body)
        console.log(data.token,"token")
        localStorage.setItem("token", data.token);
        const decodedToken  : { id: string } = jwtDecode(data.token);
        console.log(decodedToken)
        return decodedToken
    } catch (error) {
        const err = error as AxiosError
        if(err.message){
            alert("Invalid Credentials")
            console.log(err.message || "Login Failed")
        }
    }
}


export const signup = async(body: CreateUser)=> {
    try {
        console.log(body)
        const {data} = await Axios.post('/api/auth/register',body)
        console.log(data.token,"token")
        localStorage.setItem("token", data.token);
        const decodedToken   = jwtDecode(data.token);
        console.log(decodedToken,"decode")
        return decodedToken
    } catch (error) {
        const err = error as AxiosError
       
            console.log(err.message || "Signup Failed")
        
    }
}
