import axios from "axios";

const API_URL = "http://localhost:8000/api/user";
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
