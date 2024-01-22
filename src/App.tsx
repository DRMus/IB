import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./component/Main/Main";
import { MainContextProvider } from "./contexts/MainContext";
import LabOne from "./component/LabOne/LabOne";
import LabTwo from "./component/LabTwo/LabTwo";
import LabThree from "./component/LabThree/LabThree";
import LabFour from "./component/LabFour/LabFour";
import LabFive from "./component/LabFive/LabFive";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "lab1", element: <LabOne /> },
      { path: "lab2", element: <LabTwo /> },
      { path: "lab3", element: <LabThree /> },
      { path: "lab4", element: <LabFour /> },
      { path: "lab5", element: <LabFive /> },
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
