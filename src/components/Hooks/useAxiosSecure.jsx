import axios from "axios";
import { useEffect } from "react";
const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: 'https://group-study-assignment-server.onrender.com',
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use(config => {
      config.headers.authorization = `Bearer ${localStorage.getItem("access-token")}`
      // console.log("Request config:", config.headers?.authorization);
      return config;
    }),
    error => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
  }, []);
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      error => {
        if (error.status === (401 || 403)) {
          console.log("Logout the user...");
        }
      }
    );
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
