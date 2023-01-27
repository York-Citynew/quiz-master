import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAnswers, getUserTests } from "../../../firebase/firebase.utils";
const INITIAL_STATE = {
  quizTests: { difficulty: null, category: null, duration: null, tests: [] },
  quizAnswers: [],
  isLoading: false,
};
export const getTests = createAsyncThunk(
  "quiz/getTests",
  async (payload, thunkAPI) => {
    try {
      let tests = await getUserTests(payload);
      tests = await tests.map((item) => ({
        ...item,
        selectedValue: "",
      })); // payload is uid
      return {
        difficulty: tests[0].difficulty,
        category: tests[0].category,
        duration: null,
        tests: tests,
      };
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAnswers = createAsyncThunk(
  "quiz/getAnswers",
  async (payload, thunkAPI) => {
    try {
      return getUserAnswers(payload); // payload is uid
    } catch (error) {
      console.log(error);
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
      state.quizTests.tests[questionNumber].selectedValue = selectedOption;
    },
    setQuizData: (state, { payload }) => {
      state.quizTests.tests = payload;
    },
    setQuizDataDuration: (state, { payload }) => {
      state.quizTests.duration = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTests.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTests.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.quizTests = payload;
    });
    builder.addCase(getTests.rejected, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(getAnswers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAnswers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.quizAnswers = payload;
    });
    builder.addCase(getAnswers.rejected, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
  },
});
export const { setSelectedValue, setQuizData, setQuizDataDuration } =
  quizSlice.actions;
export default quizSlice.reducer;
