import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (name, email, password, passwordConfirmation) => {
  return axios.post(`${API_URL}/register`, { name, email, password, password_confirmation: passwordConfirmation });
};

export const logout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
};
