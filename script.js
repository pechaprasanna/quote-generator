const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const changeBackgroundBtn = document.getElementById('change-background');
const loader = document.getElementById('loader');
const bodyTag = document.body;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    const proxyUrl = 'https://shielded-thicket-27086.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();
        //If Author is blank, add 'Unknown'
        if(data.quoteAuthor === ''){ 
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if(data.quoteText.length > 120 ) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText =data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        getQuoteFromAPI();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

//Event Listerners
changeBackgroundBtn.addEventListener('click',randomizeBackground);
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click',tweetQuote);

//Randomize Background
function randomizeBackground() {
    let randomNumber = getRandomNumber(0,28);
    bodyTag.style.backgroundImage = backgroundArray[randomNumber];
}

//Random Number Generator between two given numbers including themselves
function getRandomNumber(firstNumber, lastNumber) {
    firstNumber = Math.ceil(firstNumber); 
    lastNumber = Math.floor(lastNumber); 
    return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber; 
}

//On Load
getQuoteFromAPI();
randomizeBackground();
