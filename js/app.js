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


// list of variables used for the gameplay
 let openCards = [];
 let lockedCards = [];
 let moveCount = 0;
 let starCount = 3;
 let matches = 0;

// functions being fired when clicked on a card
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

// The brain of the game... handles the gameplay with all functions needed
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
  matches++;
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
  if (moveCount === 10) {
    $(".stars li:last-child").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 2;
  } else if (moveCount === 18) {
    $(".stars li:nth-child(2)").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 1;
  } else if (moveCount === 26) {
    $(".stars li:nth-child(1)").children("i").removeClass("fa-star").addClass("fa-star-o");
    starCount = 0;
  }
}

// execute modal when all cards are matched
function outputFinalScore() {
  if (matches === 8) {
    clearInterval(gameTimer);
    let minutes = $("#minutes").text();
    let seconds = $("#seconds").text();
    let congratulations = `<h2>Congratulations! You won!</h2>
    <p>With ${moveCount} moves and ${starCount} stars. Your time was ${minutes}:${seconds} minutes.</p>
    <button type="button" onclick="refresh()">Play again!</button>`;
    $("#modal").append(congratulations);
    $('#modal').modal();
  }
}

function refresh() {
  location.reload();
}

$(".fa-repeat").click(function() {
  refresh();
});

// Modified timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var gameTimer = setInterval(setTime, 1000);

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
