// src/api/client.js
import axios from "axios";

let authToken = null;

// Create axios instance
export const api = axios.create({
    baseURL: "http://localhost:8080",
});

// Helper to set token after login/register
export const setToken = (token) => {
    authToken = token;
};

// Helper to build headers
const tokenHeader = () => {
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
};

// Override methods to always include token header
api.get = async (path) => {
    const res = await axios.get(`${api.defaults.baseURL}${path}`, { headers: tokenHeader() });
    return res.data;
};

api.post = async (path, body) => {
    const res = await axios.post(`${api.defaults.baseURL}${path}`, body, { headers: tokenHeader() });
    return res.data;
};

api.put = async (path, body) => {
    const res = await axios.put(`${api.defaults.baseURL}${path}`, body, { headers: tokenHeader() });
    return res.data;
};

api.del = async (path) => {
    const res = await axios.delete(`${api.defaults.baseURL}${path}`, { headers: tokenHeader() });
    return res.data;
};
