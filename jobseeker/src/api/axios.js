import axios from 'axios';

export const axiosNoAuth = axios.create({
  baseURL: 'http://localhost:3000/jobseeker'
});

export const axiosAuth = axios.create({
    baseURL: 'http://localhost:3000'
});