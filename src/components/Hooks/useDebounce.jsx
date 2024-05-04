import { useEffect, useState } from "react";


const useDebounce = (value,delay=500) => {

    const [debouncedValue,setDebouncedValue] = useState("")
   useEffect(()=>{
    const timeOut = setTimeout(()=>{
        setDebouncedValue(value)
    },delay)
    return ()=>clearTimeout(timeOut)
   },[value,delay])
   return debouncedValue
};

export default useDebounce;