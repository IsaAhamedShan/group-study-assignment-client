import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AssignmentDetails from "./AssignmentDetails";
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
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        {allAssignmentsMutation.data.map(item => (
          <div key={item._id} className="border border-grey-600 p-4 my-2">
            <div>
              {item.image && (
                <img
                  src={item.image}
                  alt="MongoDB Image"
                  className="w-24 h-24"
                />
              )}
            </div>
            <p>{item.title}</p>
            <p>{item.dueDate}</p>
            {user?.email === item?.email ? (
              <button
                onClick={() => {
                  handleDeleteAssignment(item._id);
                }}
              >
                delete
              </button>
            ) : null}

            {/* <Link to={`/assignmentDetails/${item._id}`}>
              <button className="btn-outline">Details</button>
            </Link> */}

            <button
              className="btn btn-outline"
              onClick={() => {
                
                setTimeout(() => {
                  setIdForDetails(item._id);
                  document.getElementById("my_modal_1").showModal();
                }, 1);
              }}
            >
              details
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <AssignmentDetails id={idForDetails}></AssignmentDetails>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAssignment;
