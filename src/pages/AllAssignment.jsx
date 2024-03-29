import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import AssignmentCard from "../components/Assignment/AssignmentCard";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import "sweetalert2/dist/sweetalert2.min.css";

const AllAssignment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [idForDetails, setIdForDetails] = useState("");
  const handleDeleteAssignment = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0075ce",
      cancelButtonColor: "#bb1515",
      background: "#181616",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/assignmentDelete/${id}`)
          .then(res => {
            console.log("delete res: ", res);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              color: "#f8f5f5",
            });
            allAssignmentsMutation.refetch();
          })
          .catch(error => console.log("error while deleting: ", error));
      }
    });
  };
  const showAllAssignments = async () => {
    try {
      const response = await axiosSecure.get("/allAssignment");
      console.log("all assignment response: ", response.data);
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
