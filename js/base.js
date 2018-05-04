(function () {

    let headerBlock = document.getElementById("header");
    let contentBlock = document.getElementById("content");
    let bastionBlock = document.getElementById("bastion");

    (function showStartPage() {
        showStartWrapper(contentBlock);
        showStartHeader(headerBlock);
        showStartRules(bastionBlock);
    }) ();

    function showStartWrapper(block) {
        block.classList.add("wrapper");
    }

    function showStartHeader(father) {
        let headerTag = document.createElement("div");
        headerTag.innerText = "Welcome!";
        father.appendChild(headerTag);
        father.classList.add("header");
    }

    function showStartRules(father) {
        let rulesText = getRulesText();
        let sheet = document.createElement("div");
        sheet.innerText = rulesText;
        sheet.classList.add("rulesSheet");
        father.appendChild(sheet);
    }
    
    function getRulesText() {
        return "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem" +
            "Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
            "printer took a galley of type and scrambled it to make a type specimen book."
    }
}) ();