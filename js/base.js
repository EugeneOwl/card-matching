(function base() {
    let fields = {
        1:[3,2],
        2:[2,4],
        3:[3,4]
    };
    let top = 10;
    let sleepPeriod = 100;

    let headerBlock = document.getElementById("header");
    let bastionBlock = document.getElementById("bastion");
    showStartPage();
    reactStartPage();

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
    }

    function reactStartPage() {

        setCardModesChangingReaction();
        findOutCurrentImageMode();
        setFieldModeChangingReaction();
        setSubmitReaction();
        setWatchResultsReaction();

        function setCardModesChangingReaction() {
            base.images.forEach((image, number, arr) => {
                arr[number].onclick = () => {
                    arr = unselectAllImages(arr);
                    arr[number].classList.add("selectedCard");
                    base.findOutCurrentImageMode();
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
            base.images.forEach((image) => {
                if (image.classList.contains("selectedCard")) {
                    base.currentImageMode = image.src;
                }
            });
            base.findOutCurrentImageMode = findOutCurrentImageMode;
        }

        function setFieldModeChangingReaction() {
            base.modes.forEach((radio, number, arr) => {
                arr[number].onchange = () => {
                    base.fieldMode = arr[number].value;
                }
            });
        }

        function setSubmitReaction() {
            base.goButton.onclick = () => {
                let invalidFields = getInvalidFields({
                    "Card mode": base.currentImageMode,
                    "Name": base.nameInput.value,
                    "Last name": base.lastnameInput.value,
                    "Email": base.emailInput.value,
                    "Field mode": base.fieldMode
                });
                invalidFields.forEach((value) => {
                    alert(`${value} is not valid.`);
                });
                if (invalidFields.length === 0) {
                    showGamePage(base.currentImageMode, base.fieldMode);
                }
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

        function setWatchResultsReaction() {
            base.scoreButton.onclick = () => {
                runResultsPage();
            }
        }
    }

    function runStartPage() {
        bastionBlock.innerHTML = "";
        headerBlock.innerHTML = "";
        showStartPage();
        reactStartPage();
    }

    function showGamePage(cardViewMode, fieldMode) {
        timerStart();
        headerBlock.innerText = "Game";
        bastionBlock.innerHTML = "";
        showBackButton(bastionBlock);
        showCardTable(bastionBlock, fieldMode);
        setCardsReaction();
        
        function timerStart() {
            base.startGame = new Date();
        }

        function timerStop() {
            base.finishGame = new Date();
        }

        function getGameTime() {
            return (base.finishGame.getTime() - base.startGame.getTime()) / 1000;
        }

        function showCardTable(father, fieldMode) {
            let underCardValues = getUnderCardValues(fieldMode);
            let cardTable = getCardTable(underCardValues, fieldMode);
            father.appendChild(cardTable);
        }

        function getUnderCardValues(fieldMode) {
            let couplesAmount = ( fields[fieldMode][0] * fields[fieldMode][1] ) / 2;
            let underCardValues = [];
            for (let number = 0; number < couplesAmount; number++) {
                underCardValues.push(number, number);
            }
            return underCardValues.sort(compareRandom);

            function compareRandom(a, b) {
                return Math.random() - 0.5;
            }
        }

        function getCardTable(values, fieldMode) {
            let table = getElement({tag:"table", id:"cardTable"});
            let currentValueNumber = 0;
            base.cells = [];
            for (let rowNumber = 0; rowNumber < fields[fieldMode][0]; rowNumber++) {
                let row = getElement({tag:"tr"});
                for (let cellNumber = 0; cellNumber < fields[fieldMode][1]; cellNumber++) {
                    let cell = getCardTableCell(values[currentValueNumber]);
                    row.appendChild(cell);
                    currentValueNumber++;
                }
                table.appendChild(row);
            }
            return table;

            function getCardTableCell(value) {
                let cell = getElement({tag:"td"});
                let valueSpan = getElement({tag:"span"});
                valueSpan.innerText = value;
                valueSpan.classList.add("invisible");
                let image = getElement({tag:"img", src:base.currentImageMode});
                cell.appendChild(valueSpan);
                cell.appendChild(image);
                base.cells.push(cell);
                return cell;
            }
        }

        function setCardsReaction() {
            base.cells.forEach( (cell) => {
                cell.onclick = () => {
                    if (base.firstCard === undefined) {
                        base.firstCard = cell;
                        base.firstCard = showCard(base.firstCard);
                    } else {
                        cell = showCard(cell);
                        sleep(sleepPeriod).then(() => {
                            if (base.firstCard.innerText === cell.innerText) {
                                checkEoG();
                            } else {
                                base.firstCard = hideCard(base.firstCard);
                                cell = hideCard(cell);
                            }
                            base.firstCard = undefined;
                        });
                    }

                }
            });
        }

        function checkEoG() {
            let readyOnesAmount = 0;
            base.cells.forEach( (cell) => {
                if (cell.childNodes[1].classList.contains("invisible")) {
                    readyOnesAmount++;
                }
            });
            if (readyOnesAmount === base.cells.length) {
                timerStop();
                let time = getGameTime();
                alert(`${time} sec`);
                recognizeResult(time);
                runStartPage();
            }
        }

        function hideCard(cell) {
            cell.childNodes[0].classList.add("invisible");
            cell.childNodes[1].classList.remove("invisible");
            return cell;
        }

        function showCard(cell) {
            cell.childNodes[1].classList.add("invisible");
            cell.childNodes[0].classList.remove("invisible");
            return cell;
        }

        function recognizeResult(time) {
            let resultObject = {
                name:base.nameInput.value,
                lastname:base.lastnameInput.value,
                email:base.emailInput.value,
                time:time
            };

            let resultsArray = JSON.parse(localStorage.getItem("results"));
            if (resultsArray) {
                resultsArray.push(resultObject);
            } else {
                resultsArray = [resultObject];
            }
            resultsArray = prepareTop(resultsArray, top);
            localStorage.setItem("results", JSON.stringify(resultsArray));
        }

        function prepareTop(results, n) {
            results.sort(compareResults);
            return results.splice(0,  n);

            function compareResults(a, b) {
                if (a.time < b.time)
                    return -1;
                if (a.time > b.time)
                    return 1;
                return 0;
            }
        }
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

    function runResultsPage() {
        bastionBlock.innerHTML = "";
        headerBlock.innerHTML = "";
        showResultsPage();
    }

    function showResultsPage() {
        headerBlock.innerText = "Score";
        bastionBlock.innerHTML = "";
        showBackButton(bastionBlock);
        showScoreTable(bastionBlock);
    }

    function showScoreTable(father) {
        father.appendChild(getScoreTable());
    }
    
    function getScoreTable() {
        let table = getElement({tag:"table", id:"score"});
        table.appendChild(getHeaderRow());
        let results = JSON.parse(localStorage.getItem("results"));
        if (results) {
            results.forEach( (result) => {
                table.appendChild(getDataRow(result));
            });
        }
        return table;

        function getHeaderRow() {
            let headerRow = getElement({tag:"tr"});
            let nameHeader = getElement({tag:"th"});
            nameHeader.innerText = "Last name";
            let lastNameHeader = getElement({tag:"th"});
            lastNameHeader.innerText = "Last name";
            let emailHeader = getElement({tag:"th"});
            emailHeader.innerText = "Email";
            let timeHeader = getElement({tag:"th"});
            timeHeader.innerText = "Name";
            headerRow.appendChild(nameHeader);
            headerRow.appendChild(lastNameHeader);
            headerRow.appendChild(emailHeader);
            headerRow.appendChild(timeHeader);
            return headerRow;
        }

        function getDataRow(fields) {
            let dataRow = getElement({tag:"tr"});
            for (let key in fields) {
                let dataCell = getElement({tag:"td"});
                dataCell.innerText = fields[key];
                dataRow.appendChild(dataCell);
            }
            return dataRow;
        }
    }
}) ();