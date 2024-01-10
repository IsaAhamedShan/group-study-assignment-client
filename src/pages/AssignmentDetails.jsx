import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import AssignmentSubmitField from "../components/Assignment/AssignmentSubmitField";
import { format } from "date-fns";
import { AuthContext } from "../provider/AuthProvider";
import AssignmentUpdateForm from "../components/Assignment/AssignmentUpdateForm";
import { Link } from "react-router-dom";

const AssignmentDetails = ({ id,assignmentComplete }) => {
  // const {id} = useParams()
  console.log("id got in assignment details: ", id);
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:5000/assignmentDetails/${id}`
          );
          setData(response.data);
          console.log("assignment details  ", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  //   const handleMark=(e)=>{
  //     e.preventDefault()
  //     const form = e.target;
  //     const value = form.mark.value;
  // console.log(value)
  //   }

  console.log("id is :", id);
  return (
    <div className="flex flex-col gap-3"
    
    >
      <h1>
        <span className="font-bold">Task Name: </span>
        {data.title}
      </h1>
      <h2>
        <span className="font-bold">Task Assignee: </span>
        {data.taskAssignee}
      </h2>
      <h2>
        <span className="font-bold">Task Difficulty: </span>
        {data.difficulty}
      </h2>

      <p>
        <span className="font-bold">Task Description: </span>
        {data.description}
      </p>
      <p>
        <span className="font-bold">Creation Date: </span>
        {data?.creationDate ? format(data.creationDate, "dd MMMM, yyyy") : null}
      </p>
      <p>
        <span className="font-bold">Due Date: </span>
        {data?.dueDate ? format(data.dueDate, "dd MMMM, yyyy") : null}
      </p>
      <p>
        <span className="font-bold">Task Status: </span>
        {data.status}
      </p>
      {data?.status !== "completed" ? (
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Submit Assignment
        </button>
      ) : null}
      {data?.status === "completed" ? (
        <Link to={`/submittedAssignment/${id}`}>
          <button className="btn btn-outline">Submit list</button>
        </Link>
      ) : null}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <AssignmentSubmitField
            assignmentDetails={data}
          ></AssignmentSubmitField>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {user?.email === data?.email && data?.status !== "completed" ? (
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("update_modal").showModal()}
        >
          Update
        </button>
      ) : null}

      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          {data && <AssignmentUpdateForm data={data}></AssignmentUpdateForm>}

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
