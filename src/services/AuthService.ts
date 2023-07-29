import {AxiosResponse} from "axios";
import api from '../api'

export const csrfCookie = (): Promise<void|AxiosResponse<any>> => {
    return api.get(`/sanctum/csrf-cookie`);
}

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export const register = (data: RegisterParams): Promise<AxiosResponse<any>> => {
    return api.post(`/register`, data);
};

export interface LoginParams {
    email: string;
    password: string;
}

export const login = (data: LoginParams): Promise<AxiosResponse<any>> => {
    return api.post(`/login`, data);
};
export const logout = (): Promise<AxiosResponse<any>> => {
    return api.post(`/logout`);
};