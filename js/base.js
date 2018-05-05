(function base() {

    let headerBlock = document.getElementById("header");
    let contentBlock = document.getElementById("content");
    let bastionBlock = document.getElementById("bastion");

    (function showStartPage() {
        window.showStartPage = showStartPage;

        showStartWrapper(contentBlock);
        showStartHeader(headerBlock);
        showStartRules(bastionBlock);
        showScoreBlock(bastionBlock);
        showFormPanel(bastionBlock);
        setSubmitReaction();


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

        function getScoreBlock() {
            let scoreButtonDiv = getElement({tag:"div", id:"watchScoreButton"});
            let scoreButton = getElement({
                tag:"input",
                type:"button",
                value:"Watch score"
            });
            base.scoreButton = scoreButton;
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
            let goButton = getElement({
               tag:"input",
               type:"button",
               id:"goButton",
               value:"Go!"
            });
            base.goButton = goButton;
            
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

            let nameInput = getElement({
                tag:"input",
                type:"text",
                placeholder:"name",
                id:"name"
            });
            base.nameInput = nameInput;
            let nameInputBlock = getInputBlock(divClass, nameInput);
            textInputDiv.appendChild(nameInputBlock);

            let lastnameInput = getElement({
                tag:"input",
                type:"text",
                placeholder:"last name",
                id:"lastname"
            });
            base.lastnameInput = lastnameInput;
            let lastNameInputBlock = getInputBlock(divClass, lastnameInput);
            textInputDiv.appendChild(lastNameInputBlock);

            let emailInput =  getElement({
                    tag:"input",
                    type:"email",
                    placeholder:"email",
                    id:"email"
            });
            base.emailInput = emailInput;
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

            let mode1radioBlock = getRadioModeBlock(1, "3 x 2 field");
            difficultySettingsDiv.appendChild(mode1radioBlock);

            let mode2radioBlock = getRadioModeBlock(2, "3 x 3 field");
            difficultySettingsDiv.appendChild(mode2radioBlock);

            let mode3radioBlock = getRadioModeBlock(3, "3 x 4 field");
            difficultySettingsDiv.appendChild(mode3radioBlock);

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
            if (base.modes === undefined) {
                base.modes = [];
            }
            base.modes.push(input);

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
            base.images = [img1, img2];
            ViewSettingDiv.appendChild(base.images[0]);
            ViewSettingDiv.appendChild(base.images[1]);
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
    }) ();

    (function reactStartPage() {
        (function setCardModesChangingReaction() {
            base.images.forEach( (image, number, arr) => {
                arr[number].onclick = () => {
                    arr = unselectAllImages(arr);
                    arr[number].classList.add("selectedCard");
                    base.findOutCurrentImageMode();
                }
            });
        }) ();

        function unselectAllImages(images) {
            images.forEach( (image, number, arr) => {
                arr[number].classList.remove("selectedCard");
            });
            return images;
        }

        (function findOutCurrentImageMode() {
            base.images.forEach( (image) => {
                if (image.classList.contains("selectedCard")) {
                    base.currentImageMode = image.src;
                }
            });
            base.findOutCurrentImageMode = findOutCurrentImageMode;
        }) ();
        
        (function setFieldModeChangingReaction() {
            base.modes.forEach( (radio, number, arr) => {
                arr[number].onchange = () => {
                    base.fieldMode = arr[number].value;
                }
            });
        }) ();

        function setSubmitReaction() {
            base.goButton.onclick = () => {
                let invalidFields = getInvalidFields({
                    "Card mode":base.currentImageMode,
                    "Name":base.nameInput.value,
                    "Last name":base.lastnameInput.value,
                    "Email":base.emailInput.value,
                    "Field mode":base.fieldMode
                });
                invalidFields.forEach( (value) => {
                    console.log(value);
                });
                //if (invalidFields.length === 0) {
                    showGamePage(base.currentImageMode, base.fieldMode);
                //}
            };

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

    }) ();

    function showGamePage(cardViewMode, fieldMode) {
        headerBlock.innerText = "Game";
        bastionBlock.innerHTML = "";
        showBackButton(bastionBlock);

        function getBackBlock() {
            let backButtonDiv = getElement({tag:"div", id:"backBlock"});
            backButtonDiv.classList.add("backButton");
            let backButton = getElement({
                tag:"input",
                type:"button",
                value:"Back"
            });
            backButton.onclick = () => {
                bastionBlock.innerHTML = "";
                headerBlock.innerHTML = "";
                showStartPage();
            };
            backButtonDiv.appendChild(backButton);
            return backButtonDiv;
        }

        function showBackButton(father) {
            father.appendChild(getBackBlock());
        }
    }

}) ();