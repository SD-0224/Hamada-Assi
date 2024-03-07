import { renderFavoritesCards } from "../HTML_Rendering/renderFavoritesCards.js";

export const setMode = (isDarkMode) => {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    modeButtonText.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    modeButtonText.textContent = "Dark Mode";
  }
}

export const toggleFavorites = () => {
  const fav = document.getElementsByClassName("my-favorites");
  fav[0].classList.toggle("show");

  if(fav[0].classList.contains("show")){
    renderFavoritesCards();
  }
};

// Function to toggle mode
export const toggleMode = (modeButtonText) => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  const modeText = isDarkMode ? "Light Mode" : "Dark Mode";
  modeButtonText.textContent = modeText;
  localStorage.setItem("mode", isDarkMode ? "dark" : "light");
}

export const isFavorites = (id) => {
  let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  return myFavorites.some(elm => {
    return elm.id == id;
  });
}

export const indexFavorites = (theElement) => {
  let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  return myFavorites.indexOf(theElement);
}

export const getIndexById = (objects, targetId) => {
  for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === targetId) {
          return i;
      }
  }
  return -1;
}

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          func.apply(this, args);
      }, delay);
  };
}