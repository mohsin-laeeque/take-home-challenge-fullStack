export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.message || "Unknown error");
    alert(error.response.data.message || "An error occurred.");
  } else {
    console.error("Network Error:", error.message);
    alert("Network error occurred. Please try again.");
  }
};
