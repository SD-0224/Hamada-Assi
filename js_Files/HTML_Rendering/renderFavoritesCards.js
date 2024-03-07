import { renderRating } from "./renderRating.js";

export const renderFavoritesCards = function () {
    const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    let html = '';
    if (favorites.length > 0) {
        favorites.forEach(element => {
            html += `
            <a href="./details.html?id=${element.id}" class="favorite-card">
                <img src="./images/Logos/${element.image}" alt="${element.topic} logo" class="img-in-box" />
                <h3 class="favorite-topic">${element.topic}</h3>
                <div class="rating">
                ${renderRating(element.rating)}
                </div>
            </a>`;
        });
    } else {
        html = `You haven't chosen a favorite topic yet.`;
    }
    document.getElementById('favoriteContainer').innerHTML = html;
}