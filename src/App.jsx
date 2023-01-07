import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./routes/navbar/navbar.component";
import ErrorPage from "./routes/error-page/error-page.component";
import Home from "./routes/home/home.component";
import Quiz from "./routes/quiz/quiz.component";
import Result from "./routes/result/result.component";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      { path: "result", element: <Result /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
