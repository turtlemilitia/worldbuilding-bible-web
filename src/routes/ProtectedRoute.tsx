import { JSX, useEffect } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks'
import { RootState } from '../store'
import { indexSystems } from '../services/SystemService'
import { setSystems } from '../reducers/system/systemsIndexSlice'
import { indexCompendia } from '../services/CompendiumService'
import { setCompendia } from '../reducers/compendium/compendiaIndexSlice'

export const ProtectedRoute = (): JSX.Element => {
    const {token} = useAppSelector((state: RootState) => state.auth) // redux

    const dispatch = useAppDispatch();

    // Here we will be adding the missing items where needed
    useEffect(() => {
        if (token) {
            // Fetch the systems data from the API
            indexSystems()
              .then(response => dispatch(setSystems(response.data.data)))
              .catch(error => console.error('Error fetching systems:', error)); // todo show error
            // Fetch the systems data from the API
            indexCompendia()
              .then(response => dispatch(setCompendia(response.data.data)))
              .catch(error => console.error('Error fetching systems:', error)); // todo show error
        }
    }, [token]);

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login"/>

    }

    // If authenticated, render the child routes
    return <Outlet/>;
}