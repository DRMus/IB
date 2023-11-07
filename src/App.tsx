import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./component/Main/Main";
import { MainContextProvider } from "./contexts/MainContext";
import LabOne from "./component/LabOne/LabOne";
import LabTwo from "./component/LabTwo/LabTwo";
import LabThree from "./component/LabThree/LabThree";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "lab1", element: <LabOne /> },
      { path: "lab2", element: <LabTwo /> },
      { path: "lab3", element: <LabThree /> },
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
