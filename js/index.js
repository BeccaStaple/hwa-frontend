"use strict;"

const BASE_URL = "http://localhost:8082";

//event listeners for CRUD stamp + collection
(function () {
    
    document.getElementById("createCollectionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.theme = this.theme.value;
        data.collectionValue = this.collectionValue.value;

        axios.post(BASE_URL + "/collection/create", data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });


})();


//need a function that displays the created collection/stamp

//add a div to display info
//need to change to axios
function collectionElements() {
    fetch(BASE_URL + "/collection/read")
    .then(res => JSON())
    .then(json => {
        json.forEach(stampCollection => {
            const collection = document.getElementById("collectionOutput");
            const collectOut = makeElements("div", "", collection, "");
            makeElements("h2", `Theme: ${stampCollection.theme}`, collectOut, "");
            makeElements("p", `Value: ${stampCollection.value}`, collectOut, "");
        })
    })
}


//function to add elements
function makeElements(elementType, text, appendTo, className) {
    const element = document.createElement(elementType);
    element.innerText = text;
    appendTo.appendChild(element);
    element.className = className;
    return element;
}
