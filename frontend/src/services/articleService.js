import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/articles`;

export const fetchArticles = (filters = {}) => {
  return axios.get(`${API_URL}/`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Ensure fetchSources function is here and exported
export const fetchSources = () => {
  return axios.get(`${API_URL}/sources`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchArticleAttributes = async () => {
  try {
    const response = await axios.get(`${API_URL}/attributes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article attributes", error);
    return { authors: [], sources: [] };
  }
};
