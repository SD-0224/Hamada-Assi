import { renderSearchResult } from "../HTML_Rendering/renderSearchResult.js";
import { renderCards } from "../HTML_Rendering/renderTopics.js";
import { fetchSearch } from "../fetchData/fetchSearch.js";

export async function loadSearchResult(phrase) {
    try {
        const topics = await fetchSearch(phrase);
        // renderSearchResult(topics.length);
        return topics;
    } catch (error) {
        // Handle error
        console.error('Error displaying topics:', error);
    }
}

export const filterResult = (dataToShow) => {
    console.log("entered filter func.");
    const value = document.getElementById('filter').value;
    const filtered = value === "ALL" ? dataToShow : dataToShow.filter(elm => elm.category === value);
    renderSearchResult(filtered.length);
    renderCards(filtered);
}

export const sortResult = (dataToShow, dataToShowDefault) => {
    const value = document.getElementById('sort').value;
    if (value === "DEFAULT") {
        return dataToShowDefault;
    }
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
    return currentArray;
};