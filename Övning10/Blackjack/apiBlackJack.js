
const cardDisplayPlayer = document.getElementById('card-display-player');

const cardDisplayHouse = document.getElementById('card-display-house');

function shuffleDecks() {
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
            }
        })
        .catch(error => {
            const output = document.getElementById('card-display');
            output.innerHTML = `Error: ${error.message}`;
            console.error('Error:', error);
        });
}


document.getElementById("stand").addEventListener('click', stand);
document.getElementById("draw").addEventListener('click', getCards);
let playerValue = 0; // Initialize the player's value
let houseValue = 0; // Initialize the house's value

function getCardValue(cardValue) {
    if (["KING", "QUEEN", "JACK"].includes(cardValue)) {
        return 10;
    } else if (!isNaN(cardValue)) {
        return parseInt(cardValue);
    } else {
        return 0;
    }
}

function getCards() {
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
                cardImage.style.position = 'relative';
                cardImage.style.left = '0';

                if (playerValue <= houseValue) {
                    playerValue += getCardValue(cardData.value);
                    if (cardDisplayPlayer.childElementCount > 0) {

                        cardImage.style.marginLeft = '-160px';
                    } else {
                        cardImage.classList.add('card-image');
                    }
                    cardDisplayPlayer.appendChild(cardImage);
                } else {
                    houseValue += getCardValue(cardData.value);
                    if (cardDisplayHouse.childElementCount > 0) {

                        cardImage.style.marginLeft = '-160px';
                    } else {
                        cardImage.classList.add('card-image');
                    }
                    cardDisplayHouse.appendChild(cardImage);
                }

                const playerScore = document.getElementById('playerScore');
                playerScore.innerHTML = 'Player Score: ' + playerValue;

                const houseScore = document.getElementById('houseScore');
                houseScore.innerHTML = 'House Score: ' + houseValue;

                checkScore()
            } else {

            }
        })
        .catch(error => {
            const output = document.getElementById('card-display-player');
            output.innerHTML = `Error: ${error.message}`;
            console.error('Error:', error);
        });
}

function stand() {
    playerValue = playerValue;

    
    function houseTurn() {
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
                    cardImage.style.position = 'relative';
                    cardImage.style.left = '0';

                    houseValue += getCardValue(cardData.value);
                    if (cardDisplayHouse.childElementCount > 0) {
                        cardImage.style.marginLeft = '-160px';
                    } else {
                        cardImage.classList.add('card-image');
                    }
                    cardDisplayHouse.appendChild(cardImage);

                    const playerScore = document.getElementById('playerScore');
                    playerScore.innerHTML = 'Player Score: ' + playerValue;

                    const houseScore = document.getElementById('houseScore');
                    houseScore.innerHTML = 'House Score: ' + houseValue;

                    if (houseValue < playerValue && houseValue <= 21) {
                        // Continue house's turn if the house's score is less than the player's score and not bust
                        houseTurn();
                    } else {
                        checkScore();
                    }
                } else {

                }
            })
            .catch(error => {
                const output = document.getElementById('card-display-player');
                output.innerHTML = `Error: ${error.message}`;
                console.error('Error:', error);
            });
    }

    houseTurn();
}



function checkScore() {
    if (playerValue > 21) {
        playerScore.innerHTML = "Player Busts!";
        cardDisplayHouse.innerHTML = '';
        cardDisplayPlayer.innerHTML = '';
        playerValue = 0;
        houseValue = 0;

    }
    if (houseValue > 21) {
        houseScore.innerHTML = "The House Busts!";
        cardDisplayHouse.innerHTML = '';
        cardDisplayPlayer.innerHTML = '';
        playerValue = 0;
        houseValue = 0;


    }
}