
export const renderSubtopics = function(data) {
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