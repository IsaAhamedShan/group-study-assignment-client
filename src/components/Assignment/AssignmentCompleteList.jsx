import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import AssignmentDetails from "../../pages/AssignmentDetails";

const AssignmentCompleteList = () => {
  const getAssignmentCompleteList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/allAssignmentCompleteList"
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

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

  return <div>
    {
        assignmentCompleteListMutation.data.map(item=><div key={item._id} className="border border-grey-600 p-4 my-2">
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
          details
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
      </div>)
    }
  </div>;
};

export default AssignmentCompleteList;
