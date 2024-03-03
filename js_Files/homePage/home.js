import { renderFilter } from "../HTML_Rendering/renderFilter.js";
import { renderCards } from "../HTML_Rendering/renderTopics.js";
import { fetchSearch } from "../fetchData/fetchSearch.js";
import { fetchTopics } from "../fetchData/fetchTopics.js";



const allTopics = [];
let dataToShow = [];

async function loadTopics() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const loadingDots = document.getElementById('loadingDots');
    const errorMessage = document.getElementById('errorMessage');
    
    loadingIndicator.style.display = 'flex';
    loadingDots.style.display = 'inline';
    errorMessage.style.display = 'none';

    try {
        const topics = await fetchTopics();
        // Code to display favorite topics
        allTopics.push(...topics);
        dataToShow = topics;
        const allCategory = await renderCards(topics);
        renderFilter(allCategory);
    } catch (error) {
        // Handle error
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'flex';
        console.error('Error displaying topics:', error);
    } finally {
        loadingIndicator.style.display = 'none';
        loadingDots.style.display = 'none';
    }
}

// Call the function
loadTopics();

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

async function loadSearchResult(phrase) {
    try {
        const topics = await fetchSearch(phrase);
        dataToShow = topics;
        renderCards(dataToShow);
        sortResult();
    } catch (error) {
        // Handle error
        console.error('Error displaying topics:', error);
    }
}

// Event listener for input field with debounced function
document.getElementById('searchInput').addEventListener('input', debounce(event => {
    const phrase = event.target.value.trim();
    loadSearchResult(phrase);
}, 300));


document.getElementById('filter').addEventListener("change", event =>{
    // filterResult(event.target.value);
    filterResult();
});


function filterResult() {
    const value = document.getElementById('filter').value;
    const filtered = value === "DEFAULT" ? dataToShow : dataToShow.filter(elm => elm.category === value);
    renderCards(filtered);
}

document.getElementById('sort').addEventListener("change", sortResult);

function sortResult() {
    const value = document.getElementById('sort').value;
    const currentArray = dataToShow;
    currentArray.sort((a, b) => {
        switch (value) {
            case "TOPIC":
                if (a['topic'] < b['topic']) return -1;
                if (a['topic'] > b['topic']) return 1;
                if (a['topic'] == b['topic']) return 0;
                break;
            case "AUTHOR":
                if (a['name'] < b['name']) return -1;
                if (a['name'] > b['name']) return 1;
                if (a['name'] == b['name']) return 0;
                break;
            default:
                return 0;
        }
    });
    renderCards(currentArray);
};

// document.getElementById('sort').addEventListener("change", (event) => {
//     dataToShow = event.target.value === "DEFAULT" ? allTopics : dataToShow;
//     dataToShow.sort((a, b) => {
//             switch (event.target.value) {
//                 case "TOPIC":
//                     if (a['topic'] < b['topic']) return -1;
//                     if (a['topic'] > b['topic']) return 1;
//                     if (a['topic'] == b['topic']) return 0;
//                     break;
//                 case "AUTHOR":
//                     if (a['name'] < b['name']) return -1;
//                     if (a['name'] > b['name']) return 1;
//                     if (a['name'] == b['name']) return 0;
//                     break;
//                 default:
//                     return 0;
//             }
//         });
//         renderCards(dataToShow);
// });

// document.getElementById('filter').addEventListener("change", (event) => {
//     dataToShow = event.target.value === "DEFAULT" ? allTopics : dataToShow;
//     dataToShow = dataToShow.filter(elm => elm.category === event.target.value);
//     renderCards(dataToShow);
// });