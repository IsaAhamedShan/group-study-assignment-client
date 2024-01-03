import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const MyLifeTimeSubmittedList = () => {
  const { id } = useParams();
  const submissionLifeTime = useQuery({
    queryKey: ["lifeTimeSubmitedList"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/usersLifeTimeSubmittedList/${id}`
      );
      console.log("res from life time submission  :", response?.data);
      return response.data;
    },
    onSuccess: () => {
      console.log("submissionLifeTimeSubmittedList success");
    },
  });
  // console.log(MyLifeTimeSubmittedList.re)

  return (
    <div>
      <h1>My Life time submission</h1>
      {submissionLifeTime.data ? ( submissionLifeTime.data.map(item => (
        <div key={item._id} className="border-2 border-gray-500 p-4">
          <p>name:{item.name}</p>
          <p>title:{item.title}</p>
          <p>marks:{item.marks}</p>
        </div>
      ))): null}
    </div>
  );
};

export default MyLifeTimeSubmittedList;
