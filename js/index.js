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


    document.getElementById("updateCollectionBtn").addEventListener("click", function() {
        const data = {};   
        let updateId = document.getElementById("collectionIdUpdate").value;
        
        let updatedTheme = document.getElementById("themeUpdateInput").value;

        let updatedValue = document.getElementById("valueUpdateInput").value;

        data.theme = updatedTheme;
        data.value = updatedValue;


        axios.put(BASE_URL + "/collection/update/" + updateId, data)
        .then(alert("This collection has been updated"))
        .then(closeMyCollectionModal())
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
    const data = {};
    const updateOutput = document.getElementById("updateCollectionOutput");
    let readUpdateOutput = makeElements("div", "", updateOutput, "");
    let idInputUpdate = document.getElementById("collectionIdUpdate");
    let colToUpdate = idInputUpdate.value;

    
    
    axios.get(BASE_URL + "/collection/read/" + colToUpdate)
    .then(res => {
            document.getElementById("themeUpdateInput").placeholder = res.data.theme;
            document.getElementById("valueUpdateInput").placeholder = res.data.value;
        })
            
}

function closeMyCollectionModal() {
    document.getElementById("myModal").style.display = "none";
}

