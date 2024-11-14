import React, { useState, useEffect } from "react";
import { getUserPreferences, updateUserPreferences } from "../services/authService";

function Preferences() {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [preferences, setPreferences] = useState({
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: [],
  });

  useEffect(() => {
    // Fetch user's current preferences
    getUserPreferences().then((response) => {
      setPreferences({
        preferredSources: response.data.preferredSources || [],
        preferredCategories: response.data.preferredCategories || [],
        preferredAuthors: response.data.preferredAuthors || [],
      });
    });

    // Fetch sources, categories, and authors (mock data or actual API call)
    setSources(["Source 1", "Source 2"]);
    setCategories(["Category 1", "Category 2"]);
    setAuthors(["Author 1", "Author 2"]);
  }, []);

  const handleUpdatePreferences = () => {
    updateUserPreferences(preferences).then(() => {
      alert("Preferences updated successfully");
    });
  };

  return (
    <div>
      <h2>User Preferences</h2>
      <div>
        <h4>Preferred Sources</h4>
        {sources.map((source) => (
          <div key={source}>
            <input
              type="checkbox"
              checked={preferences.preferredSources.includes(source)}
              onChange={(e) => {
                const updatedSources = e.target.checked ? [...preferences.preferredSources, source] : preferences.preferredSources.filter((s) => s !== source);
                setPreferences({ ...preferences, preferredSources: updatedSources });
              }}
            />
            <label>{source}</label>
          </div>
        ))}
      </div>
      <div>
        <h4>Preferred Categories</h4>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              checked={preferences.preferredCategories.includes(category)}
              onChange={(e) => {
                const updatedCategories = e.target.checked ? [...preferences.preferredCategories, category] : preferences.preferredCategories.filter((c) => c !== category);
                setPreferences({ ...preferences, preferredCategories: updatedCategories });
              }}
            />
            <label>{category}</label>
          </div>
        ))}
      </div>
      <div>
        <h4>Preferred Authors</h4>
        {authors.map((author) => (
          <div key={author}>
            <input
              type="checkbox"
              checked={preferences.preferredAuthors.includes(author)}
              onChange={(e) => {
                const updatedAuthors = e.target.checked ? [...preferences.preferredAuthors, author] : preferences.preferredAuthors.filter((a) => a !== author);
                setPreferences({ ...preferences, preferredAuthors: updatedAuthors });
              }}
            />
            <label>{author}</label>
          </div>
        ))}
      </div>
      <button onClick={handleUpdatePreferences}>Save Preferences</button>
    </div>
  );
}

export default Preferences;
