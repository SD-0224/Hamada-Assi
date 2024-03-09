import { renderFilter } from "../HTML_Rendering/renderFilter.js";
import { renderSearchResult } from "../HTML_Rendering/renderSearchResult.js";
import { renderCards } from "../HTML_Rendering/renderTopics.js";
import { fetchTopics } from "../fetchData/fetchTopics.js";
import { debounce } from "../shared/mainFunctions.js";
import { filterResult, loadSearchResult, sortResult } from "./home.logic.js";



const allTopics = [];
let dataToShow = [];
let dataToShowDefault = [];

async function loadTopics() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');

    loadingIndicator.style.display = 'flex';
    errorMessage.style.display = 'none';

    try {
        const topics = await fetchTopics();
        // Code to display favorite topics
        allTopics.push(...topics);
        dataToShow = topics;
        dataToShowDefault = [...topics];
        renderSearchResult(topics.length);
        renderCards(dataToShow);
        renderFilter(allTopics);
    } catch (error) {
        // Handle error
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'flex';
        console.error('Error displaying topics:', error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Call the function
loadTopics();


// Event listener for input field with debounced function
document.getElementById('searchInput').addEventListener('input', debounce(async event => {
    const phrase = event.target.value.trim();
    dataToShow = await loadSearchResult(phrase);
    dataToShowDefault = [...dataToShow];
    dataToShow = [...sortResult(dataToShow, dataToShowDefault)];
    filterResult(dataToShow);
}, 300));

document.getElementById('filter').addEventListener("change", event => {
    filterResult(dataToShow);
});

document.getElementById('sort').addEventListener("change", (event) => {
    dataToShow = [...sortResult(dataToShow, dataToShowDefault)];
    filterResult(dataToShow);
});
