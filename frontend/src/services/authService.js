import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const register = (data) => axios.post(`${API}/auth/register`, data);
export const login = (data) => axios.post(`${API}/auth/login`, data);
export const verifyOtp = (data) => axios.post(`${API}/auth/verify-otp`, data);
export const googleLogin = (data) =>
  axios.post(`${API}/auth/google-login`, data);
