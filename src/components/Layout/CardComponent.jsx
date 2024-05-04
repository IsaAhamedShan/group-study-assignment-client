import { motion } from "framer-motion";
import { useState } from "react";
import aboutusmain from "../../assets/aboutusmain.jpeg";
import aboutussub from "../../assets/aboutussub.jpeg";
import AboutUs from "./AboutUs";

const CardComponent = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };
  return (
    <div className="flex items-center justify-center h-[400px] md:h-[600px] lg:h-[800px] w-[100vw] md:w-full cursor-pointer" style={{backgroundImage: `url(${aboutusmain})`,backgroundSize:"cover", backgroundPosition:'center', backgroundRepeat:"no-repeat"}}>
      <div className="flip-card px-4 lg:px-0 w-[78.28%] h-[80.25%]" onClick={handleClick}>
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{
            duration: 0.1,
            animationDirection: "normal",
          }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-full h-full " style={{backgroundImage: `url(${aboutussub})`,backgroundSize:"cover", backgroundPosition:'center', backgroundRepeat:"no-repeat"}}>
          </div>
          <div className="flip-card-back w-full h-full bg-base-100 ">
            <AboutUs></AboutUs>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default CardComponent;
