import { renderAddFavCard } from "../HTML_Rendering/renderAddFavCard.js";
import { fetchTopic } from "../fetchData/fetchTopicDetails.js";
import { renderTopicDetails } from "../HTML_Rendering/renderTopicDetails.js";
import { renderSubtopics } from "../HTML_Rendering/renderSubtopics.js";
import { renderFavoritesCards } from "../HTML_Rendering/renderFavoritesCards.js";
import { getIndexById, isFavorites } from "../shared/mainFunctions.js";
import { renderBtnText } from "../HTML_Rendering/renderBtnText.js";


let theElement;

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function displayTopic() {

  const loadingIndicator = document.getElementById('loadingIndicator');
  const errorMessage = document.getElementById('errorMessage');
  const dataContainer = document.getElementById('dataContainer');

  loadingIndicator.style.display = 'flex';
  errorMessage.style.display = 'none';
  dataContainer.style.display = 'none';

  try {
    const topic = await fetchTopic(id);
    // Code to display favorite topics
    // console.log(topic);
    theElement = topic;
    // localStorage.setItem("Favorites", JSON.stringify([]));
    renderAddFavCard(topic);
    document.getElementById('addFavoritesBtn').addEventListener('click', function () {
      let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      if (!isFavorites(id)) {
        // this.textContent = `Remove from Favorites`;
        myFavorites.push(topic);
      } else {
        // this.textContent = `Add to Favorites`;
        myFavorites.splice(getIndexById(myFavorites, topic.id), 1);
      }
      console.table(myFavorites);
      // Update localStorage
      localStorage.setItem("Favorites", JSON.stringify(myFavorites));
      renderFavoritesCards();
      this.innerHTML = renderBtnText(id);
      document.getElementsByClassName("my-favorites")[0].classList.add("show");
    });
    renderTopicDetails(topic);
    renderSubtopics(topic);
    dataContainer.style.display = 'block';
  } catch (error) {
    // Handle error
    errorMessage.textContent = error.message;
    errorMessage.style.display = 'flex';
    console.error('Error displaying topic:', error);
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Call the function
displayTopic();

