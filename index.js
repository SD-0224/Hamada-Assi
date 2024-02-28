const courseContainer = document.getElementById("courses");


const allCategory = new Set();
// calculate stars shape
const renderRating = (r) => {
    const ratingArray = [];
    let fill = Math.floor(r);
    for (let i = 1; i < 6; i++) {
        if (i <= fill) {
            ratingArray.push("star");
        } else if (i - fill === 1 && r % 1 !== 0) {
            ratingArray.push("star-half");
        }
        else {
            ratingArray.push("star-outline");
        }
    }
    
    return `
        <ion-icon name="${ratingArray.shift()}"></ion-icon>
        <ion-icon name="${ratingArray.shift()}"></ion-icon>
        <ion-icon name="${ratingArray.shift()}"></ion-icon>
        <ion-icon name="${ratingArray.shift()}"></ion-icon>
        <ion-icon name="${ratingArray.shift()}"></ion-icon>
    `;
};


let myData = [];

fetch('https://tap-web-1.herokuapp.com/topics/list')
    .then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong. Web topics failed to load.....');
        }
        return response.json();
    })
    .then(data => {
        myData = data;
        renderCards(data);
        renderFilter();
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong. Web topics failed to load.");
    });

function renderCards(myData) {
    let html = ``;
    myData.forEach(courseElement => {
        if(!allCategory.has(courseElement.category)){
            allCategory.add(courseElement.category);
        }
        // create course card a > img , info ...
        html += `
            <a href="./details.html?id=${courseElement.id}" class="course" id="${courseElement.id}">
              <img src="./Logos/${courseElement.image}" alt="${courseElement.topic} course logo" class="img-in-box"/>
              <div class="course-info">
                <h4 class="category">${courseElement.category}</h4>
                <h5 class="topic">${courseElement.topic}</h5>
                <div class="rating">
                  ${renderRating(courseElement.rating)}
                </div>
                <p class="name">Author: ${courseElement.name}</p>
              </div>
            </a>
    `;
        courseContainer.innerHTML = html; // push each course data into main courses container
    });
}

const search = (phrase) => {
    fetch(`https://tap-web-1.herokuapp.com/topics/list?phrase=${phrase}`).then(
        response => response.json()).then(data => renderCards(data));
}

// Event listener for input field
document.getElementById('searchInput').addEventListener('input', event => {
    search(event.target.value.trim());
});

document.getElementById('sort').addEventListener("change", (event) => {
    myData.sort((a, b) => {
        switch (event.target.value) {
            case "TOPIC":
                if (a['topic'] < b['topic']) return -1;
                if (a['topic'] < b['topic']) return 1;
                if (a['topic'] < b['topic']) return 0;
                break;
            case "AUTHOR":
                if (a['name'] < b['name']) return -1;
                if (a['name'] < b['name']) return 1;
                if (a['name'] < b['name']) return 0;
                break;
            default:
                return 0;
        }
    });
    renderCards(myData);
});

const renderFilter = () =>{
    let options = `<option value="">Default</option>`;
    allCategory.forEach(elm=>{
        options += `
        <option value="${elm}">${elm}</option>
        `;
    });
    const filterInput = document.getElementById('filter');
    filterInput.innerHTML = options;
}

document.getElementById('filter').addEventListener("change", (event) => {
    console.log(event.target.value);
    
    const filtered = myData.filter(elm => elm.category === event.target.value);
    renderCards(filtered);
});
