import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const MyLifeTimeSubmittedList = () => {
  const { id } = useParams();
  const {userTotalSubmissionCount, setUserTotalSubmissionCount} = useContext(AuthContext)
  const [myTotalSubmission,setMyTotalSubmission] = useState();
  
  const submissionLifeTime = useQuery({
    queryKey: ["lifeTimeSubmitedList"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/usersLifeTimeSubmittedList/${id}`
      );
      console.log("res from life time submission  :", response?.data);
      setUserTotalSubmissionCount(response.data.length)
    
      return response.data;
    },
    onSuccess: () => {
      console.log("submissionLifeTimeSubmittedList success");
    },
  });
 

  return (
    <div>
      <h1>My Life time submission</h1>
      <p>total submi:{submissionLifeTime.data?.length}</p>
      {submissionLifeTime.data ? ( submissionLifeTime.data.map(item => (
        <div key={item._id} className="border-2 border-gray-500 p-4">
          <p>name:{item.name}</p>
          <p>title:{item.title}</p>
          <p>marks:{item.marks}</p>
          <p>got: {item.gettingMark / item.count} marks avg</p>
        </div>
      ))): null}
    </div>
  );
};

export default MyLifeTimeSubmittedList;
