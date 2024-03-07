import { setMode, toggleFavorites, toggleMode } from "./mainFunctions.js";

document.addEventListener("DOMContentLoaded", function () {
    const modeButton = document.getElementById("mode-btn");
    const favoritesButton = document.getElementById("favorites-btn");
  
  
    // Check if user preference is stored in localStorage
    const userMode = localStorage.getItem("mode");
  
    // If userMode is set, use it, otherwise use system default
    // Then set initial mode based on user preference or system default
    const isDarkMode = userMode ? userMode === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    // Function to set mode
    setMode(isDarkMode);
  
    // Event listener for mode toggle button
    modeButton.addEventListener("click", () => toggleMode());
    favoritesButton.addEventListener("click", () => toggleFavorites());
  });