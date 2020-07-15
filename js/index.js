"use strict;"

const BASE_URL = "http://localhost:8082";
const collectionOutput = document.getElementById("collectionOutputDiv");
const stampOutput = document.getElementById("readStampOutput");




(function () {
    
    document.getElementById("createCollectionForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.theme = this.theme.value;
        data.value = this.value.value;

        axios.post(BASE_URL + "/collection/create", data)
        .then(entityCreated())
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
        .then(entityCreated())
        .catch(err => console.log(err));
    });


    document.getElementById("updateCollectionBtn").addEventListener("click", function() {
        const data = {};   
        let updateId = document.getElementById("collectionIdUpdate").value;
        
        let updatedTheme = document.getElementById("themeUpdateInput").value;

        let updatedValue = document.getElementById("valueUpdateInput").value;

        if (data.theme != "") {
            data.theme = updatedTheme;
        } else {
            data.theme = currentTheme;
        }
        
        if (data.value != "") {
            data.value = updatedValue;
        } else {
            data.value = currentValue;
        }
  
        axios.put(BASE_URL + "/collection/update/" + updateId, data)
        .then(entityCreated())
        .then(closeMyModal())
        .catch(err => console.log(err));
    });

    document.getElementById("createStampForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const data = {};

        data.name = this.name.value;
        data.value = this.value.value;
        data.yearMade = this.yearMade.value;
        data.collectionId = this.collectionId.value;

        axios.post(BASE_URL + "/stamp/create", data)
        .then(entityCreated())
        .catch(err => console.log(err));
    });

    document.getElementById("readAllStamps").addEventListener("click", function() {
        axios.get(BASE_URL + "/stamp/read")
        .then(res => {
            stampOutput.innerText = " ";
            const stampElements = makeElements("div", "", stampOutput, "");
                const stampTable = makeElements("table", "", stampElements, "table table-striped");
                const stampTableBody = makeElements("tbody", "", stampTable, "");
                const stampColumns = makeElements("tr", "", stampTableBody, "");
                        makeElements("th", "ID", stampColumns, "");
                        makeElements("th", "Stamp Name", stampColumns, "");
                        makeElements("th", "Stamp Value", stampColumns, "");
                        makeElements("th", "Year Made", stampColumns, "");
                        makeElements("th", "Collection ID", stampColumns, "");
            
                        
                        res.data.forEach((stamp, i)=> {
                        makeElements("tr", "", stampTableBody, "");
                        makeElements("td", stamp.id, stampTableBody, ""); 
                        makeElements("td", stamp.name, stampTableBody, "");
                        makeElements("td", stamp.value, stampTableBody, "");
                        makeElements("td", stamp.yearMade, stampTableBody, "");
                        makeElements("td", stamp.collectionId, stampTableBody, "");
                
            }).catch(err => console.log(err));
        });
    });

    document.getElementById("deleteStampBtn").addEventListener("click", function () {
        let deleteInput = document.getElementById("stampIdDelete");
        let inputId = deleteInput.value;

        axios.delete(BASE_URL + "/stamp/delete/" + inputId)
        .then(entityCreated())
        .catch(err => console.log(err));
    });


    document.getElementById("updateStampBtn").addEventListener("click", function() {
        const data = {};   
        let updateStampId = document.getElementById("stampIdUpdate").value;
        
        let updatedName = document.getElementById("nameUpdateInput").value;
        let updatedStampValue = document.getElementById("valueStampUpdateInput").value;
        let updatedYearMade = document.getElementById("yearMadeUpdateInput").value;
        let updatedColId = document.getElementById("colIdStampUpdateInput").value;

        data.name = updatedName;
        data.value = updatedStampValue;
        data.yearMade = updatedYearMade;
        data.collectionId = updatedColId;
  
        axios.put(BASE_URL + "/stamp/update/" + updateStampId, data)
        .then(entityCreated())
        .then(closeMyModal())
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
    let idInputUpdate = document.getElementById("collectionIdUpdate");
    let colToUpdate = idInputUpdate.value;

    axios.get(BASE_URL + "/collection/read/" + colToUpdate)
    .then(res => {
            document.getElementById("themeUpdateInput").placeholder = res.data.theme;
            document.getElementById("valueUpdateInput").placeholder = res.data.value;
        })
            
}

function openMyStampModal() {
    document.getElementById("myStampModal").style.display = "block";
    let idInputUpdate = document.getElementById("stampIdUpdate");
    let stampToUpdate = idInputUpdate.value;

    axios.get(BASE_URL + "/stamp/read/" + stampToUpdate)
    .then(res => {
            document.getElementById("nameUpdateInput").placeholder = res.data.name;
            document.getElementById("valueStampUpdateInput").placeholder = res.data.value;
            document.getElementById("yearMadeUpdateInput").placeholder = res.data.yearMade;
            document.getElementById("colIdStampUpdateInput").placeholder = res.data.collectionId;
        })
            
}

function closeMyModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myStampModal").style.display = "none";
}

function entityCreated() {
    document.getElementById("toast-output").style.display = "block";
    
}

function closeToast() {
    document.getElementById("toast-output").style.display = "none";
}


