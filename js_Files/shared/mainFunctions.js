import { renderFavoritesCards } from "../HTML_Rendering/renderFavoritesCards.js";

document.addEventListener("DOMContentLoaded", function () {
  const modeButton = document.getElementById("mode-btn");
  const modeButtonText = document.getElementById("modeButtonText");

  const favoritesButton = document.getElementById("favorites-btn");


  // Check if user preference is stored in localStorage
  const userMode = localStorage.getItem("mode");

  // If userMode is set, use it, otherwise use system default
  // Then set initial mode based on user preference or system default
  const isDarkMode = userMode ? userMode === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Function to set mode
  const setMode = (isDarkMode) => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      modeButtonText.textContent = "Light Mode";
    } else {
      document.body.classList.remove("dark-mode");
      modeButtonText.textContent = "Dark Mode";
    }
  }

  setMode(isDarkMode);

  // Function to toggle mode
  const toggleMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    const modeText = isDarkMode ? "Light Mode" : "Dark Mode";
    modeButtonText.textContent = modeText;
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  }

  const toggleFavorites = () => {
    const fav = document.getElementsByClassName("my-favorites");
    fav[0].classList.toggle("show");

    if(fav[0].classList.contains("show")){
      renderFavoritesCards();
    }
  };


  // Event listener for mode toggle button
  modeButton.addEventListener("click", toggleMode);
  favoritesButton.addEventListener("click", toggleFavorites);
});

export function isFavorites(id) {
  let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  return myFavorites.some(elm => {
    return elm.id == id;
  });
}

export function indexFavorites(theElement) {
  let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  return myFavorites.indexOf(theElement);
}

export function renderBtnText(id) {
  let btnText = isFavorites(id) ? "Remove from Favorites" : `Add to Favorites <ion-icon name="heart-outline" class="icon add-myFavorites"></ion-icon>`;
  return btnText;
}

export function getIndexById(objects, targetId) {
  for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === targetId) {
          return i;
      }
  }
  return -1;
}