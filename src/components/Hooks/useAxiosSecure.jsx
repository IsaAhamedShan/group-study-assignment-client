import axios from 'axios';
import { useEffect } from 'react';
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/',
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