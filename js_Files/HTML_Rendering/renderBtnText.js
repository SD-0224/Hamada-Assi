import { isFavorites } from "../shared/mainFunctions.js";

export function renderBtnText(id) {
    let btnText = isFavorites(id) ? "Remove from Favorites" : `Add to Favorites <ion-icon name="heart-outline" class="icon add-myFavorites"></ion-icon>`;
    return btnText;
}