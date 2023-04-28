import axios from "axios";

export const axiosNoAuth = axios.create({
  baseURL: "http://localhost:3000/jobseeker",
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3000",
});

// axiosAuth.interceptors.request.use((config) => {
//   const token_data = JSON.parse(localStorage.getItem('token_data'));
//   config.headers.Authorization = `Bearer ${token_data}`
//   return config
// });
