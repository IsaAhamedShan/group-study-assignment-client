import axios from 'axios';
import { useEffect } from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://group-study-assignment-server.onrender.com',
    withCredentials: true
})
const useAxiosSecure = () => {
useEffect(()=>{
axiosSecure.interceptors.response.use(res=>{
    return res;
},
error=>{
    if(error.status === (401||403)){
        console.log("Logout the user...")
    }
}
)
},[])
    return axiosSecure;
};

export default useAxiosSecure;