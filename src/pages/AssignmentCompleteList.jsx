import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import AssignmentCard from "../components/Assignment/AssignmentCard";
import { Helmet } from "react-helmet";
const AssignmentCompleteList = () => {
  const [idForDetails, setIdForDetails] = useState('');
  const [difficultyColor, setDifficultyColor] = useState("bg-green-400");
  const [assignmentComplete, setAssignmentComplete] = useState(true);
  const axiosSecure = useAxiosSecure()
  const getAssignmentCompleteList = async () => {
    try {

      const response = await axiosSecure.get('/allAssignmentCompleteList')
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  // useEffect(()=>{
  //   if(item?.difficulty === 'easy'){
  //     setDifficultyColor('bg-green-400')
  //   }
  //   else if(item?.difficulty==='medium'){
  //     setDifficultyColor('bg-yellow-400')
  //   }
  //   else if(item?.difficulty==='hard'){
  //     setDifficultyColor('bg-red-400')
  //   }

  // },[])

  const assignmentCompleteListMutation = useQuery({
    queryKey: ["assignmentCompleteList"],
    queryFn: getAssignmentCompleteList,
    onSuccess: console.log(
      "allAssignments mutation function successfully executed"
    ),
  });
  if (assignmentCompleteListMutation.isLoading) {
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">
        <span className="loading loading-infinity w-[400px] h-[250px]"></span>
      </div>
    );
  }
  if (assignmentCompleteListMutation.isError) {
    return (
      <div className="text-5xl">
        {assignmentCompleteListMutation.error.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 flex-wrap py-14">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Assignment Complete List</title>
      </Helmet>
      {assignmentCompleteListMutation.data.map(item => (
        <motion.div
          key={item._id}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <AssignmentCard
            item={item}
            idForDetails={idForDetails}
            setIdForDetails={setIdForDetails}
            assignmentComplete={assignmentComplete}
          ></AssignmentCard>
        </motion.div>
      ))}
    </div>
  );
};

export default AssignmentCompleteList;
