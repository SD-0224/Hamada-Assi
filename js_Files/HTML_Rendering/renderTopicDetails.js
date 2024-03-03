import { renderRating } from "./renderRating.js";

export const renderTopicDetails = function(data) {
  document.querySelector(".details").innerHTML = `
            <h3>${data.category}</h3>
              <h4>${data.topic}</h4>
              <div class="rating">
                ${renderRating(data.rating)}
              </div>
              <p>
                ${data.description}
              </p>
        `;
}