import {axiosAuth, axiosNoAuth} from './axios';

export const signup = (data) => {
    return axiosNoAuth.post(``, data);
}

export const login = (data) => {
    return axiosNoAuth.post(`/login`, data);
}