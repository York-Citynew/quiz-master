import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "../../utils/store/features/modal/modal-slice";
import { getQuizData } from "../../utils/store/features/quiz/quiz-slice";
import Button, { BUTTON_TYPES } from "../button/button.component";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
    <>
      <h3>{isActive}</h3>
      <form onSubmit={submitHandler}>
        {OPTIONS_DATA.map(({ label, options }) => (
          <div key={label}>
            <InputLabel
              sx={{ color: "white", border: "white" }}
              id={`${label}-label`}
            >
              {label.toLocaleUpperCase()}
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId={`${label}-label`}
              value={formData[label]}
              label={label.toLocaleUpperCase()}
              onChange={handleFormData}
              autoWidth
              required
              name={label}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
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
    </>
  );
};

export default GameConfig;
