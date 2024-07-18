import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import UserDocsPage from "./pages/UserDocs";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/userdocs",
    element: <UserDocsPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
