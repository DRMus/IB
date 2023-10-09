import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./component/Main/Main";
import { MainContextProvider } from "./contexts/MainContext";
import LabOne from "./component/LabOne/LabOne";
import LabTwo from "./component/LabTwo/LabTwo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "lab1", element: <LabOne /> },
      { path: "lab2", element: <LabTwo /> },
    ],
  },
]);

function App() {
  return (
    <MainContextProvider>
      <RouterProvider router={routes} />
    </MainContextProvider>
  );
}

export default App;
