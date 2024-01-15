import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

import AssignmentCard from "../components/Assignment/AssignmentCard";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
const AllAssignment = () => {
  const { user } = useContext(AuthContext);
  const [idForDetails, setIdForDetails] = useState(null);
  const handleDeleteAssignment = id => {
    axios
      .delete(`http://localhost:5000/assignmentDelete/${id}`)
      .then(res => {
        console.log("delete res: ", res);
        allAssignmentsMutation.refetch();
      })
      .catch(error => console.log("error while deleting: ", error));
  };
  const showAllAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allAssignment");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const allAssignmentsMutation = useQuery({
    queryKey: ["allAssignment"],
    queryFn: showAllAssignments,
    onSuccess: console.log(
      "allAssignments mutation function successfully executed"
    ),
  });
  if (allAssignmentsMutation.isLoading) {
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">
        <span className="loading loading-infinity w-[400px] h-[250px]"></span>
      </div>
    );
  }
  if (allAssignmentsMutation.isError) {
    return (
      <div className="text-5xl">{allAssignmentsMutation.error.message}</div>
    );
  }

  return (
    <div className="flex justify-between items-center md:my-14">
      <motion.div
        className="flex gap-4 flex-wrap justify-center items-center"
        // variants={assignmentCardVariant}
       
      >
        {allAssignmentsMutation.data.map(item => (
          <motion.div key={item._id}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1 
            }
          }}
          viewport={{ once: true }}
          >
            <AssignmentCard
              item={item}
              idForDetails={idForDetails}
              handleDeleteAssignment={handleDeleteAssignment}
              setIdForDetails={setIdForDetails}
            ></AssignmentCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllAssignment;
