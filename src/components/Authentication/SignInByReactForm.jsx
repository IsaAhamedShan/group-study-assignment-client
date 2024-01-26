import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const SignInByReactForm = () => {
  const { logIn, googleSignIn, auth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const signInSuccess = () => {
    toast.success("Sign In Success");
  };
  const signInUnsuccess = () => {
    toast.error("Sign In Unsuccess");
  };
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmit = data => {
    console.log(data);
    const { email, password } = data;
    logIn(email, password)
      .then(res => {
        console.log(res);
        signInSuccess();
        const user = { email };
        axiosSecure
          .post("/jwt", user)
          .then(res => {
            console.log(
              "cookie created and stored In localStorage successfully.",
              res
            );
          })
          .catch(error => {
            console.log("error creating cookie: ", error);
          });
        navigate(location?.state ? location?.state : "/");
        console.log("loacton is ", location.state);
      })
      .catch(error => {
        console.log(error);
        signInUnsuccess();
      });
  };
  const handleGoogleSignIn = ()=>{
    googleSignIn()
    .then(res => {
      console.log(res);
      axiosSecure
        .post("/users", {
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          image: auth.currentUser.photoURL ? auth.currentUser.photoURL : null,
        })
        .then(function (response) {
          console.log(response);
          navigate(location?.state ? location?.state : "/");
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
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-base-100 min-h-screen font-raleway">
        <div className="hero min-h-[50vh] h-auto lg:min-h-screen">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full md:min-w-[350px] md:p-6 lg:min-w-[400px]  lg:p-8 shadow-2xl rounded-none  bg-base-300">
              <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                  className="input rounded-none px-1 w-full bg-base  border-b-base-300 border-x-0 border-t-0"
                  type="text"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="example@gmail.com"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600" role="alert">Email is required</p>
                )}
                <label htmlFor="password">Password</label>
                <input
                  className="input rounded-none px-1 w-full bg-base border-b-base-300 border-x-0 border-t-0 pr-10"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength:{
                      value: 6,
                      message: "It should be at least 6 characters"
                    }
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="Password here"
                />
                {errors.password && (
                  <p className="text-red-600" role="alert">{errors.password.message}</p>
                )}

                <button
                  className="btn rounded-sm"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
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
    </div>
  );
};

export default SignInByReactForm;
