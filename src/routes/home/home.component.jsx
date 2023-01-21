import { useSelector } from "react-redux";
import Intro from "../../components/intro/intro.component";
import "./home.styles.scss";
import CategoryCards from "../../components/category-cards/category-cards.component";
import Modal from "../../components/modal/modal.component";
import GameConfig from "../../components/game-config/game-config.component";
import SignInConfig from "../../components/sign-in-config/sign-in-config.compoennt";
import { AnimatePresence } from "framer-motion";
const CATEGORY_CARDS = [
  {
    title: "Video Games",
    desc: "test your video game industry knowledge to realize how far you've come",
    imgUrl: "https://imgpile.com/images/d1Hjc4.png",
    key: 1,
  },
  {
    title: "Movies",
    desc: "test your movie industry knowledge to realize how far you've come",
    imgUrl: "https://imgpile.com/images/d1He5M.png",
    key: 2,
  },
  {
    title: "Computers",
    desc: "test your technology knowledge to realize how far you've come",
    imgUrl: "https://imgpile.com/images/d1HyW2.png",
    key: 3,
  },
];
const Home = () => {
  const { isActive } = useSelector((state) => state.modal);
  return (
    <div className='home-container'>
      <AnimatePresence mode='wait'>
        {isActive && (
          <Modal>
            {isActive === "sign in" ? <SignInConfig /> : <GameConfig />}
          </Modal>
        )}
      </AnimatePresence>
      <Intro />
      <span
        id='choose-text-id'
        className='choose-text'
      >
        Choose a category
      </span>
      <CategoryCards cards={CATEGORY_CARDS} />
    </div>
  );
};

export default Home;
