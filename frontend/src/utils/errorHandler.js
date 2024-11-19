import { toast } from "react-toastify";

export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.message || "Unknown error");
    toast(error.response.data.message || "An error occurred.");
  } else {
    console.error("Network Error:", error.message);
    toast("Network error occurred. Please try again.");
  }
};
