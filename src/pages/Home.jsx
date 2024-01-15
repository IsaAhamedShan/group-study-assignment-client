import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import ProgressStatisticsPieChart from "../components/PieChart/ProgressStatisticsPieChart";
import Hero from "../components/Layout/Hero";
import { Link } from "react-scroll";
import Footer from "../components/Common/Footer";
import Features from "../components/Layout/Features";
import AboutUs from "../components/Layout/AboutUs";
import CardComponent from "../components/Layout/cardComponent";
const Home = () => {
  const { userCreationTime, userTotalSubmissionCount,user } =
    useContext(AuthContext);
  // console.log("userCreationTime at home is: " + userCreationTime);
// console.log("user at home is ", user)
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

  useEffect(() => {
    taskCheckMutation.mutateAsync();
  }, []);

  return (
    <div>
      <Hero></Hero>
      <CardComponent></CardComponent>
      <Features></Features>
      <Footer></Footer>
    </div>
  );
};

export default Home;
