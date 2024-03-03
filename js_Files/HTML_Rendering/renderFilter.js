export const renderFilter = (allCategory) =>{
    let options = `<option value="">Default</option>`;
    allCategory.forEach(elm=>{
        options += `
        <option value="${elm}">${elm}</option>
        `;
    });
    const filterInput = document.getElementById('filter');
    filterInput.innerHTML = options;
}