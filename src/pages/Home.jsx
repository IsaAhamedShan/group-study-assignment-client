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
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import {
  Link as scrollLink,
  Element,
  Events,
  animateScroll as scroll,
  scroller,
} from "react-scroll";
import ContactUs from "../components/Common/ContactUs";
const Home = () => {
  const { userCreationTime, userTotalSubmissionCount, user } =
    useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // console.log("userCreationTime at home is: " + userCreationTime);
  // console.log("user at home is ", user)
  const taskCheckMutation = useMutation({
    mutationFn: async () => {
      axiosSecure
        .patch("/allAssignmentsCheck")
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
      <div>
      <Element name="Hero">
        <Hero></Hero>
      </Element>
      <Element name="CardComponent">
        <CardComponent></CardComponent>
      </Element>
      <Element name="Features">
        <Features></Features>
      </Element>
    <Element>
      <ContactUs>
        
      </ContactUs>
    </Element>
      <Element name="Footer">
        <Footer></Footer>
      </Element>
    </div>
    </div>
  );
};

export default Home;
