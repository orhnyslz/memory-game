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

 $(".deck").click(function(event) {
   showCard(event.target);
   addOpenCard(event.target);
   checkOpenedCards(event.target);
   console.log(openCards);
 });

function showCard(evt) {
  $(evt).addClass("show open");
}

function addOpenCard(evt) {
  openCards.push($(evt).children("i").attr("class"));
}

function checkOpenedCards(evt) {
  if (openCards[1] !== undefined && openCards[0] === openCards[1]) {
    lockCards(openCards);
    removeCards(openCards);
  } else if (openCards[1] !== undefined && openCards[0] !== openCards[1]) {
    hideCards();
    removeCards(openCards);
  }
  console.log(lockedCards);
}

function lockCards(list) {
  list.forEach(function(i) {
    lockedCards.push(i);
  });
}

function removeCards(list, evt) {
  setTimeout(function() {
    list.splice(0, list.length);
  }, 1000);
}

function hideCards() {
  setTimeout(function() {
    openCards.forEach(function(i) {
      let className = "." + i.substring(3);
      console.log(className);
      $(className).parents("li").removeClass("show open");
    });
  }, 1000);
}
