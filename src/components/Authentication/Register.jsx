import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { register, user, auth, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const successRegistration = () => {
    toast.success("Registration success!");
  };
  const unsuccessfulRegistration = () => {
    toast.error("Registration unsuccessful!");
  };
  const axiosSecure = useAxiosSecure();
  const registrationMutation = useMutation({
    mutationFn: async ({ username, email, password }) => {
      console.log(
        "add user details inside mutationFn is: ",
        username,
        email,
        password
      );
      try {
        const res = await register(email, password);
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        const userinsertres = await axiosSecure.post("/users", {
          username: username,
          email: email,
          image: auth.currentUser.photoURL ? auth.currentUser.photoURL : null,
        });
        // console.log("registration response: ",res);
        // console.log("user insert res response: ",userinsertres);
        if(userinsertres){
          // logOut();
          successRegistration();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        unsuccessfulRegistration();
      }
    },
    onSuccess: console.log("mutate function success"),
  });
  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(username, email, password);
    await registrationMutation.mutateAsync({ username, email, password });
  };

  return (
    <div className="hero min-h-[50vh] h-auto lg:min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full md:min-w-[350px] md:p-6 lg:min-w-[400px]  lg:p-8 shadow-2xl rounded-none  bg-base-300">
          <form className="card-body " onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">USERNAME</span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="input rounded-none px-1 w-full bg-base border-b-base-300 border-x-0 border-t-0"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">EMAIL</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                name="email"
                className="input px-1 rounded-none w-full bg-base border-b-base-300 border-x-0 border-t-0"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PASSWORD</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input px-1 w-full rounded-none bg-base border-b-base-300 border-x-0 border-t-0 pr-10"
                  required
                />
                <div
                  className="absolute top-1/3 right-3"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <FaEye className="cursor-pointer"></FaEye>
                  ) : (
                    <FaEyeSlash className="cursor-pointer"></FaEyeSlash>
                  )}
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
            <button className="btn rounded-sm">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
