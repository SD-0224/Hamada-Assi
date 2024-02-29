
const id = window.location.href.slice((window.location.href).indexOf('=') + 1);
let theElement;
fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong. Web topics failed to load.....');
        }
        return response.json();
    })
    .then(data => {
        theElement = data;
        localStorage.setItem("Favorites", JSON.stringify([]));
        console.log(data);
        renderCard(data);
        document.getElementById('addFavoritesBtn').addEventListener('click', function() {
          let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
          if(!isFavorites()){
            // this.textContent = `Remove from Favorites`;
            myFavorites.push(theElement);
          }else {
            // this.textContent = `Add to Favorites`;
            myFavorites.splice(myFavorites.indexOf(theElement), 1);
          }
          console.table(myFavorites);
          localStorage.setItem("Favorites", JSON.stringify(myFavorites));
          this.innerHTML = renderBtnText();
        });
        renderDetails(data);
        renderSubtopics(data);
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong. Web topics failed to load.");
    });

function renderCard(data) {
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
              Add to Favorites
                <ion-icon
                  name="heart-outline"
                  class="icon add-myFavorites"
                ></ion-icon>
              </button>
              <p>Unlimited Credits</p>
            </div>
          </div>
        </div>
        `;
}

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

function renderDetails(data) {
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

function renderSubtopics(data){
    let html = `
        <h3>${data.topic} Sub Topics</h3>
        <ul>
    `;
    data.subtopics.forEach(elm => {
        html += `
        <li>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>${elm}</span>
        </li>
        `;
    });
    html += `</ul>`;
    document.querySelector(".sub-topics").innerHTML = html;
}

// document.getElementById('addFavoritesBtn').addEventListener('click', toggleFavoritesBtn());

// function toggleFavoritesBtn(){
//     console.log("test . . . ");
//     let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
//     if(!isFavorites()){
//         myFavorites.push(theElement);
//     }else {
//         myFavorites.splice(0, 1);
//     }
//     localStorage.setItem("Favorites", JSON.stringify(myFavorites));
// }

// function isFavorites(){
//     let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
//     console.log(myFavorites.indexOf(theElement));
//     return myFavorites.some(elm => {
//         return elm.id === id;
//     });
// }

// function renderBtnText(){
//     let btnText = isFavorites() ? "Remove from Favorites" : "Add to Favorites";
//     // btnText += `<ion-icon name="heart-outline" class="icon add-myFavorites"></ion-icon>`;
//     return btnText;
// }

function isFavorites(){
    let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    return myFavorites.some(elm => {
        return elm.id == id;
    });
}

function indexFavorites(){
  let myFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  return myFavorites.indexOf(theElement);
}

function renderBtnText(){
    let btnText = isFavorites() ? "Remove from Favorites" : `Add to Favorites <ion-icon name="heart-outline" class="icon add-myFavorites"></ion-icon>`;
    // btnText += `<ion-icon name="heart-outline" class="icon add-myFavorites"></ion-icon>`;
    return btnText;
}