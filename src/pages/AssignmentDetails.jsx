import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import AssignmentSubmitField from "../components/Assignment/AssignmentSubmitField";
// import { format } from "date-fns";
import { AuthContext } from "../provider/AuthProvider";
import AssignmentUpdateForm from "../components/Assignment/AssignmentUpdateForm";
import { Link } from "react-router-dom";
const AssignmentDetails = ({ id }) => {
  // const {id} = useParams()
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/assignmentDetails/${id}`
        );
        setData(response.data);
        console.log("res is: ", response);
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
    <div>
      <h1>Task Name: {data.title}</h1>
      <h2>Task Assignee: {data.taskAssignee}</h2>
      <h2>Task Difficulty: {data.difficulty}</h2>

      <p>Task Description: {data.description}</p>
      {/* <p>Creation Date: {format(data.creationDate, 'dd MMMM, yyyy')}</p> */}
      {/* <p>Due Date: { format(data.dueDate, 'dd MMMM, yyyy')}</p> */}
      <p>Task Status: {data.status}</p>
      {data?.status !== "completed" ? (
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Submit Assignment
        </button>
      ) : null}
      {
        <Link to={`/submittedAssignment/${id}`}>
        <button className="btn btn-outline">Submit list</button>
        </Link>
      }
      {/* {data?.email !== user?.email ? (
        <button
          className="btn btn-outline"
          onClick={() => {
            document.getElementById("give_mark").showModal();
          }}
        >
          Give mark
        </button>
      ) : null}
      <dialog id="give_mark" className="modal">
        <div className="modal-box">
          <form onSubmit={{handleMark}}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your name?</span>
              <span className="label-text-alt">Top Right label</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span>
            </div>
          </label>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}

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
