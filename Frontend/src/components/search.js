import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/search.css"; // Ensure this file exists with the proper styles

export default function SearchBar({ onSelectUser }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0 && !selectedUserId) {
        // Only fetch if there's a query and no user is selected
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/search`, {
            params: { nickname: query }, // Adjust the query param name if necessary
          });
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          if (error.response) {
            console.error(
              "Server responded with status:",
              error.response.status
            );
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error(
              "Request was made but no response received:",
              error.request
            );
          } else {
            console.error("Error setting up the request:", error.message);
          }
        }
      } else {
        setResults([]);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 300); // Adding a debounce

    return () => clearTimeout(timeoutId);
  }, [query, selectedUserId]);

  const handleSelectUser = (user) => {
    setSelectedUserId(user._id);
    setQuery(user.username); // Set the search box value to the selected user's username
    setResults([]); // Clear the search results
    onSelectUser(user._id); // Notify parent component of selected user's ID
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedUserId(null); // Clear selection when typing
        }}
        placeholder="Search by name"
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={selectedUserId === user._id ? "selected" : ""}
            >
              {user.name} ({user.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
