import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuizData } from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import "./result.styles.scss";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = () => {
    navigate("/");
  };
  const { quizData } = useSelector((state) => state.quiz);
  console.log(quizData);
  const score = quizData.filter(
    (item) => item.selectedValue === item.correct_answer
  ).length;
  useEffect(() => {
    return () => {
      () => dispatch(setQuizData([])); //not working
    };
  }, []);
  return (
    <Modal>
      <div className='result-container'>
        {quizData.map((item) => (
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
                        item.selectedValue === option ? "correct" : "wrong"
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
        <span>{score}</span>
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
