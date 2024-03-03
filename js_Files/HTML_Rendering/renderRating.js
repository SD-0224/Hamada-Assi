
// calculate stars shape
export const renderRating = (r) => {
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

