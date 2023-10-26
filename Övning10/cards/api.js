function getApi() {
    const apiEndpoint = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=1';


    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cards.length > 0) {
                const cardData = data.cards[0];

                const cardImage = document.createElement('img');
                cardImage.setAttribute('src', cardData.image);
                cardImage.setAttribute('alt', `Random Card: ${cardData.value} of ${cardData.suit}`);

                const cardDisplay = document.getElementById('card-display');

                cardDisplay.innerHTML = '';
                cardDisplay.appendChild(cardImage);
            } else {
                // Handle the case when no cards are drawn.
            }
        })
        .catch(error => {
            // Handle errors
            const output = document.getElementById('card-display'); // Change 'output' to 'card-display'
            output.innerHTML = `Error: ${error.message}`;
            console.error('Error:', error);
        });
}

document.getElementById("draw").addEventListener('click', getApi);