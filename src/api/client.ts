import axios from "axios";
import { config } from "process";

axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("acccessToken")
    if(token){
        config.headers.Authorization = token
    }
    return config
})