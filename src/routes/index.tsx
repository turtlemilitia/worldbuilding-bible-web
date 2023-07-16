import {useAuth} from "../providers/AuthProvider";
import {ProtectedRoute} from "./ProtectedRoute";
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import {JSX} from "react";
import {Router as RemixRouter} from "@remix-run/router/dist/router";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = (): JSX.Element => {

    const { token } = useAuth();

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
        ...routesForPublic,
        ...(!token ? routesForAuthenticatedOnly : []), // only add these conditionally
        ...routesForNotAuthenticatedOnly
    ])

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router}/>
}

export default Routes;