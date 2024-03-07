
export const renderModeText = (text) => {
    const modeButtonText = document.getElementById("mode-btn");
    if( text === "Light Mode" ){
        text = `<ion-icon name="sunny-outline" class="icon"></ion-icon>
        <span id="modeButtonText">Light Mode</span>`;
    }else{
        text = `<ion-icon name="moon-outline" class="icon"></ion-icon>
        <span id="modeButtonText">Dark Mode</span>`;
    }
    modeButtonText.innerHTML = text;
}