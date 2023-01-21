import Modal from "../../components/modal/modal.component";
import Button, {
  BUTTON_TYPES,
  buttonVariants,
} from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import "./leaderboard.styles.scss";
import { queryScoresData } from "../../utils/firebase/firebase.utils";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner/spinner.component";
const stringToCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [tab, setTab] = useState("movies");
  const navigate = useNavigate();
  const navigateHandler = () => navigate("/");

  const tabChangeHandler = (e) => {
    const tabCamelCase = stringToCamelCase(e.target.textContent);
    setTab(tabCamelCase);
  };
  useEffect(() => {
    const getLeaderboardData = async () => {
      const data = await queryScoresData();
      setLeaderboardData(data);
    };
    getLeaderboardData();
  }, []);
  if (!leaderboardData) return <Spinner />;
  return (
    <Modal>
      <div className='center leaderboard-container'>
        <div className='filter-buttons'>
          <Button
            onClick={tabChangeHandler}
            buttonType={
              tab === "movies" ? BUTTON_TYPES.ACTIVE_TAB : BUTTON_TYPES.MAIN
            }
          >
            movies
          </Button>
          <Button
            onClick={tabChangeHandler}
            buttonType={
              tab === "videoGames" ? BUTTON_TYPES.ACTIVE_TAB : BUTTON_TYPES.MAIN
            }
          >
            video games
          </Button>
          <Button
            onClick={tabChangeHandler}
            buttonType={
              tab === "computers" ? BUTTON_TYPES.ACTIVE_TAB : BUTTON_TYPES.MAIN
            }
          >
            computers
          </Button>
        </div>
        <div className='table'>
          {leaderboardData[tab].map((item, index) => (
            <div
              className='row'
              key={index}
            >
              <span className='no'>{index}.</span>
              <span className='name'>{item.name}</span>
              <span className='score'>{item.highestScore}</span>
            </div>
          ))}
        </div>
        <div className='handle-nav'>
          <Button buttonType={BUTTON_TYPES.MAIN}>show more</Button>
          <Button
            onClick={navigateHandler}
            buttonType={BUTTON_TYPES.MAIN}
          >
            go home
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Leaderboard;