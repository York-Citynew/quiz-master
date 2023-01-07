import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import modalReducer from "./features/modal/modal-slice";
import quizReducer from "./features/quiz/quiz-slice";

const rootReducer = combineReducers({
  modal: modalReducer,
  quiz: quizReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["quiz"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
