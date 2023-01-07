import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/modal/modal.component";
import QuestionBox from "../../components/question-box/question-box.component";
import Spinner from "../../components/spinner/spinner.component";

const Quiz = () => {
  const { isLoading, quizData } = useSelector((state) => state.quiz);
  const [questionNumber, setQuestionNumber] = useState(0);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Modal>
      <QuestionBox
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        quizData={quizData[questionNumber]}
        quizLength={quizData.length}
      />
    </Modal>
  );
};

export default Quiz;
