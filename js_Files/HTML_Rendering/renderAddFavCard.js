import { renderBtnText } from "../shared/mainFunctions.js";

export function renderAddFavCard(data) {
    document.querySelector(".right-col-card").innerHTML = `
          <img src="./Logos/${data.image}" alt="${data.image}" class="img-in-box" />
          <div class="course-info">
            <h3>
              <span class="topic">${data.topic}</span> 
              <span class="author-info">by <a href="">${data.name}</a></span>
            </h3>
            <div class="add-favourites">
              <p>Interested about this topic?</p>
              <div class="btn-container">
                <button id="addFavoritesBtn">
                ${renderBtnText(data.id)}
                </button>
                <p>Unlimited Credits</p>
              </div>
            </div>
          </div>
          `;
  }