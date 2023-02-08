import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Navbar = lazy(() => import("./routes/navbar/navbar.component"));
const ErrorPage = lazy(() =>
  import("./routes/error-page/error-page.component")
);
const Home = lazy(() => import("./routes/home/home.component"));
const Quiz = lazy(() => import("./routes/quiz/quiz.component"));
const Result = lazy(() => import("./routes/result/result.component"));
const Leaderboard = lazy(() =>
  import("./routes/leaderboard/leaderboard.component")
);
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/store/features/user/user-slice";
import Spinner from "./components/spinner/spinner.component";
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
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
