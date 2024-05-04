import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AssignmentCard from "../components/Assignment/AssignmentCard";
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import useDebounce from "../components/Hooks/useDebounce";
const AssignmentCompleteList = () => {
  const [idForDetails, setIdForDetails] = useState("");
  const [assignmentComplete, setAssignmentComplete] = useState(true);
  const [totalData, setTotalData] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search,500)
  // const [isLoading,setIsLoading] = useState(true)
  const axiosSecure = useAxiosSecure();
  const handleInputChange = e => {
    let value = e.target.value;
    setSearch(value);
    console.log(value);
  };
  const getAssignmentCompleteList = async () => {
    try {
      const response = await axiosSecure.get("/allAssignmentCompleteList");
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const assignmentCompleteListMutation = useQuery({
    queryKey: ["assignmentCompleteList"],
    queryFn: getAssignmentCompleteList,
    onSuccess: console.log(
      "allAssignments mutation function successfully executed"
    ),
  });
  useEffect(()=>{
    if(!assignmentCompleteListMutation.isLoading){
      const filteredData = assignmentCompleteListMutation.data.filter(item=>{
        return item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      })
      setTotalData(filteredData)
    }
  },[assignmentCompleteListMutation.data,assignmentCompleteListMutation.isLoading,debouncedSearch])
  // console.log("🚀 ~ AssignmentCompleteList ~ filteredAssignmentList:", filteredAssignmentList)

  if (assignmentCompleteListMutation.isLoading) {
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">
        <span className="loading loading-infinity w-[400px] h-[250px]"></span>
      </div>
    );
  }
  if (assignmentCompleteListMutation.isError) {
    return (
      <div className="text-5xl">
        {assignmentCompleteListMutation.error.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center gap-4 flex-wrap py-14">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Assignment Complete List</title>
        </Helmet>
        {totalData &&
          totalData?.map(item => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
              viewport={{ once: true }}
            >
              <AssignmentCard
                item={item}
                idForDetails={idForDetails}
                setIdForDetails={setIdForDetails}
                assignmentComplete={assignmentComplete}
              ></AssignmentCard>
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default AssignmentCompleteList;
