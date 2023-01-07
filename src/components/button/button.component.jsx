import "./button.styles.scss";
import { motion } from "framer-motion";
export const BUTTON_TYPES = {
  MAIN: "main",
  CANCEL: "cancel",
};
export const buttonVariants = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};
const Button = ({ buttonType, children, ...rest }) => {
  return (
    <motion.button
      variants={buttonVariants}
      whileHover='hover'
      whileTap='tap'
      {...rest}
      className={`button ${buttonType}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
