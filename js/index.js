"use strict;"

const BASE_URL = "http://localhost:8082";
const collectionOutput = document.getElementById("collectionOutputDiv");

(function () {
    
    document.getElementById("createCollectionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.theme = this.theme.value;
        data.collectionValue = this.collectionValue.value;

        axios.post(BASE_URL + "/collection/create", data)
        .then(res => alert(res + "has been created"))
        .catch(err => console.log(err));
    });

    document.getElementById("readAllCollections").addEventListener("click", function() {
        axios.get(BASE_URL + "collection/read")
        .then(res => {
            collectionOutput.innerText = " ";
            res.data.forEach((collection, i) => {
                const colElements = makeElements("div", "", collectionOutput, "");

                colElements.id = "collection" + i;

                makeElements("h2", `Theme: ${collection.theme}`, colElements, "");
                makeElements("p", `Value: ${collection.value}`, colElements, "");
            }).catch(err => console.log(err));
        });
    });

    document.getElementById("deleteCollectionBtn").addEventListener("click", function () {
        let deleteInput = document.getElementById("collectionIdDelete");
        axios.delete(BASE_URL + "/collection/delete/" + deleteInput.value)
        .then(res => alert(res + " has been deleted"))
        .catch(err => console.log(err));
    });


    document.getElementById("updateStampBtn").addEventListener("click", function() {
        const data = {};

        data.theme = this.theme.value;
        data.collectionValue = this.collectionValue.value;

        axios.put(BASE_URL + "/collection/update", data)
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

