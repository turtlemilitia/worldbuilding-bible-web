import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";
import {JSX} from "react";

const Logout = (): JSX.Element => {
    const {setToken} = useAuth();
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (): void => {
        setToken();
        navigate("/", {replace: true});
    };

    setTimeout((): void => {
        handleLogout();
    }, 3 * 1000);

    return <>Logout Page</>;
};

export default Logout;