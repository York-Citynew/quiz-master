import IntroCurve from "../../assets/intro-curve.component";
import "./intro.styles.scss";
import { buttonVariants } from "../button/button.component";
import { motion } from "framer-motion";
const heroButtonVariants = {
  scalingLoop: {
    scale: 1.1,
    transition: {
      repeatType: "mirror",
      duration: 0.5,
      repeat: Infinity,
    },
  },
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
}; //Needs fixing.(multiple variants!). scalingLoop animation goes out when whileHover is done
const Intro = () => {
  const wordsArray = "BEST QUIZ APP".split(" ");
  return (
    <div className='intro-container'>
      <IntroCurve>
        <div className='intro-text'>
          {wordsArray.map((word, index) =>
            index % 2 == 0 ? (
              <div key={index}>{word}</div>
            ) : (
              <div
                key={index}
                className='hero-text'
              >
                {word}
              </div>
            )
          )}
        </div>
        <motion.a
          href='#choose-text-id'
          className='intro-button'
          variants={heroButtonVariants}
          animate='scalingLoop'
          whileHover='hover'
          whileTap='tap'
        >
          Get started
        </motion.a>
      </IntroCurve>
    </div>
  );
};

export default Intro;
