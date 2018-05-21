
function showGamePage(cardViewMode, fieldMode) {
    timerStart();
    headerBlock.innerText = "Game";
    bastionBlock.innerHTML = "";
    showBackButton(bastionBlock);
    showCardTable(bastionBlock, fieldMode);
    setCardsReaction();

    function timerStart() {
        startGame = new Date();
    }

    function timerStop() {
        finishGame = new Date();
    }

    function getGameTime() {
        return (finishGame.getTime() - startGame.getTime()) / 1000;
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
            let path = `images/${number}.jpeg`;
            underCardValues.push(path, path);
        }
        return underCardValues.sort(compareRandom);

        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }
    }

    function getCardTable(values, fieldMode) {
        let table = getElement({tag:"table", id:"cardTable"});
        let currentValueNumber = 0;
        cells = [];
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
            let cardImg = getElement({tag:"img", src:value});
            valueSpan.appendChild(cardImg);
            valueSpan.classList.add("invisible");
            let image = getElement({tag:"img", src:currentImageMode});
            cell.appendChild(valueSpan);
            cell.appendChild(image);
            cells.push(cell);
            return cell;
        }
    }

    function setCardsReaction() {
        cells.forEach( (cell) => {
            cell.onclick = () => {
                if (firstCard === undefined) {
                    firstCard = cell;
                    firstCard = showCard(firstCard);
                } else {
                    cell = showCard(cell);
                    sleep(sleepPeriod).then(() => {
                        if (firstCard.childNodes[0].childNodes[0].src === cell.childNodes[0].childNodes[0].src) {
                            checkEoG();
                        } else {
                            firstCard = hideCard(firstCard);
                            cell = hideCard(cell);
                        }
                        firstCard = undefined;
                    });
                }

            }
        });
    }

    function checkEoG() {
        let readyOnesAmount = 0;
        cells.forEach( (cell) => {
            if (cell.childNodes[1].classList.contains("invisible")) {
                readyOnesAmount++;
            }
        });
        if (readyOnesAmount === cells.length) {
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
            name:nameInput.value,
            lastname:lastnameInput.value,
            email:emailInput.value,
            time:time
        };

        let resultsArray = JSON.parse(localStorage.getItem("results"));
        if (resultsArray) {
            resultsArray.push(resultObject);
        } else {
            resultsArray = [resultObject];
        }
        resultsArray = prepareTop(resultsArray, topAmount);
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