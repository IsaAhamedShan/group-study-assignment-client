import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import ProgressStatisticsPieChart from "../components/PieChart/ProgressStatisticsPieChart";
import Hero from "../components/Layout/Hero";
const Home = () => {
  const { userCreationTime, userTotalSubmissionCount } =
    useContext(AuthContext);
  console.log("userCreationTime at home is: " + userCreationTime);
  const [totalDoc, setTotalDoc] = useState(null);
  const [docAfterCreationTime, setDocBeforeCreationTime] = useState(null);
  console.log(userTotalSubmissionCount, docAfterCreationTime);
  const taskCheckMutation = useMutation({
    mutationFn: async () => {
      axios
        .patch("http://localhost:5000/allAssignmentsCheck")
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    onSuccess: () => {
      console.log("task check function executed successfully");
    },
  });
  const progressStatisticsCheck = useMutation({
    mutationFn: async () => {
      axios
        .get(
          `http://localhost:5000/progressStatisticsCheck/${userCreationTime}`,
          {
            userCreationDate: userCreationTime,
          }
        )
        .then(res => {
          console.log(res);
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
    taskCheckMutation.mutateAsync();
    if (userCreationTime) {
      progressStatisticsCheck.mutateAsync();
    }
  }, [userCreationTime]);

  return (
    <div>
      <Hero></Hero>
      {/* <h1>home</h1> */}
      <ProgressStatisticsPieChart
       userTotalSubmissionCount={userTotalSubmissionCount}
        docAfterCreationTime={docAfterCreationTime}
      ></ProgressStatisticsPieChart>
    </div>
  );
};

export default Home;
