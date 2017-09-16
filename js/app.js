/*jshint esversion: 6 */

// Create a list of 16 cards à 2 x 8
const cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let cardList = cards;
cards.forEach(function(i) {
  cardList.push(i);
});

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


 let openCards = [];
 let lockedCards = [];
 let moveCount = 0;
 let starCount = 3;

 $(".card").click(function(event) {
   showCard(event.target);
   addOpenCard(event.target);
   checkOpenedCards();
   outputFinalScore();
   console.log(lockedCards);
 });

function showCard(evt) {
  $(evt).addClass("show open");
}

function addOpenCard(evt) {
  openCards.push($(evt).children("i").attr("class"));
}

function checkOpenedCards() {
  if (openCards[1] !== undefined && openCards[0] === openCards[1]) {
    lockCards(openCards);
    removeCards(openCards);
    incrementMoves();
  } else if (openCards[1] !== undefined && openCards[0] !== openCards[1]) {
    hideCards();
    removeCards(openCards);
    incrementMoves();
  }
}

function lockCards(list) {
  list.forEach(function(i) {
    lockedCards.push(i);
  });
}

function hideCards() {
  setTimeout(function() {
    openCards.forEach(function(i) {
      let className = "." + i.substring(3);
      $(className).parents("li").removeClass("show open");
    });
  }, 500);
}

function removeCards(list) {
  setTimeout(function() {
    list.splice(0, list.length);
  }, 500);
}

function incrementMoves() {
  moveCount++;
  $(".moves").text(moveCount);
  takeStars();
}

function takeStars() {
  if (moveCount === 6) {
    $(".stars li:last-child").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 2;
  } else if (moveCount === 14) {
    $(".stars li:nth-child(2)").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 1;
  } else if (moveCount === 22) {
    $(".stars li:nth-child(1)").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 0;
  }
}

function outputFinalScore() {
  if (lockedCards.length > 16) {
    alert(`Congratulations! You Won!
  With ${moveCount} moves and ${starCount} stars`);
  }
}

$(".fa-repeat").click(function() {
  location.reload();
});

// Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}


// To-Do: Modal with Final Score and Refresh-Button, Readme-File, Comments
