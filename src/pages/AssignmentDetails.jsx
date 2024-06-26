import { useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AssignmentSubmitField from "../components/Assignment/AssignmentSubmitField";
import AssignmentUpdateForm from "../components/Assignment/AssignmentUpdateForm";

import { AuthContext } from "../provider/AuthProvider";

const AssignmentDetails = ({ item, id, assignmentComplete }) => {
  console.log("id got in assignment details: ", id);
  const { user } = useContext(AuthContext);
 

  // console.log("id is :", id);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-raleway">
        <span className="font-bold">Task Name: </span>
        {item.title}
      </h1>
      <h2 className="font-raleway">
        <span className="font-bold">Task Assignee: </span>
        {item.taskAssignee}
      </h2>
      <h2 className="font-raleway">
        <span className="font-bold ">Task Difficulty: </span>
        {item.difficulty}
      </h2>

      <p className="font-roboto">
        <span className="font-bold ">Task Description: </span>
        {item.description}
      </p>
      <p className="font-roboto">
        <span className="font-bold">Creation Date: </span>
        {item?.creationDate ? format(item.creationDate, "dd MMMM, yyyy") : null}
      </p>
      <p>
        <span className="font-bold font-roboto">Due Date: </span>
        {item?.dueDate ? format(item.dueDate, "dd MMMM, yyyy") : null}
      </p>
      <p className="font-roboto">
        <span className="font-bold">Task Status: </span>
        {item.status}
      </p>
      {item?.status !== "completed" ? (
        <button
          className="btn btn-outline font-roboto"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Submit Assignment
        </button>
      ) : null}
      {item?.status === "completed" ? (
        <Link to={`/submittedAssignment/${id}`}>
          <button className="btn btn-outline font-roboto">Submit list</button>
        </Link>
      ) : null}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <AssignmentSubmitField
            assignmentDetails={item}
          ></AssignmentSubmitField>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {user?.email === item?.email && item?.status !== "completed" ? (
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("update_modal").showModal()}
        >
          Update
        </button>
      ) : null}

      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          {item && <AssignmentUpdateForm data={item}></AssignmentUpdateForm>}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignmentDetails;
