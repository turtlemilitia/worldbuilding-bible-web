import React, {JSX, useEffect} from "react";
import {csrfCookie} from "../services/AuthService";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthProviderParams {
    children: JSX.Element | Array<JSX.Element>
}

const AuthProvider = ({children}: AuthProviderParams): JSX.Element => {

    const { token } = useAppSelector((state: RootState) => state.auth) // redux
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        csrfCookie().then(() => console.log('CSRF Cookie set.'));
    }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token')

            // dont need to navigate to login here as that's in the ProtectedRoute
        }
    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider;