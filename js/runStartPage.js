function showStartPage() {

    showStartHeader(headerBlock);
    showStartRules(bastionBlock);
    showScoreBlock(bastionBlock);
    showFormPanel(bastionBlock);

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

    function getScoreBlock() {
        let scoreButtonDiv = getElement({tag:"div", id:"watchScoreButton"});
        scoreButton = getElement({
            tag:"input",
            type:"button",
            value:"Watch score"
        });
        scoreButtonDiv.appendChild(scoreButton);
        return scoreButtonDiv;
    }

    function showScoreBlock(father) {
        father.appendChild(getScoreBlock());
    }

    function getLoginPanel() {
        let loginDiv = document.createElement("div");
        loginDiv.setAttribute("id", "login");
        let form = getInputForm();
        loginDiv.appendChild(form);
        return loginDiv;
    }

    function getInputForm() {
        let form = document.createElement("form");

        let textInput = getTextInput();
        let difficultySetting = getDifficultySetting();
        let viewSetting = getViewSetting();
        goButton = getElement({
            tag:"input",
            type:"button",
            id:"goButton",
            value:"Go!"
        });

        form.appendChild(textInput);
        form.appendChild(difficultySetting);
        form.appendChild(viewSetting);
        form.appendChild(goButton);
        return form;
    }

    function getTextInput() {
        let textInputDiv = document.createElement("div");
        textInputDiv.classList.add("textInput");
        let divClass = "inputText";

        nameInput = getElement({
            tag:"input",
            type:"text",
            placeholder:"name",
            id:"name"
        });
        let nameInputBlock = getInputBlock(divClass, nameInput);
        textInputDiv.appendChild(nameInputBlock);

        lastnameInput = getElement({
            tag:"input",
            type:"text",
            placeholder:"last name",
            id:"lastname"
        });
        let lastNameInputBlock = getInputBlock(divClass, lastnameInput);
        textInputDiv.appendChild(lastNameInputBlock);

        emailInput =  getElement({
            tag:"input",
            type:"email",
            placeholder:"email",
            id:"email"
        });
        let emailInputBlock = getInputBlock(divClass, emailInput);
        textInputDiv.appendChild(emailInputBlock);

        return textInputDiv;
    }

    function getInputBlock(divClass, inputElement) {
        let inputDiv = document.createElement("div");
        inputDiv.classList.add(divClass);
        inputDiv.appendChild(inputElement);

        return inputDiv;
    }

    function getDifficultySetting() {
        let difficultySettingsDiv = document.createElement("div");
        difficultySettingsDiv.setAttribute("id", "difficultySettings");

        for ((number) in fields) {
            let modeRadioBlock = getRadioModeBlock(number, `${fields[number][0]} x ${fields[number][1]} field`);
            difficultySettingsDiv.appendChild(modeRadioBlock);
        }

        return difficultySettingsDiv;
    }

    function getRadioModeBlock(mode, labelText) {
        let radioDiv = document.createElement("div");
        radioDiv.classList.add("mode");

        let label = document.createElement("label");
        label.innerText = labelText;

        let input = getElement({
            tag:"input",
            type:"radio",
            name:"mode",
            value:mode,
        });
        if (modes === undefined) {
            modes = [];
        }
        modes.push(input);

        label.appendChild(input);
        radioDiv.appendChild(label);
        return radioDiv;
    }

    function getViewSetting() {
        let ViewSettingDiv = document.createElement("div");
        ViewSettingDiv.setAttribute("id", "viewSetting");

        let img1 = getElement({
            tag:"img",
            src:"images/card1.jpg",
            class:"card selectedCard"
        });
        let img2 = getElement({
            tag:"img",
            src:"images/card2.jpg",
            class:"card"
        });
        images = [img1, img2];
        ViewSettingDiv.appendChild(images[0]);
        ViewSettingDiv.appendChild(images[1]);
        return ViewSettingDiv;
    }

    function showFormPanel(father) {
        father.appendChild(getLoginPanel());
    }

    function getElement(qualities) {
        let element = document.createElement(qualities.tag);
        for (key in qualities) {
            if (key !== "tag") {
                element.setAttribute(key, qualities[key]);
            }
        }
        return element;
    }
    window.getElement = getElement;
}

function reactStartPage() {

    setCardModesChangingReaction();
    findOutCurrentImageMode();
    setFieldModeChangingReaction();
    setSubmitReaction();
    setWatchResultsReaction();

    function setCardModesChangingReaction() {
        images.forEach((image, number, arr) => {
            arr[number].onclick = () => {
                arr = unselectAllImages(arr);
                arr[number].classList.add("selectedCard");
                findOutCurrentImageMode();
            }
        });
    }

    function unselectAllImages(images) {
        images.forEach((image, number, arr) => {
            arr[number].classList.remove("selectedCard");
        });
        return images;
    }

    function findOutCurrentImageMode() {
        images.forEach((image) => {
            if (image.classList.contains("selectedCard")) {
                currentImageMode = image.src;
            }
        });
    }

    function setFieldModeChangingReaction() {
        modes.forEach((radio, number, arr) => {
            arr[number].onchange = () => {
                fieldMode = arr[number].value;
            }
        });
    }

    function setSubmitReaction() {
        goButton.onclick = () => {
            nameInput.classList.remove("invalid");
            lastnameInput.classList.remove("invalid");
            emailInput.classList.remove("invalid");
            document.getElementById("difficultySettings").classList.remove("invalid");
            let invalidFields = getInvalidFields({
                "Card mode": currentImageMode,
                "Name": nameInput.value,
                "Last name": lastnameInput.value,
                "Email": emailInput.value,
                "Field mode": fieldMode
            });
            if (!validateEmail(emailInput.value)) {
                invalidFields.push("Email");
            }
            invalidFields.forEach((value) => {
                if (value === "Name") {
                    nameInput.classList.add("invalid");
                }
                if (value === "Last name") {
                    lastnameInput.classList.add("invalid");
                }
                if (value === "Email") {
                    emailInput.classList.add("invalid");
                }
                if (value === "Field mode") {
                    document.getElementById("difficultySettings").classList.add("invalid");
                }
            });
            if (invalidFields.length === 0) {
                showGamePage(currentImageMode, fieldMode);
            }
        };

        function validateEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function getInvalidFields(fields) {
            let invalidFields = [];
            for (key in fields) {
                if (!fields[key]) {
                    invalidFields.push(key);
                }
            }
            return invalidFields;
        }

    }

    function setWatchResultsReaction() {
        scoreButton.onclick = () => {
            runResultsPage();
        }
    }
}