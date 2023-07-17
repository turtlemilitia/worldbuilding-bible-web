import axios, {AxiosResponse} from "axios";
import jwtDecode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

export const csrfCookie = (): Promise<void|AxiosResponse<any>> => {
    return axios.get(`${apiUrl}/sanctum/csrf-cookie`);
}

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export const register = (data: RegisterParams): Promise<AxiosResponse<any>> => {
    return axios.post(`${apiUrl}/register`, data);
};

export interface LoginParams {
    email: string;
    password: string;
}

export const login = (data: LoginParams): Promise<AxiosResponse<any>> => {
    return axios.post(`${apiUrl}/login`, data);
};