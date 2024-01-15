import React from 'react';
import {Link} from 'react-router-dom'
const Hero = () => {

    const imgLink = 'https://i.ibb.co/MSXCGJc/wallpaperflare-com-wallpaper-1.jpg'
    const backgroundStyle = {
        backgroundImage:`url(${imgLink})`
    }
    return (
        <div className="hero lg:min-h-[95vh] snap-center" style={backgroundStyle}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Study Smarter, Study Together!</h1>
            {/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
            <Link to="/signin"><button className="btn btn-primary">Get Started</button></Link>
          </div>
        </div>
      </div>
    );
};

export default Hero;