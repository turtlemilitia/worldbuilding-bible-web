import {useAuth} from "../providers/AuthProvider";
import {ProtectedRoute} from "./ProtectedRoute";
import {createBrowserRouter, Outlet, RouteObject, RouterProvider} from "react-router-dom";
import React, {JSX} from "react";
import {Router as RemixRouter} from "@remix-run/router/dist/router";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import bg2 from "../assets/images/landingBackground.jpg";
import Nav from "../components/Nav/Nav";

function NavBarWrapper(): JSX.Element {
  return (
    <div
      className="font-serif flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-center"
      style={{backgroundImage: `url(${bg2})`}}>
      <Nav/>
      <Outlet/>
    </div>
  );
}

const Routes = (): JSX.Element => {

  const {token} = useAuth();

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: "/about",
      element: <>TODO: About us</>
    }
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute/>, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <>TODO: Dashboard</>
        },
        {
          path: "/profile",
          element: <>TODO: User Profile</>
        },
        {
          path: "/logout",
          element: <Logout/>,
        },
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router: RemixRouter = createBrowserRouter([
    {
      path: "/",
      element: <NavBarWrapper/>,
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []), // only add these conditionally
        ...routesForAuthenticatedOnly
      ]
    }
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}/>
}

export default Routes;