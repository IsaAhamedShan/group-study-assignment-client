import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const SubmittedAssignments = () => {
  const [marks, setMarks] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [submittedAssignmentInfo, setSubmittedAssignmentInfo] = useState([]);
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
  const successMarking = () => {
    toast.success("Marking assignment successfully");
  };
  const unSuccessMarking = () => {
    toast.error("Already marked the assignment");
  };
  const handleMarks = async submittedAssignmentInfo => {
    console.log("item is ", submittedAssignmentInfo);
    console.log("marks is: ", marks);
    const marksDetails = {
      marks,
      assignment_id: submittedAssignmentInfo.assignment_id,
      title: submittedAssignmentInfo.title,
      submitter: submittedAssignmentInfo.name,
      submitter_email: submittedAssignmentInfo.email,
      grader: user.displayName,
      grader_email: user.email,
      marking_Time: new Date(),
    };
    console.log("marks details: ", marksDetails);
    axios
      .post(
        "http://localhost:5000/marksDetails",
        {
          marks,
          assignment_id: submittedAssignmentInfo.assignment_id,
          title: submittedAssignmentInfo.title,
          submitter: submittedAssignmentInfo.name,
          submitter_email: submittedAssignmentInfo.email,
          grader: user.displayName,
          grader_email: user.email,
          marking_Time: new Date(),
        },
        { timeout: 10000 }
      )
      .then(res => {
        console.log("res is :", res);

        axios
          .patch("http://localhost:5000/markAddToAssignment", {
            assignment_id: submittedAssignmentInfo.assignment_id,
            submitter_email: submittedAssignmentInfo.email,
            marks,
          })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });

        // successMarking()
      })
      .catch(error => {
        console.log("post error is :", error);
        unSuccessMarking();
      });
  };
  //   console.log("Id in submitted assignments page: " + id);
  return (
    <div>
      <Toaster></Toaster>
      <h1>Submitted Assignment</h1>
      {submittedAssignmentsQuery?.data ? (
        submittedAssignmentsQuery.data.map(item => (
          <div
            key={item._id}
            className="py-4 border-2 border-gray-600 w-96 [&>*]:py-2"
          >
            <p>
              <span className="font-bold">Name</span>: {item.name}
            </p>
            <p>
              <span className="font-bold">Email</span>: {item.email}
            </p>
            <p>
              Assignment:{" "}
              <a
                href={item.submitted_Assignment}
                className="font-bold underline"
              >
                Download
              </a>
            </p>

            {/* <img className="w-24 h-24" src={item.image} alt="" /> */}
            {item.email !== user?.email ? (
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSubmittedAssignmentInfo(item);
                  document.getElementById("giveMark").showModal();
                }}
              >
                Give Mark
              </button>
            ) : null}
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="giveMark" className="modal">
              <div className="modal-box">
                <div>
                  {/* <p>task name:{item.title}</p>
                  <p>submitted by:{item.name}</p>
                  <p>submitted by : {item.email}</p>
                  <p>task_assignee_email:{item.assignee_email}</p> */}
                  {console.log("item got here ", item)}
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
                      handleMarks(submittedAssignmentInfo);
                      console.log(
                        "item which is passing is :",
                        submittedAssignmentInfo
                      );
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
