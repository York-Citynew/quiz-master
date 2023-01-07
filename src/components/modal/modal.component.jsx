import { useDispatch } from "react-redux";
import { setIsActive } from "../../utils/store/features/modal/modal-slice";
import "./modal.styles.scss";
import { AnimatePresence, motion } from "framer-motion";
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
      when: "beforeChildren",
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
  },
};
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const backdropCancelHandler = (e) => {
    e.target.className === "backdrop" && dispatch(setIsActive(""));
  };
  return (
    <AnimatePresence wait>
      <motion.div
        variants={backdropVariants}
        initial='initial'
        animate='animate'
        exit='exit' //now working
        className='backdrop'
        onClick={backdropCancelHandler}
      >
        <motion.div
          variants={modalVariants}
          className='modal-container'
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Modal;
