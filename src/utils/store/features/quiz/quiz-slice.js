import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  quizData: { difficulty: null, category: null, duration: null, tests: [] },
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
      case "computers":
        categoryCode = 18;
        break;

      default:
        break;
    }
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${payload.quantity}&category=${categoryCode}&difficulty=${payload.difficulty}&type=multiple`
      );
      const data = await res.json();
      const tests = await data.results.map((item) => ({
        ...item,
        selectedValue: "",
      }));
      return {
        difficulty: tests[0].difficulty,
        category: tests[0].category,
        duration: null,
        tests: tests,
      };
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
      state.quizData.tests[questionNumber].selectedValue = selectedOption;
    },
    setQuizData: (state, { payload }) => {
      state.quizData.tests = payload;
    },
    setQuizDataDuration: (state, { payload }) => {
      state.quizData.duration = payload;
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
export const { setSelectedValue, setQuizData, setQuizDataDuration } =
  quizSlice.actions;
export default quizSlice.reducer;
