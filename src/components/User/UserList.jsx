import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserList = () => {
  const query = useQuery({
    queryKey: ["allUsersList"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/allUsersList");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  if (query.isLoading) {
    return (
      <div className="text-5xl flex justify-center items-center h-[90vh]">
        <span className="loading loading-infinity w-[400px] h-[250px]"></span>
      </div>
    );
  }

  if (query.isError) {
    return <div className="text-5xl">{query.error.message}</div>;
  }

  return (
    <div>
        <div></div>
      
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
            <tr>
              <th>
                <label>
                  <th className="text-base">Name</th>
                </label>
              </th>
              <th className="text-base hidden md:block">Email</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              {/* row 1 */}
              {query.data.map(item => ( <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xl">{item.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-xl hidden md:block">
                  {item.email}
                  <br />
                </td>

                {/* <th className="hidden md:block">
                  <button className="btn btn-ghost rounded-sm btn-sm">delete</button>
                </th> */}
              </tr>))}
              
            </tbody>
          </table>
        </div>
     
    </div>
  );
};

export default UserList;
