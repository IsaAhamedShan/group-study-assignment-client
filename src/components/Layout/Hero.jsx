import React from 'react';

const Hero = () => {

    const imgLink = 'https://i.ibb.co/MSXCGJc/wallpaperflare-com-wallpaper-1.jpg'
    const backgroundStyle = {
        backgroundImage:`url(${imgLink})`
    }
    return (
        <div className="hero min-h-[95vh]" style={backgroundStyle}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Study Smarter, Study Together!</h1>
            {/* <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    );
};

export default Hero;