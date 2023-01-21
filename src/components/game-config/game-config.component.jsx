import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "../../utils/store/features/modal/modal-slice";
import { getQuizData } from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../button/button.component";
import "./game-config.styles.scss";
import {
  CustomInputLabel,
  CustomMenuItem,
  CustomSelect,
} from "../../mui.styles";
import { muiStyles } from "../../mui.styles";
import { useNavigate } from "react-router-dom";
const OPTIONS_DATA = [
  { label: "quantity", options: [5, 10, 15] },
  {
    label: "difficulty",
    options: ["easy", "medium", "hard"],
  },
];
const GameConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    quantity: 5,
    difficulty: "easy",
    category: isActive.toLowerCase(),
  });
  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const cancelClickHandler = () => {
    dispatch(setIsActive(""));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(getQuizData(formData));
      dispatch(setIsActive(""));
      navigate("quiz");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='game-config-container'>
      <h3 className='game-config-h3'>{isActive}</h3>
      <form
        onSubmit={submitHandler}
        className='game-config-form'
      >
        {OPTIONS_DATA.map(({ label, options }) => (
          <div
            key={label}
            className='game-config-inputs-container'
          >
            <CustomInputLabel id={`${label}-label`}>
              {label.toLocaleUpperCase()}
            </CustomInputLabel>
            <CustomSelect
              sx={muiStyles}
              labelId={`${label}-label`}
              value={formData[label]}
              label={label.toLocaleUpperCase()}
              onChange={handleFormData}
              autoWidth
              required
              name={label}
            >
              {options.map((option) => (
                <CustomMenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </CustomMenuItem>
              ))}
            </CustomSelect>
          </div>
        ))}
        <Button
          type='button'
          onClick={cancelClickHandler}
          buttonType={BUTTON_TYPES.CANCEL}
        >
          Cancel
        </Button>
        <Button buttonType={BUTTON_TYPES.MAIN}>Begin</Button>
      </form>
      {!user && (
        <span className='error-message'>
          You haven't logged in yet. Progress will not be saved
        </span>
      )}
    </div>
  );
};

export default GameConfig;
