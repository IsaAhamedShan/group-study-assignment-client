import format from "date-fns/format";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import AssignmentDetails from "../../pages/AssignmentDetails";
import { AuthContext } from "../../provider/AuthProvider";
// import AssignmentDetails from "../";
const AssignmentCard = ({
  item,
  idForDetails,
  handleDeleteAssignment,
  setIdForDetails,
  assignmentComplete,
}) => {
  const [difficultyColor, setDifficultyColor] = useState("bg-green-400");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (item?.difficulty === "easy") {
      setDifficultyColor("bg-green-400");
    } else if (item?.difficulty === "medium") {
      setDifficultyColor("bg-yellow-400");
    } else if (item?.difficulty === "hard") {
      setDifficultyColor("bg-red-400");
    }
  }, []);


  return (
    <motion.div className="flex flex-col justify-between "
    >
      <motion.div
        key={item._id}
        className="border border-base-500 rounded-md p-6 my-2 w-[360px] h-80 flex flex-col justify-between hover:scale-105 duration-200 hover:shadow-md hover:shadow-base-500 " 
      >
        <div className="flex justify-between">
          {item.image && (
            <img src={item.image} alt="MongoDB Image" className="w-16 h-16" />
          )}

          <button
            className={`btn text-black font-rancho btn-sm rounded-md hover:text-white  bg-green-600 ${difficultyColor}`}
          >
            {item.difficulty}
          </button>
        </div>
        <div>
          <p className="font-bold font-raleway text-xl my-3">{item.title}</p>
          <p className="my-2 font-roboto">
            {item.description.split(" ").slice(0, 11).join(" ")} ...
          </p>
          <p className="my-2">
            Due Date: {format(item.dueDate, "dd MMMM, yyyy")}
          </p>
        </div>
        <div className="flex justify-between mt-auto">
          <button
            className="btn btn-outline btn-sm rounded-sm hover:scale-105"
            onClick={() => {
              setTimeout(() => {
                setIdForDetails(item._id);
                document.getElementById("my_modal_1").showModal();
              }, 1);
            }}
          >
            details
          </button>
          {user?.email === item?.email ? (
            <button
              onClick={() => {
                handleDeleteAssignment(item._id);
              }}
              className="btn btn-outline btn-sm rounded-sm"
            >
              delete
            </button>
          ) : null}
        </div>

        {/* <Link to={`/assignmentDetails/${item._id}`}>
              <button className="btn-outline">Details</button>
            </Link> */}

        <dialog id="my_modal_1" className="modal">
          <motion.div className="modal-box"
          drag
          dragConstraints={{
            left:-10,
            right:10,
            top:10,
            bottom:10

          }}
          >
            <AssignmentDetails
              id={idForDetails}
              assignmentComplete={assignmentComplete}
            ></AssignmentDetails>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </motion.div>
        </dialog>
      </motion.div>
    </motion.div>
  );
};

export default AssignmentCard;
