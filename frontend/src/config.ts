import axios from "axios";

export const BACKEND_URL = "http://localhost:8787";

export const apiClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});