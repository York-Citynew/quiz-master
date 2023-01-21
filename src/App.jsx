import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./routes/navbar/navbar.component";
import ErrorPage from "./routes/error-page/error-page.component";
import Home from "./routes/home/home.component";
import Quiz from "./routes/quiz/quiz.component";
import Result from "./routes/result/result.component";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/store/features/user/user-slice";
import Leaderboard from "./routes/leaderboard/leaderboard.component";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      { path: "result", element: <Result /> },
      { path: "leaderboard", element: <Leaderboard /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, []);
  return <RouterProvider router={router} />;
};
export default App;
