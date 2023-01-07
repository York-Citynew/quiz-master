import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setIsActive } from "../../utils/store/features//modal/modal-slice";
import "./category-card.styles.scss";
const containerVariants = {
  initial: {
    opacity: 0,
    x: "1vw",
  },
  onView: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
const textVariants = {
  initial: {
    x: "-100vw",
  },
  onView: {
    x: 0,
  },
};
const CategoryCard = ({ imgUrl, title, desc }) => {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(setIsActive(title));
  return (
    <motion.div
      className='category-card-container'
      onClick={clickHandler}
      variants={containerVariants}
      initial='initial'
      whileInView='onView'
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ opacity: 1 }}
        className='category-card-info-container'
      >
        <motion.h3
          viewport={{ once: true }}
          variants={textVariants}
        >
          {title}
        </motion.h3>
        <motion.span
          viewport={{ once: true }}
          variants={textVariants}
        >
          {desc}
        </motion.span>
      </motion.div>
      <img
        src={imgUrl}
        alt={`${title} image`}
      />
    </motion.div>
  );
};

export default CategoryCard;
