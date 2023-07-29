import React, {JSX, useEffect} from "react";
import {csrfCookie} from "../services/AuthService";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'

interface AuthProviderParams {
    children: JSX.Element | Array<JSX.Element>
}

const AuthProvider = ({children}: AuthProviderParams): JSX.Element => {

    const { token } = useAppSelector((state: RootState) => state.auth) // redux

    const navigate = useNavigate();

    useEffect(() => {
        csrfCookie().then(() => console.log('CSRF Cookie set.'));
    }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token')
            navigate('/login');
        }
    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider;