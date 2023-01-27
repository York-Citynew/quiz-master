import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAnswers,
  setQuizDataDuration,
} from "../../utils/store/features/quiz/quiz-slice";
import Modal from "../../components/modal/modal.component";
import QuestionBox from "../../components/question-box/question-box.component";
import Spinner from "../../components/spinner/spinner.component";

const s = 1000;
const Quiz = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { isLoading, quizTests } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setElapsedTime((prev) => (prev += 1000));
    }, 1000);
    return () => {
      dispatch(getAnswers(user.uid));
    };
  }, []); // isLoading as dependency array? spinner's re-renders: the stopwatch inits before the data is fetched
  // duration is not accurate
  useEffect(() => {
    return () => {
      dispatch(setQuizDataDuration(elapsedTime));
    };
  }, [elapsedTime]);
  const second = (elapsedTime % (60 * s)) / s;
  const minute = Math.floor(elapsedTime / (60 * s));
  if (isLoading) return <Spinner />;

  return (
    <Modal>
      <QuestionBox
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        quizTests={quizTests.tests[questionNumber]}
        quizLength={quizTests.tests.length}
      />
      <span>
        {minute < 9 ? `0${minute}` : `${minute}`}:
        {second < 9 ? `0${second}` : `${second}`}
      </span>
    </Modal>
  );
};

export default Quiz;
