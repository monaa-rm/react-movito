import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import Details from "./components/details/Details";
import PersonDetails from "./components/details/PersonDetails";
import NotFound from "./utils/NotFound";
import Footer from "./components/footer";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <Footer />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element:  <ProfileScreen />,
    errorElement: <NotFound />,
  },
  {
    path: "/movie/:movieId",
    element: (
      <>
        <Details />
        <Footer />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/person/:actorId",
    element: (
      <>
        <PersonDetails />
        <Footer />
      </>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/notFound",
    element: <NotFound />,
  },
  {
    path: "*",
    element: (
      <>
        <App />
        <Footer />
      </>
    ),
  },
]);


