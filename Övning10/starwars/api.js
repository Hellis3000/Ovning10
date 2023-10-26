function getApi() {
    const fetchInfo = document.getElementById("swinput").value;
    const apiEndpoint = `https://swapi.dev/api/people/?search=${fetchInfo}`;

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                const lukeData = data.results[0];
                const { height, mass, gender, hair_color } = lukeData;
                const result = `Height: ${height}\nMass: ${mass}\nGender: ${gender}\nHair Color: ${hair_color}`;
                document.getElementById("output").value = result;
            } else {
                document.getElementById("output").value = "Character not found.";
            }
        })
        .catch(error => {
            document.getElementById("output").value = `Error: ${error.message}`;
            console.error('Error:', error);
        });
}
