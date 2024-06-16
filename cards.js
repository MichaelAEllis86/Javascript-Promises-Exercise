// PART 2 CARDS

alert("hello I am JS");
const newDeckDraw1='https://deckofcardsapi.com/api/deck/new/draw/?count=1'
const baseAPIURL='https://deckofcardsapi.com/api/deck'
const newDeckShuffled='https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'


// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).


// This logic runs automatically and console logs a single drawn card from new deck from the cards api
let singleCardResponse=axios.get(`${newDeckDraw1}`);
singleCardResponse.then(res => {
    console.log(res);
    console.log(`your card is the ${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
})
singleCardResponse.catch(err => {
    console.log("rejected promise!!!!",err)
})

// Same logic as above but here we declare a function so we can call this whenever we want to get a NEW DECK and draw 1 card on demand.
function getACard(){
    axios.get(`${newDeckDraw1}`)
    .then(res => {
        console.log(res)
        console.log(`your card is the ${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.


// This logic runs automatically and console logs a each drawn card from the SAME deck from the cards api


axios.get(`${newDeckDraw1}`)
    .then(resCard1 => {
        console.log("inside promise 1")
        console.log(resCard1)
        console.log(`The id of this deck is ${resCard1.data.deck_id}`)
        console.log(`your first card is the ${resCard1.data.cards[0].value} of ${resCard1.data.cards[0].suit}`);
        return axios.get(`${baseAPIURL}/${resCard1.data.deck_id}/draw/?count=1`)
    })
    .then(resCard2 => {
        console.log("inside promise 2")
        console.log(resCard2)
        console.log(`your second card is the ${resCard2.data.cards[0].value} of ${resCard2.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })


// Same logic as above but here we declare a function so we can call this whenever we want to get a two cards, just like we did in question 1.
function twoCardsOneDeck(){
    axios.get(`${newDeckDraw1}`)
    .then(resCard1 => {
        console.log("inside promise 1")
        console.log(resCard1)
        console.log(`The id of this deck is ${resCard1.data.deck_id}`)
        console.log(`your first card is the ${resCard1.data.cards[0].value} of ${resCard1.data.cards[0].suit}`);
        return axios.get(`${baseAPIURL}/${resCard1.data.deck_id}/draw/?count=1`)
    })
    .then(resCard2 => {
        console.log("inside promise 2")
        console.log(resCard2)
        console.log(`your second card is the ${resCard2.data.cards[0].value} of ${resCard2.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })

}

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.



let deck_id=null

// Fetches us a new shuffled deck from the API. Makes request and sets the deck_id so that we can draw from the same deck later!
function newDeck(){
    axios.get(`${'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'}`)
    .then(newDeck => {
        console.log(newDeck)
        console.log(`The id of this deck is ${newDeck.data.deck_id}`)
        deck_id=newDeck.data.deck_id
    })
    .catch(err => {
        console.log("rejected promise!!!! Unable to get new deck",err)
    })
}

// draws us a card from the preestablished deck_id via making the proper api request and rendering to the dom using jQuery, if there are no cards left in the deck, we alert the user.
function drawOneRenderOne(deck_id){
    axios.get(`${baseAPIURL}/${deck_id}/draw/?count=1`)
    .then(drawOne=>{
        console.log(drawOne)
        if(drawOne.data.remaining === 0){
            alert("there are no cards remaining in this deck! Please reset your deck")

        }
        console.log(`here is the image address for your card ${drawOne.data.cards[0].image}`)
        imageURL=drawOne.data.cards[0].image
        $('#cardsdiv').append(`<img src="${imageURL}" alt="card">`)
    })
    .catch(err => {
        console.log("rejected promise!!!! Unable to get new card",err)
    })

}

// Function used to reset the deck once all cards have been drawn. We could also have this run automatically at zero cards remaining, but I like giving the user an option to control that.
// empty's the card's div which holds all of our cards, resets the deck id, calls newdeck(), alerts the user.
function resetDeck(){
    $('#cardsdiv').empty()
    deck_id=null
    alert("the deck has been reset")
    newDeck()
}

// Evt listeners! 

// Everytime we reload the page we get a new deck to draw from
document.addEventListener("DOMContentLoaded",newDeck())

// when we click get a card btn we use our draw and render function to draw a card from the deck
$('#cardbtn').on("click", function (evt){
    console.log('clicked',"the evt listener is working", "inside cardbtn evt listener")
    drawOneRenderOne(deck_id)

})

// when user clicks resetbtn we run resetDeck() and get rid of all cards and present a new deck
$('#resetbtn').on("click", function (evt){
    console.log('clicked',"the evt listener is working", "inside resetbtn evt listener")
    resetDeck()
})

