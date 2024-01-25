import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Hero = () => {
  const imgLink = "https://i.ibb.co/MSXCGJc/wallpaperflare-com-wallpaper-1.jpg";
  const backgroundStyle = {
    backgroundImage: `url(${imgLink})`,
  };
  const { user } = useContext(AuthContext);
  return (
    <div className="hero lg:min-h-[95vh] snap-center" style={backgroundStyle}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl w-[60vw] md:w-full md:text-5xl font-bold font-raleway">
            Study Smarter, Study Together!
          </h1>
          {/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
          <Link to={user ? "/allAssignment" : "/signin"}>
            <button className="btn font-roboto bg-base-500 btn-sm md:btn-md">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
