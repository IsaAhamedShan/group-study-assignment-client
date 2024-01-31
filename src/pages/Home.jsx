import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

import Hero from "../components/Layout/Hero";

import Footer from "../components/Common/Footer";
import Features from "../components/Layout/Features";

import {
  Element,
} from "react-scroll";
import ContactUs from "../components/Common/ContactUs";
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import CardComponent from "../components/Layout/cardComponent";
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
      <Element name="Features">
        <Features></Features>
      </Element>
      <Element name="CardComponent">
        <CardComponent></CardComponent>
      </Element>
    <Element name="ContactUs">
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
