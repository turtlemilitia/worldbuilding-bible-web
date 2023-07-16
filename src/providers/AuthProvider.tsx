import axios from "axios";
import React, {createContext, JSX, useContext, useEffect, useMemo, useState} from "react";

const AuthContext: React.Context<undefined | any> = createContext(undefined);

interface AuthProviderParams {
    children: JSX.Element | Array<JSX.Element>
}

const AuthProvider = ({children}: AuthProviderParams): JSX.Element => {
    // State to hold the authentication token
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token])

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;