"use strict;"

const BASE_URL = "http://localhost:8082";
const collectionOutput = document.getElementById("collectionOutputDiv");

(function () {
    
    document.getElementById("createCollectionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.theme = this.theme.value;
        data.value = this.value.value;

        axios.post(BASE_URL + "/collection/create", data)
        .then(res => alert("The " + res.data.theme + " collection has been created"))
        .catch(err => console.log(err));
    });

    document.getElementById("readAllCollections").addEventListener("click", function() {
        axios.get(BASE_URL + "/collection/read")
        .then(res => {
            collectionOutput.innerText = " ";
            const colElements = makeElements("div", "", collectionOutput, "");
                const colTable = makeElements("table", "", colElements, "table table-striped");
                const colTableBody = makeElements("tbody", "", colTable, "");
                const colColumns = makeElements("tr", "", colTableBody, "");
                makeElements("th", "ID", colColumns, "");
                        makeElements("th", "Theme", colColumns, "");
                        makeElements("th", "Value", colColumns, "");
            res.data.forEach((collection, i)=> {
                
                
                    makeElements("tr", "", colTableBody, "");
                        makeElements("td", collection.id, colTableBody, ""); 
                        makeElements("td", collection.theme, colTableBody, "");
                        makeElements("td", collection.value, colTableBody, "");

                
            }).catch(err => console.log(err));
        });
    });

    document.getElementById("deleteCollectionBtn").addEventListener("click", function () {
        let deleteInput = document.getElementById("collectionIdDelete");
        let inputId = deleteInput.value;

        axios.delete(BASE_URL + "/collection/delete/" + inputId)
        .then(res => alert("The collection with ID of " + res.data.inputId + " collection has been deleted"))
        .catch(err => console.log(err));
    });


    document.getElementById("updateStampBtn").addEventListener("click", function() {
        
        const data = {};
        let updateInput = document.getElementById("collectionIdUpdate");
        let updateId = updateInput.value;

        data.theme = this.theme.value;
        data.value = this.value.value;

        axios.put(BASE_URL + "/collection/update/", data)
        .then(res => alert(res + "has been updated"))
        .catch(err => console.log(err));
    });



})();

function makeElements(elementType, text, appendTo, className) {
    const element = document.createElement(elementType);
    element.innerText = text;
    appendTo.appendChild(element);
    element.className = className;
    return element;
}

function openMyCollectionModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeMyCollectionModal() {
    document.getElementById("myModal").style.display = "none";
}

