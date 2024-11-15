import axios from "axios";

const API_URL = "http://localhost:8000/api/articles";
const token = localStorage.getItem("token");

export const fetchArticles = (filters = {}) => {
  return axios.get(`${API_URL}/`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Ensure fetchSources function is here and exported
export const fetchSources = () => {
  return axios.get(`${API_URL}/sources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchArticleAttributes = async () => {
  try {
    const response = await axios.get(`${API_URL}/attributes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article attributes", error);
    return { authors: [], sources: [] };
  }
};
