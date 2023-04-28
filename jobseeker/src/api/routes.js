import { axiosAuth, axiosNoAuth } from "./axios";

export const signup = (data) => {
  return axiosNoAuth.post(``, data);
};

export const login = (data) => {
  return axiosNoAuth.post(`/login`, data);
};

export const jobseeker = () => {
  return axiosNoAuth.get(`/dashboard`);
};

export const jobseekerPost = (data) => {
  return axiosNoAuth.post(`/dashboard`, data);
};
