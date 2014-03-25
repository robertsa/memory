// The set of 52 unique playing cards
var cards = [];

// The cards that have been flipped
// There should never be more than two
var flippedCards = [];

// The number of turns the player has taken
var turns = 0;

// The number of pairs the player has found
var pairsFound = 0;

// Event handler for the cards
// Flip the given card and process the outcome
function clickListener($card) {
  if (flippedCards.length < 2) {
    // If the player has not yet flipped over two cards
    flippedCards.push($card);
    $card.addClass("flip");
    $card.css("pointerEvents", "none");
  }
  if (flippedCards.length === 2) {
    // If the player has flipped over two cards
    turns++;
    $("#cardContainer").css("pointerEvents", "none");
    setTimeout(function() {
      if (flippedCards[0] && flippedCards[1]) {
        if ( flippedCards[0].data("value") === flippedCards[1].data("value") &&
             flippedCards[0].css("color") === flippedCards[1].css("color") ) {
          // A pair was found
          pairsFound++;
          flippedCards[0].css("pointerEvents", "none");
          flippedCards[1].css("pointerEvents", "none");
          flippedCards[0].children().eq(0).fadeTo(1000, 0.4);
          flippedCards[1].children().eq(0).fadeTo(1000, 0.4);
        } else {
          // No pair was found
          // Flip the cards back over
          flippedCards[0].removeClass("flip");
          flippedCards[1].removeClass("flip");
          flippedCards[0].css("pointerEvents", "auto");
          flippedCards[1].css("pointerEvents", "auto");
        }
        flippedCards.splice(0);
        $("#cardContainer").css("pointerEvents", "auto");
        if (pairsFound === 26) {
          // All pairs have been found
          // Display the end panel
          console.log("All pairs have been found");
          var $ep = $("#endPanel");
          $ep.children().eq(0)
            .html("You found all pairs in " + turns + " turns! " +
                  "Would you like to play again?");
          $ep.fadeIn();
          $("#mainContainer").fadeTo(1000, 0.4);
        }
      }
    }, 2000);
  }
}

// Create and return a single card
function createCard(value, suit) {
  // Create and configure the card elements
  // The card itself
  var $card = $("<div></div>");
  $card.addClass("card");
  $card.on("click", function() {
    clickListener( $(this) );
  });
  $card.data({
    value: value,
    suit: suit
  });
  if (suit === "clubs" || suit === "spades") {
    $card.css({
      color: "black",
      textShadow: "0px 0px 2px"
    });
  } else {
    $card.css({
      color: "red",
      textShadow: "0px 0px 2px red"
    });
  }
  
  // The card front
  var $cf = $("<div></div>");
  $cf.addClass("cardFront");
  $cf.html(value + " " + determineSuit($card));
  
  // The card back
  var $cb = $("<div></div>");
  $cb.addClass("cardBack").append("<img src='images/back.png'>");
  
  // Combine the rest of the card elements
  $card.append($cf);
  $card.append($cb);
  
  return $card;
}

// Create and store the 52 playing cards
function createCards() {
  cards.push(createCard("A", "clubs"));
  cards.push(createCard("J", "clubs"));
  cards.push(createCard("Q", "clubs"));
  cards.push(createCard("K", "clubs"));
  for (var i = 2; i < 11; i++) {
    cards.push(createCard(i, "clubs"));
  }
  cards.push(createCard("A", "diams"));
  cards.push(createCard("J", "diams"));
  cards.push(createCard("Q", "diams"));
  cards.push(createCard("K", "diams"));
  for (var i = 2; i < 11; i++) {
    cards.push(createCard(i, "diams"));
  }
  cards.push(createCard("A", "hearts"));
  cards.push(createCard("J", "hearts"));
  cards.push(createCard("Q", "hearts"));
  cards.push(createCard("K", "hearts"));
  for (var i = 2; i < 11; i++) {
    cards.push(createCard(i, "hearts"));
  }
  cards.push(createCard("A", "spades"));
  cards.push(createCard("J", "spades"));
  cards.push(createCard("Q", "spades"));
  cards.push(createCard("K", "spades"));
  for (var i = 2; i < 11; i++) {
    cards.push(createCard(i, "spades"));
  }
}

// Randomize the positions of the cards in the cards array
function shuffleCards() {
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

// Return the Unicode value for the given card's suit
function determineSuit($card) {
  switch ( $card.data("suit") ) {
    case "clubs":
      return "\u2663";
    case "hearts":
      return "\u2665";
    case "diams":
      return "\u2666";
    case "spades":
      return "\u2660";
  }
}

// Append the cards to the card container
function displayCards() {
  for (var i = 0; i < cards.length; i++) {
    $("#cardContainer").append(cards[i]);
  }
}

createCards();
shuffleCards();
displayCards();

// Event handler for the end panel button to reload the page
$("#endPanel").children().eq(1).on("click", function() {
  window.location.reload(true);
});