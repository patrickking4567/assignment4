document.addEventListener("DOMContentLoaded", function () {
    const studentInfoDiv = document.createElement("p");
    studentInfoDiv.innerHTML = "Student ID: 200545944<br>Name: Pranav";
    document.body.appendChild(studentInfoDiv);

    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", async function () {
        const elementSearchInput = document.getElementById("elementSearch");
        const elementName = elementSearchInput.value.trim();

        if (elementName === "") {
            alert("Please enter an element name.");
            return;
        }
        // API link and setup
        const url = `https://periodic-table-api.p.rapidapi.com/search?name=${elementName}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '08a1867816mshc7a59701721a57cp15f500jsnb1e36b4d4fdf',
                'X-RapidAPI-Host': 'periodic-table-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result && result.success && result.results > 0) {
                const element = result.data[0];

                // Display the element information
                const elementInfoDiv = document.getElementById("elementInfo");
                elementInfoDiv.innerHTML = `
                    <h2>${element.name}</h2>
                    <p>Atomic Mass: ${element.atomic_mass}</p>
                    <p>Category: ${element.category}</p>
                    <p>Density: ${element.density}</p>
                    <p>Discovered By: ${element.discovered_by}</p>
                    <img src="${element.bohr_model_image}" alt="Bohr Model">
                    
                    <!-- Add the back button to the detail section -->
                    <button id="backButton">Back</button>
                `;

                // Add functionality for the back button in the detail section
                const backButton = document.getElementById("backButton");
                backButton.addEventListener("click", function () {
                    elementInfoDiv.innerHTML = "<p>Enter an element name to get information here!!</p>";
                });
            } else {
                const elementInfoDiv = document.getElementById("elementInfo");
                elementInfoDiv.innerHTML = "<p>No information found for the specified element.</p>";
            }
        } catch (error) {
            console.error(error);
            const elementInfoDiv = document.getElementById("elementInfo");
            elementInfoDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
        }
    });
});
function openAPIDocumentation() {
    window.open("https://rapidapi.com/mdakram09/api/periodic-table-api", "_blank");
}