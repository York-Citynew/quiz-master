import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const styleSelector = ({ theme }) => ({
  color: theme.primary,
  "&.Mui-checked": {
    color: theme.primary,
  },
  "&::-webkit-input-placeholder": { color: "white" },
});
export const CustomInputLabel = styled(InputLabel)(styleSelector);
export const CustomSelect = styled(Select)(styleSelector);
export const CustomRadio = styled(Radio)(styleSelector);
export const CustomMenuItem = styled(MenuItem)(styleSelector);
export const CustomFormLabel = styled(FormLabel)(styleSelector);
export const CustomRadioGroup = styled(RadioGroup)(styleSelector);
export const CustomFormControlLabel = styled(FormControlLabel)(styleSelector);
export const CustomTextField = styled(TextField)(styleSelector);
export const muiStyles = {
  input: {
    color: "#cd688a",
    "&::placeholder": {
      // <----- Add this.
      opacity: 1,
    },
  },
  label: { color: "#cd688a" },
  width: "100%",
  margin: ".5em 0",
  color: "#c87b95",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#cd688a",
    borderWidth: "2px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cd688a",
    borderWidth: "2px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cd688a",
    borderWidth: "2px",
  },
  ".MuiSvgIcon-root ": {
    fill: "#cd688a !important",
  },
};
