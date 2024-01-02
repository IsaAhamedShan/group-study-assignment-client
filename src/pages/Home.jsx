import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
const Home = () => {


    const taskCheckMutation = useMutation({
        mutationFn: async()=>{
            axios.patch('http://localhost:5000/allAssignmentsCheck',
            ).then(res=>console.log(res))
            .catch(error=>console.log(error))

        },
        onSuccess:()=>{ console.log("task check function executed successfully")}
    })
    useEffect(()=>{
        taskCheckMutation.mutateAsync()
    },[])
    return (
        <div>
            home
        </div>
    );
};

export default Home;