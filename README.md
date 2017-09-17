# Memory Game

Memory Game is a complete browser-based card matching game (also known as Concentration) made as part of the Frontend Developer Nanodegree on Udacity.

## How it works

To play the game, open the file index.html in your browser. The game board consists of sixteen cards arranged randomly in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. Each turn:

- A player flips one card over to reveal its underlying symbol
- The player then turns over a second card, trying to find the corresponding card with the same symbol
- If the cards match, both cards stay flipped over
- If the cards do not match, both cards are returned to their initial hidden state

The player's goal is to find and match the cards with the least amount of trials and the shortest amount of time possible. When all cards are matched, the player will be presented with a star rating, move count and overall time. Then, if desired, the player may do another round :)

### Scoring

3 stars = 14 or less moves
2 stars = 26 or less moves
1 star  = 27 moves moves or more

## Resources used:

- [jQuery](https://jquery.com/)
- [jQuery Modal](https://github.com/kylefox/jquery-modal)
- [Array shuffle](http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
- [Timer](https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
