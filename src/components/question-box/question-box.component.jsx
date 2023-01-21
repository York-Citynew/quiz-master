import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setQuizData,
  setSelectedValue,
} from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { useNavigate } from "react-router-dom";
import {
  CustomFormControlLabel,
  CustomFormLabel,
  CustomRadio,
  CustomRadioGroup,
} from "../../mui.styles";
const QuestionBox = ({
  quizTests,
  setQuestionNumber,
  questionNumber,
  quizLength,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question, correct_answer, incorrect_answers } = quizTests;
  const shuffledAnswers = useCallback(
    [correct_answer, ...incorrect_answers].sort(() => 0.5 - Math.random()),
    [quizTests]
  );
  const cancelHandler = () => {
    dispatch(setQuizData([]));
    navigate("/");
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };
  const backHandler = () => {
    setQuestionNumber((prev) => prev - 1);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSelectedValue({ selectedOption, questionNumber }));
    if (questionNumber >= quizLength - 1) {
      navigate("/result");
    } else {
      setQuestionNumber((prev) => prev + 1);
    }
  };
  return (
    <div className='question-box-container'>
      <form onSubmit={submitHandler}>
        <CustomFormLabel
          sx={{ color: "white" }} //needs fixing
          id='question-label'
        >
          {question}
        </CustomFormLabel>
        <CustomRadioGroup
          row
          aria-labelledby='question-label'
          onChange={handleSelectedOption}
          value={selectedOption}
        >
          {shuffledAnswers.map((answer) => (
            <CustomFormControlLabel
              sx={{ color: "white" }} //needs fixing
              key={answer}
              value={answer}
              control={<CustomRadio sx={{ color: "white" }} />} //needs fixing
              label={answer}
            />
          ))}
        </CustomRadioGroup>
        <Button buttonType={BUTTON_TYPES.MAIN}>Submit</Button>
        {questionNumber > 0 && (
          <Button
            type='button'
            buttonType={BUTTON_TYPES.MAIN}
            onClick={backHandler}
          >
            Back
          </Button>
        )}
        <Button
          onClick={cancelHandler}
          type='button'
          buttonType={BUTTON_TYPES.CANCEL}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default QuestionBox;
