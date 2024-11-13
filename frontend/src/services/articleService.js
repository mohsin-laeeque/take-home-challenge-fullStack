import axios from "axios";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

export const fetchArticles = (filters = {}) => {
  return axios.get(`${API_URL}/articles`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Ensure fetchSources function is here and exported
export const fetchSources = () => {
  return axios.get(`${API_URL}/articles/sources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
