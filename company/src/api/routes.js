import {axiosAuth, axiosNoAuth} from './axios';

export const signup = (data) => {
    return axiosNoAuth.post(``, data);
}

export const login = (data) => {
    return axiosNoAuth.post(`/login`, data);
}

export const getAllPeople = () => {
    return axiosAuth.get(`/jobseeker/allJobSeekers`);
}

export const getSingleJobSeeker = (id) => {
    return axiosAuth.get(`/jobseeker/singleJobSeeker/${id}`);
}

export const getResume = (id) => {
    return axiosAuth.get(`/jobseeker/resumeData/${id}`);
}

