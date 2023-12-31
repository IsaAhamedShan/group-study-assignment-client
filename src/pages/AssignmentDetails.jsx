import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentSubmitField from "../components/Assignment/AssignmentSubmitField";

const AssignmentDetails = ({ id }) => {
  // const {id} = useParams()
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/assignmentDetails/${id}`)
      .then(res => {
        setData(res.data);
        console.log("res is: ", res);
      })
      .catch(error => console.log(error));
  }, [id]);

  console.log("id is :", id);
  return (
    <div>
      <h1>Task Name: {data.title}</h1>
      <h2>Task Assignee: {data.taskAssignee}</h2>
      <h2>Task Difficulty: {data.difficulty}</h2>
      <p>Task Description: {data.description}</p>
      <p>Due Date: {data.dueDate}</p>
      <p>Task Status: {data.status}</p>
      <button
              className="btn btn-outline"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Submit Assignment
            </button>

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <AssignmentSubmitField assignmentDetails={data}></AssignmentSubmitField>

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
