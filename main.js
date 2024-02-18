const courseContainer = document.getElementById("courses");

const ratingArray = [];
// calculate stars shape
const createRating = (r)=> {
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
};

fetch('data.json').then(response => response.json()).then(data => {
  data.forEach(courseElement => {
    // create course card a > img , info ...
    const box = document.createElement('a');
    box.href = `./details.html?id=${courseElement.id}`;
    box.id = courseElement.id;
    box.classList.add('course');
    createRating(courseElement.rating);
    box.innerHTML =
      `
            <img src="./Logos/${courseElement.image}" alt="${courseElement.topic} course logo" class="img-in-box"/>
            <div class="course-info">
              <h4 class="category">${courseElement.category}</h4>
              <h5 class="topic">${courseElement.topic}</h5>
              <div class="rating">
                <ion-icon name="${ratingArray.shift()}"></ion-icon>
                <ion-icon name="${ratingArray.shift()}"></ion-icon>
                <ion-icon name="${ratingArray.shift()}"></ion-icon>
                <ion-icon name="${ratingArray.shift()}"></ion-icon>
                <ion-icon name="${ratingArray.shift()}"></ion-icon>
              </div>
              <p class="name">Author: ${courseElement.name}</p>
            </div>
            `
    courseContainer.appendChild(box); // push each course data into main courses container
  });
});

