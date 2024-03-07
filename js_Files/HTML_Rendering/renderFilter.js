export const renderFilter = (myData) => {
    const allCategory = new Set();
    myData.forEach(elm => {
        if (!allCategory.has(elm.category)) {
            allCategory.add(elm.category);
        }
    });
    let options = `<option value="ALL">ALL</option>`;
    allCategory.forEach(elm => {
        options += `
        <option value="${elm}">${elm}</option>
        `;
    });
    const filterInput = document.getElementById('filter');
    filterInput.innerHTML = options;
}