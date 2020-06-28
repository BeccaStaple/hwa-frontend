"use strict;"

const BASE_URL = "http://localhost:8082";
const collectionOutput = document.getElementById("collectionOutputDiv");

//event listeners for CRUD stamp + collection
(function () {
    
    document.getElementById("createCollectionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.theme = this.theme.value;
        data.collectionValue = this.collectionValue.value;

        axios.post(BASE_URL + "/collection/create", data)
        .then(res => console.log(res)) //sort this to show at bottom of page once submitted
        .catch(err => console.log(err));
    });

    document.getElementById("readAllCollections").addEventListener("click", function() {
        axios.get(BASE_URL + "collection/read")
        .then(res => {
            res.data.forEach((collection, i) => {
                const colElements = makeElements("div", "", collectionOutput, "");

                colElements.id = "collection" + i;

                makeElements("h2", `Theme: ${collection.theme}`, collectOut, "");
                makeElements("p", `Value: ${collection.value}`, collectOut, "");
            })
        })
    })

})();


//need a function that displays the created collection/stamp




//function to add elements
function makeElements(elementType, text, appendTo, className) {
    const element = document.createElement(elementType);
    element.innerText = text;
    appendTo.appendChild(element);
    element.className = className;
    return element;
}
