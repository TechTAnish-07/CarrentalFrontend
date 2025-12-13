// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Cars from "./components/Cars";
import AppLayout from "./components/layout/AppLayout";
import ContactUs from "./ContactUs";
import Admin from "./components/Admin";
import ErrorPage from "./components/errorPage";
import CarDetails from "./components/CarsDetails";
import AvailableCars from "./components/Availablecars";
import BookNow from "./components/BookNow";
import Success from "./components/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true, // same as path: "/"
        element: <Home />,
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },{
        path: "admin",
        element : <Admin/>
      },
      {
        path: "cars",
        element: <Cars />,
      },{
          path : 'cars/:id',
          element: <CarDetails/>
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "available",
        element: <AvailableCars />,
      },{
        path: "book/:id",
        element: <BookNow />,
        
      },{
        path: "booking/success",
        element: <Success/>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
