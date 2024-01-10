import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
const SignIn = () => {
  const navigate= useNavigate()
  const signInSuccess = () => {
    toast.success("Sign In Success");
  };
  const signInUnsuccess = () => {
    toast.error("Sign In Unsuccess");
  };
  const [showPass, setShowPass] = useState(false);
  const { logIn, googleSignIn, auth } = useContext(AuthContext);
  const signInMutation = useMutation({
    mutationFn: ({ email, password }) => {
      logIn(email, password)
        .then(res => {
          console.log(res);
          signInSuccess();
          navigate('/')

        })
        .catch(error => {
          console.log(error);
          signInUnsuccess();
        });
    },
  });
  const handleSignIn = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    await signInMutation.mutateAsync({ email, password });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        console.log(res);
        axios
          .post("http://localhost:5000/users", {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            image: auth.currentUser.photoURL ? auth.currentUser.photoURL : null,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(auth.currentUser.email,auth.currentUser.email, auth.currentUser.photoURL)
        signInSuccess();
      })
      .catch(error => {
        signInUnsuccess();
        console.log(error);
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-base-100 min-h-screen font-raleway">
      <div className="hero min-h-[50vh] h-auto lg:min-h-screen">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full md:min-w-[350px] md:p-6 lg:min-w-[400px]  lg:p-8 shadow-2xl rounded-none  bg-base-300">
            <form className="card-body " onSubmit={handleSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold ">EMAIL</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  className="input rounded-none px-1 w-full bg-base  border-b-base-300 border-x-0 border-t-0 "
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold ">PASSWORD</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input rounded-none px-1 w-full bg-base border-b-base-300 border-x-0 border-t-0 pr-10"
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
                <button className="btn rounded-sm">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-10 md:py-0 justify-center items-center gap-6 [&>*]:w-[300px] bg-base">
        <div className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-base  hover:bg-base  hover:font-bold">
          <FaGithub className=""></FaGithub>
          <p className="">Continue with github</p>
        </div>
        <div
          className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-base text-base hover:bg-base   hover:font-bold"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className=""></FaGoogle>
          {/* <FaGoogle /> */}
          <p className="">Continue with google</p>
        </div>
        <div className="border flex justify-between items-center  px-10 py-4 hover:cursor-pointer  hover:translate-x-6 duration-300 ease-in-out hover:scale-105 bg-base hover:bg-base hover:font-bold">
          <FaFacebook className=""></FaFacebook>
          <p className="">Continue with facebook</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
