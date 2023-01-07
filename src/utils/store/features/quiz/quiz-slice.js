import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  quizData: [],
  isLoading: false,
};
export const getQuizData = createAsyncThunk(
  "quiz/getQuizData",
  async (payload, thunkAPI) => {
    let categoryCode = "";
    switch (payload.category) {
      case "video games":
        categoryCode = 15;
        break;
      case "movies":
        categoryCode = 11;
        break;
      case "technology":
        categoryCode = 18;
        break;

      default:
        break;
    }
    try {
      const quizRes = await fetch(
        `https://opentdb.com/api.php?amount=${payload.quantity}&category=${categoryCode}&difficulty=${payload.difficulty}&type=multiple`
      );
      const quizData = await quizRes.json();
      return quizData.results.map((item) => ({ ...item, selectedValue: "" }));
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedValue: (state, { payload }) => {
      const { questionNumber, selectedOption } = payload;
      state.quizData[questionNumber].selectedValue = selectedOption;
    },
    setQuizData: (state, { payload }) => {
      state.quizData = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQuizData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.quizData = payload;
    });
    builder.addCase(getQuizData.rejected, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
  },
});
export const { setSelectedValue, setQuizData } = quizSlice.actions;
export default quizSlice.reducer;
