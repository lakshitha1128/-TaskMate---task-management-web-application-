import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: { Authorization: localStorage.getItem("token") },
});

export const getTasks = (query = {}) =>
  axios.get(`${API}/tasks`, { ...authHeader(), params: query });
export const createTask = (task) =>
  axios.post(`${API}/tasks`, task, authHeader());
export const updateTask = (id, task) =>
  axios.put(`${API}/tasks/${id}`, task, authHeader());
export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`, authHeader());
