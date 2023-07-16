import axios, {AxiosResponse} from "axios";
import jwtDecode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

export interface LoginParams {
    username: string;
    password: string;
}

export const login = (data: LoginParams): Promise<AxiosResponse<any>> => { // todo: implement
    return axios.post(`${apiUrl}/auth`, data);
};