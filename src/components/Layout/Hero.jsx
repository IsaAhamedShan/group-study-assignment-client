import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import ReactiveButton from 'reactive-button';
const Hero = () => {
  const imgLink = "https://i.ibb.co/MSXCGJc/wallpaperflare-com-wallpaper-1.jpg";
  const backgroundStyle = {
    backgroundImage: `url(${imgLink})`,
  };
  const { user } = useContext(AuthContext);
  return (
    <div
      className="hero min-h-[40vh] md:min-h-[50vh] lg:min-h-[50vh] snap-center"
      style={backgroundStyle}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl w-[60vw] md:w-full md:text-5xl font-bold font-raleway">
            Study Smarter, Study Together!
          </h1>
          {/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
          <Link to={user ? "/allAssignment" : "/signin"}>
         

          <ReactiveButton color="light" size="medium" outline idleText={"Get Started"}  />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
