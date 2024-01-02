import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SubmittedAssignments = () => {
  const [marks, setMarks] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const getSubmittedAssignments = async id => {
    try {
      const response = await axios.get(
        `http://localhost:5000/submittedAssignment/${id}`
      );
      console.log("Submitted Assignment ", response);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const submittedAssignmentsQuery = useQuery({
    queryKey: ["submittedAssignmentsList"],
    queryFn: async () => {
      return getSubmittedAssignments(id);
    },
    onSuccess: console.log(
      "allAssignments mutation function successfully executed"
    ),
  });
  if (submittedAssignmentsQuery?.isLoading) {
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">
        <span className="loading loading-infinity w-[400px] h-[250px]"></span>
      </div>
    );
  }
  if (submittedAssignmentsQuery?.isError) {
    return (
      <div className="text-5xl">{submittedAssignmentsQuery.error.message}</div>
    );
  }

  const handleMarks = async item => {
    console.log("item is " + item);
    console.log("marks is: " + marks);
    const marksDetails = {
      marks
,
      assignment_id: item.assignment_id,
      title: item.title,
      submitter: item.name,
      submitter_email: item.email,
    //   grader: user.name,
      grader_email: user.email,
      marking_Time: new Date(),
    };
    console.log("marks details: ",marksDetails)
    axios
    .post("http://localhost:5000/marksDetails", {
        marks,
        assignment_id: item.assignment_id,
        title: item.title,
        submitter: item.name,
        submitter_email: item.email,
        // grader: user.displayName,
        grader_email: user.email,
        marking_Time: new Date()
    },{ timeout: 10000 })
    .then(res => console.log("res is :", res))
    .catch(error => console.log("post error is :", error));
  };
//   console.log("Id in submitted assignments page: " + id);
  return (
    <div>
      <h1>Submitted Assignment</h1>
      {submittedAssignmentsQuery?.data ? (
        submittedAssignmentsQuery.data.map(item => (
          <div key={item._id} className="py-4 border-2 border-gray-600">
            <p>{item.name}</p>
            <p>{item.email}</p>
            <img className="w-24 h-24" src={item.image} alt="" />
            {item.email !== user?.email ? (
              <button
              className="btn btn-outline"
              onClick={() => document.getElementById("giveMark").showModal()}
            >
              Give Mark
            </button>
            ) : null}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="giveMark" className="modal">
              <div className="modal-box">
                <div>
                  <input
                    type="text"
                    name="marks"
                    onChange={e => setMarks(e.target.value)}
                    placeholder={`Give a mark out of 10 ( ?/ ${item.marks})`}
                    className="input input-ghost w-full max-w-xs"
                  />
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      handleMarks(item);
                    }}
                  >
                    submit
                  </button>
                </div>

                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))
      ) : (
        <p>No submitted assignments available</p>
      )}
    </div>
  );
};

export default SubmittedAssignments;
