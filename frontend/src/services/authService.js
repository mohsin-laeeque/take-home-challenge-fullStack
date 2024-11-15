import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}`;
const token = localStorage.getItem("token");

export const getUserPreferences = async () =>
  axios.get(`${API_URL}/user/preferences`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateUserPreferences = async (preferences) =>
  axios.post(
    `${API_URL}/user/preferences`,
    preferences, // Send preferences directly as the data payload
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (name, email, password, passwordConfirmation) => {
  return axios.post(`${API_URL}/register`, { name, email, password, password_confirmation: passwordConfirmation });
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
