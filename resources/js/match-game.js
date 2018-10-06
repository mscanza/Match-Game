var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
var array = [];
var randomArray = [];
for (var i = 1; i <= 8; i++) {
  array.push(i);
  array.push(i);
}
while (array.length > 0) {
  var random = Math.floor(Math.random() * array.length);
  var idx = array.splice(random, 1)[0];
  randomArray.push(idx);
}
return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  var colors = [
    "hsl(25,85%,65%)",
    "hsl(55,85%,65%)",
    "hsl(90,85%,65%)",
    "hsl(160,85%,65%)",
    "hsl(220,85%,65%)",
    "hsl(265,85%,65%)",
    "hsl(310,85%,65%)",
    "hsl(360,85%,65%)"

  ];
  $game.data('flippedCards',[]);
$game.empty();

for (var i = 0; i < cardValues.length; i++) {
  var $card = $('<div class="col-xs-3 card"></div>');
  $card.data("value", cardValues[i]);
  $card.data("color", colors[cardValues[i] - 1]);
  $card.data("isFlipped", false);
  $game.append($card);
}
$('.card').click(function() {
  MatchGame.flipCard($(this), $('#game'));
});
 
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  var flippedCards = $game.data('flippedCards');
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('isFlipped', true);
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var grey = {
        backgroundColor: "rgb(153,153,153)",
        color: "rgb(204,204,204)"
      }
      flippedCards[0].css(grey);
      flippedCards[1].css(grey);

    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32,64,86)');
        card1.text('');
        card1.data('isFlipped',false);
        card2.css('background-color', 'rgb(32,64,86)');
        card2.text('');
        card2.data('isFlipped',false);
      }, 350);
     
    }
    $game.data('flippedCards',[]);
  }

};