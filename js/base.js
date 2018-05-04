(function () {

    let headerBlock = document.getElementById("header");
    let contentBlock = document.getElementById("content");
    let bastionBlock = document.getElementById("bastion");

    (function showStartPage() {
        showStartWrapper(contentBlock);
        showStartHeader(headerBlock);
        showStartRules(bastionBlock);

        let scoreButton = getScoreButton();
        showScoreButton(scoreButton, bastionBlock);
        
        let loginForm = getLoginForm();



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

        function getScoreButton() {
            let scoreButton = document.createElement("input");
            scoreButton.setAttribute("type", "button");
            scoreButton.setAttribute("value", "Watch score");
            return scoreButton;
        }

        function showScoreButton(button, father) {
            let div = document.createElement("div");
            div.setAttribute("id", "watchScoreButton");
            div.appendChild(button);
            father.appendChild(div);
        }
        
        function getLoginForm() {
            let loginDiv = getLoginDiv();

            console.log(loginDiv);
        }

        function getLoginDiv() {
            let loginDiv = document.createElement("div");
            loginDiv.setAttribute("id", "login");
            let form = getForm();
            loginDiv.appendChild(form);
            return loginDiv;
        }

        function getForm() {
            let form = document.createElement("form");
            let textInput = getTextInput();

            form.appendChild(textInput);
            return form;
        }
        
        function getTextInput() {
            let textInputDiv = document.createElement("div");
            textInputDiv.classList.add("textInput");

            let nameInputBlock = getNameInputBlock();
            textInputDiv.appendChild(nameInputBlock);

            let lastNameInputBlock = getLastNameInputBlock();
            textInputDiv.appendChild(lastNameInputBlock);

            let emailInputBlock = getEmailInputBlock();
            textInputDiv.appendChild(emailInputBlock);
            
            return textInputDiv;
        }
        
        function getNameInputBlock() {
            let nameInputDiv = document.createElement("div");
            nameInputDiv.classList.add("inputText");

            let nameInput = getInput("text", "name", "name");
            nameInputDiv.appendChild(nameInput);

            return nameInputDiv;
        }

        function getLastNameInputBlock() {
            let lastNameInputDiv = document.createElement("div");
            lastNameInputDiv.classList.add("inputText");

            let lastNameInput = getInput("text", "last name", "lastname");
            lastNameInputDiv.appendChild(lastNameInput);

            return lastNameInputDiv;
        }

        function getEmailInputBlock() {
            let emailInputDiv = document.createElement("div");
            emailInputDiv.classList.add("inputText");

            let emailInput = getInput("email", "email", "email");
            emailInputDiv.appendChild(emailInput);

            return emailInputDiv;
        }



        function getInput(type, placeholder, id) {
            let lastNameInput = document.createElement("input");
            lastNameInput.setAttribute("type", type);
            lastNameInput.setAttribute("placeholder", placeholder);
            lastNameInput.setAttribute("id", id);
            return lastNameInput;
        }
    }) ();

}) ();