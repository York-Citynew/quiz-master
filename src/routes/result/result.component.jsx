import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuizData } from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import "./result.styles.scss";
import Spinner from "../../components/spinner/spinner.component";
import {
  addUserRecord,
  deleteUserQuiz,
  getUserAnswers,
} from "../../utils/firebase/firebase.utils";
const scoreCalculator = (difficulty, duration, percentage) => {
  const normalScore = duration * percentage;
  switch (difficulty) {
    case "hard":
      return 2 * normalScore;
    case "medium":
      return 1.5 * normalScore;
    case "easy":
      return normalScore;
    default:
      break;
  }
};
const Result = () => {
  let correctAnswersAmount = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = () => {
    navigate("/");
  };
  const { quizTests, quizAnswers, isLoading } = useSelector(
    (state) => state.quiz
  );
  const { category, difficulty, duration, tests } = quizTests;
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      (async () => {
        correctAnswersAmount = await quizTests.tests.filter(
          (item, index) => item.selectedValue === quizAnswers[index]
        ).length;
        await addUserRecord(
          user,
          scoreCalculator(
            difficulty,
            duration,
            correctAnswersAmount / tests.length
          ),
          category
        );
      })();
    }
    return () => {
      deleteUserQuiz(user); //Hoist it on componentMount
      dispatch(setQuizData([])); //not working properly in strict mode
      //not working(again)
    };
  }, []);
  if (isLoading) return <Spinner />;

  return (
    <Modal>
      <div className='result-container'>
        {quizTests.tests.map((item, index) => (
          <div
            key={item.question}
            className='test-result-container'
          >
            <span className='test-question'>{item.question}</span>
            <ul>
              {item.options.map((option) => {
                return (
                  <li
                    className={`test-options ${
                      item.selectedValue === option &&
                      item.selectedValue /*item.correct_answer*/ ===
                        quizAnswers[index]
                        ? "win"
                        : item.selectedValue === option
                        ? "correct"
                        : "loss"
                    }`}
                    key={option}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {/* {correctAnswersAmount && (
          <span>correct answers: {correctAnswersAmount}</span>
        )} */}
      </div>
      <Button
        buttonType={BUTTON_TYPES.MAIN}
        onClick={navigateHandler}
      >
        Go home
      </Button>
    </Modal>
  );
};

export default Result;
