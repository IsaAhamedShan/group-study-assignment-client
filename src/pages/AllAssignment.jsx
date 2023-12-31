import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import AssignmentDetails from "./AssignmentDetails";
const AllAssignment = () => {
  const showAllAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allAssignment");
      console.log(response.data);
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
      <div>
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
            {/* <Link to={`/assignmentDetails/${item._id}`}>
              <button className="btn-outline">Details</button>
            </Link> */}

            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              open modal
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <AssignmentDetails id={item._id}></AssignmentDetails>

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
