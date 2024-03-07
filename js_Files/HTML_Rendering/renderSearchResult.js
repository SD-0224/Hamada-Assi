export const renderSearchResult = (number) => {
    const search = document.getElementById("searchMessage");
    if (number > 0) {
        search.innerHTML = `"<span id="numberTopics">${number}</span>" Web Topics Found`;
        search.style.fontSize = "larger";
    } else {
        search.innerHTML = `We couldn't find any results. Please try again with a different search term <h3>All Topics</h3>`;
        search.style.fontSize = "smaller";
    }
}