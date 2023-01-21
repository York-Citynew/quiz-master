import { useDispatch } from "react-redux";
import { setIsActive } from "../../utils/store/features/modal/modal-slice";
import "./modal.styles.scss";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material";
const backdropVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};
const modalVariants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  exit: {
    scale: 0,
    transition: { duration: 0.05 },
  },
};
const theme = createTheme({
  primary: "#c1436d",
});
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const backdropCancelHandler = (e) => {
    e.target.className === "backdrop" && dispatch(setIsActive(""));
  };
  return (
    <motion.div
      variants={backdropVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='backdrop'
      onClick={backdropCancelHandler}
    >
      <motion.div
        variants={modalVariants}
        className='modal-container'
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </motion.div>
    </motion.div>
  );
};
export default Modal;
