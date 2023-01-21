import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuizData } from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import "./result.styles.scss";
import { addUserRecord } from "../../utils/firebase/firebase.utils";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = () => {
    navigate("/");
  };
  const { quizData } = useSelector((state) => state.quiz);
  const { category, difficulty, duration, tests } = quizData;
  const { user } = useSelector((state) => state.user);
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
  const correctAnswers = quizData.tests.filter(
    (item) => item.selectedValue === item.correct_answer
  ).length;

  useEffect(() => {
    const asyncFunc = async () => {
      await addUserRecord(
        user,
        scoreCalculator(difficulty, duration, correctAnswers / tests.length),
        category
      );
    };
    asyncFunc();
    if (user) asyncFunc();
    return () => {
      dispatch(setQuizData([])); //not working properly in strict mode
      //not working(again)
    };
  }, []);
  return (
    <Modal>
      <div className='result-container'>
        {quizData.tests.map((item) => (
          <div
            key={item.question}
            className='test-result-container'
          >
            <span className='test-question'>{item.question}</span>
            <ul>
              {[item.correct_answer, ...item.incorrect_answers].map(
                (option) => {
                  return (
                    <li
                      className={`test-options ${
                        item.selectedValue === option &&
                        item.selectedValue === item.correct_answer
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
                }
              )}
            </ul>
          </div>
        ))}
        <span>correct answers: {correctAnswers}</span>
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
