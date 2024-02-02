import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react'
import {csrfCookie} from "../services/AuthService";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'

const AuthProvider: FunctionComponent<PropsWithChildren> = ({children}) => {

    const { token } = useAppSelector((state: RootState) => state.auth) // redux

    useEffect(() => {
        csrfCookie().then(() => console.log('CSRF Cookie set.'));
    }, [token])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token')

            // dont need to navigate to login here as that's in the ProtectedRoute
        }
    }, [token])

    return (
        <>{children}</>
    )
}

export default AuthProvider;