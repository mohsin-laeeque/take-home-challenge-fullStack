import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/user`;
const token = localStorage.getItem("token");

export const getUserPreferences = async () =>
  axios.get(`${API_URL}/preferences`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateUserPreferences = async (preferences) =>
  axios.post(
    `${API_URL}/preferences`,
    preferences, // Send preferences directly as the data payload
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );