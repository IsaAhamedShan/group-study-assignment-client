import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import ProgressStatisticsPieChart from "../PieChart/ProgressStatisticsPieChart";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const MyLifeTimeSubmittedList = () => {
  const { id } = useParams();
  const {
    userTotalSubmissionCount,
    setUserTotalSubmissionCount,
    user,
    userCreationTime,
    logOut,
  } = useContext(AuthContext);
  const [idForDetails, setIdForDetails] = useState("");
  const [difficultyColor, setDifficultyColor] = useState("bg-green-400");
  // const [assignmentComplete, setAssignmentComplete] = useState(true);
  const [totalDoc, setTotalDoc] = useState("");
  const [docAfterCreationTime, setDocBeforeCreationTime] = useState("");
  const axiosSecure = useAxiosSecure();
  const submissionLifeTime = useQuery({
    queryKey: ["lifeTimeSubmitedList"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/usersLifeTimeSubmittedList/${id}`,
        { withCredentials: true }
      );
      console.log("res from life time submission  :", response?.data);
      setUserTotalSubmissionCount(response.data.length);
      
      return response.data;
    },
    onSuccess: () => {
      console.log("submissionLifeTimeSubmittedList success");
    },
    onError:(error)=>{
      if(error.response && error.response.status === 403){
        logOut()
          .then(() => {
            console.log("user logged out because of unauthorized");
          })
          .catch(() => {
            console.log("error while logout after finding invalid user");
          });
      }
    }
  });
  const progressStatisticsCheck = useMutation({
    mutationFn: async () => {
      axios
        .get(`/progressStatisticsCheck/${userCreationTime}`, {
          userCreationDate: userCreationTime,
        })
        .then(res => {
          // console.log(res);
          setTotalDoc(parseInt(res.data.totalDocCount));
          setDocBeforeCreationTime(
            parseInt(res.data.docCountAfterCreationUser)
          );
        })
        .catch(error => console.log(error));
    },
    onSuccess: () => {
      console.log("progress statistics function executed successfully");
    },
  });
  useEffect(() => {
    if (userCreationTime) {
      progressStatisticsCheck.mutateAsync();
    }
  }, []);
  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="">
      <div className="m-16 flex justify-center items-center">
        <ProgressStatisticsPieChart
          userTotalSubmissionCount={userTotalSubmissionCount}
          docAfterCreationTime={docAfterCreationTime}
        ></ProgressStatisticsPieChart>
      </div>
      {/* <p>total submission:{submissionLifeTime.data?.length}</p> */}

      <div className="flex justify-center gap-4 flex-wrap">
        {submissionLifeTime.data
          ? submissionLifeTime.data.map(item => (
              <div
                key={item._id}
                className="flex flex-col gap-3 border-2 border-gray-500 w-96 h-80 p-4 rounded-md hover:scale-105 duration-200"
              >
                <h1>
                  <span className="font-bold">Task Name: </span>
                  {item.title}
                </h1>
                <h2>
                  <span className="font-bold">Task Assignee: </span>
                  {item.taskAssignee}
                </h2>
                <h2>
                  <span className="font-bold">Task Difficulty: </span>
                  <span
                    className={`px-2 rounded-sm ${getDifficultyColor(
                      item.difficulty
                    )}`}
                  >
                    {item.difficulty}
                  </span>
                </h2>
                <p>
                  <span className="font-bold">Task Description: </span>
                  {item.description.split(" ").slice(0, 12).join(" ")}...
                </p>
                <p>
                  <span className="font-bold">Due Date: </span>
                  {item?.dueDate ? format(item.dueDate, "dd MMMM, yyyy") : null}
                </p>
                <p>
                  Marks:{" "}
                  {isNaN(item.gettingMark / item.count)
                    ? 0
                    : item.gettingMark / item.count}{" "}
                  (Avg)
                </p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default MyLifeTimeSubmittedList;
