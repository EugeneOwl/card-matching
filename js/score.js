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