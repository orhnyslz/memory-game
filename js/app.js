/*jshint esversion: 6 */

// Create a list of 16 cards à 2 x 8
const cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let cardList = cards;
cards.forEach(function(i) {
  cardList.push(i);
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the cardList
shuffle(cardList);

// Loop through each card, create its HTML and add it to the page
let cardDeck = $('#cardDeck');

cardList.forEach(function(cardName) {
  cardDeck.append(`<li class="card">
    <i class="fa fa-${cardName}"></i>
    </li>`);
});

// card classes: open, match, show (permanently), false (missing), right (missing)

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let openCards = [];
 let lockedCards = [];

 $(".deck").click(function(e) {
   showCard(e.target);
   addOpenCard(e.target);
   checkOpenedCards();
 });


function showCard(e) {
  $(e).addClass("show open");
}

function addOpenCard(e) {
  openCards.push($(e).children("i").attr("class"));
}

function checkOpenedCards() {
  if (openCards[1] !== undefined && openCards[0] === openCards[1]) {
    lockCards(openCards);
    hideCards(openCards);
  } else if (openCards[1] !== undefined && openCards[0] !== openCards[1]) {
      hideCards(openCards);
    }
  console.log(openCards);
  console.log(lockedCards);
}

function lockCards(list) {
  list.forEach(function(i) {
    lockedCards.push(i);
  });
}

function hideCards(list) {
  list.forEach(function(i) {
    $(i).toggleClass("open show");
  });
  list.splice(0, list.length);
}
