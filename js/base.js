fields = {
    1:[3,2],
    2:[2,4],
    3:[3,4]
};
let topAmount = 10;
let sleepPeriod = 100;
let images;
let nameInput;
let lastnameInput;
let emailInput;
let scoreButton;
let goButton;
let modes;
let fieldMode;
let currentImageMode;
let finishGame;
let startGame;
let cells;
let firstCard;

let headerBlock = document.getElementById("header");
let bastionBlock = document.getElementById("bastion");
runStartPage();

function runStartPage() {
    bastionBlock.innerHTML = "";
    headerBlock.innerHTML = "";
    showStartPage();
    reactStartPage();
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function showBackButton(father) {
    father.appendChild(getBackBlock());
}

function getBackBlock() {
    let backButtonDiv = getElement({tag:"div", id:"backBlock"});
    backButtonDiv.classList.add("backButton");
    let backButton = getElement({
        tag:"input",
        type:"button",
        value:"Back"
    });
    backButton.onclick = () => {
        runStartPage();
    };
    backButtonDiv.appendChild(backButton);
    return backButtonDiv;
}


