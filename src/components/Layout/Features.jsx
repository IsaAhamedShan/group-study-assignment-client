import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const Features = () => {
  // console.log('index: ' + index);
  // console.log('item: ' + item);
  const axiosSecure = useAxiosSecure();
  const featuresMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/659dbfa1dc746540188f61e4"
        );
        return response.data.record;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("feature check function executed successfully");
    },
  });

  useEffect(() => {
    featuresMutation.mutate();
  }, []);

  return (
    <div className="flex flex-col w-full md:flex-row flex-wrap gap-4 justify-between py-12">
      {featuresMutation.isSuccess ? (
        <>
          {/* <p>length: {featuresMutation.data.length}</p> */}
          {featuresMutation.data.map((item, index) => (
            <motion.div
              key={item.id}
              className={`flex flex-wrap md:w-[49%] hover:scale-105 duration-200 h-80 border-2 ${
                index % 2 === 0
                  ? "rounded-r-3xl mr-10 my-5 md:my-0 md:mr-0"
                  : "rounded-l-3xl ml-10 my-5 md:my-0 md:ml-0"
              }`}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              initial={{
                x: index % 2 === 0 ? -60 : 60,
                opacity: 0.2,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              viewport={{ once: true }}
            >
              <Link to={item.location} className="w-full">
                <div>
                  <p
                    className={`py-8 z-10 px-8 text-3xl font-bold bg-gradient-to-r from-[#f84747] via-green-500 to-indigo-400  text-transparent bg-clip-text font-rancho ${
                      index % 2 !== 0 ? "text-right" : "text-left"
                    }`}
                  >
                    {item.heading}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </>
      ) :  <div className="mx-auto loading loading-ring loading-5xl w-[400px] h-[250px]"></div>}
    </div>
  );
};

export default Features;
