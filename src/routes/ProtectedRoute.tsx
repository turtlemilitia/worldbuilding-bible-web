import {JSX} from "react";
import {Navigate, Outlet} from "react-router-dom";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'

export const ProtectedRoute = (): JSX.Element => {
    const {token} = useAppSelector((state: RootState) => state.auth) // redux

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login"/>
    }

    // If authenticated, render the child routes
    return <Outlet/>;
}