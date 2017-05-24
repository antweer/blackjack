$(document).ready(function() {
  // random function used to shuffle
  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // Card constructor
  class Card {
    constructor (point, suit) {
      this.point = point;
      this.suit = suit;
    }
    getImage() {
      var pointConversion = {
        1:'ace',
        11:'jack',
        12:'queen',
        13:'king'
      };
      var pointer;
      if(this.point in pointConversion){
        pointer = pointConversion[this.point];
      }
      else{
        pointer = this.point;
      }
      return("images/" + pointer + "_of_" + this.suit + ".png");
    }
  }
  
  // Hand constructor
  class Hand {
    constructor () {
      this.hand = [];
    }
    addCard (object) {
      this.hand.push(object);
    }
    getPoints(){
      let points = 0;
      for(let x = 0; x < this.hand.length; x++){
        if(this.hand[x].point == 1){
          if((21-points)<11){
            points += 1;
          } else {
            points += 11;
          }
        }else if(this.hand[x].point > 10){
          points += 10;
        }else{
          points += this.hand[x].point;
        }
      }
      return points;
    }
  }
  
  // Deck constructor
  class Deck {
    constructor(){
      this.cards = [];
      this.deck = [];
      let point = [1,2,3,4,5,6,7,8,9,10,11,12,13];
      let suit = ['hearts','clubs','diamonds', 'spades'];
      for(let x=0; x<point.length; x++){
        for(let y=0; y<suit.length; y++){
          this.cards.push(new Card(point[x],suit[y]));
        }
      }
    }
    shuffle () {
      let cardsPile = this.cards.length;
      let deckPile = this.deck.length;
      if(cardsPile > 0){
        for(let x=0; x<cardsPile; x++){
          this.deck.push(this.cards.splice(random(0,this.cards.length),1)[0]);
        }
      }else{
        for(let x=0; x<deckPile; x++){
          this.cards.push(this.deck.splice(random(0,this.deck.length),1)[0]);
        }
      }
    }
    draw() {
      if(this.deck.length > 0){
        return(this.deck.pop());
      }else{
        return(this.cards.pop());
      }
    }
    numCardsLeft(){
      if(this.deck.length > 0){
        return(this.deck.length);
      }else{
        return(this.cards.length);
      }
    }
  }
  
  function determineWinner(){
    if(dealerHand.getPoints() > playerHand.getPoints()){
      $('#messages').text('You lose!');
    }else if(playerHand.getPoints() > dealerHand.getPoints()){
      $('#messages').text('You win!');
    }else{
      $('#messages').text("It's a draw!");
    }
  }
  
  function restart(){
    gameDeck = new Deck();
    gameDeck.shuffle();
    hitCount = 2;
    standCount = 2;
    dealerHand = new Hand();
    playerHand = new Hand();
    $('#dealer-hand').html('');
    $('#player-hand').html('');
    $('#dealer-points').text('');
    $('#player-points').text('');
    $('#messages').text('');
    $('#restart-button').hide();
    $('#deal-button').show();
  }
  
  var gameDeck = new Deck();
  gameDeck.shuffle();
  var dealerHand = new Hand();
  var playerHand = new Hand();
  var hitCount = 2;
  var standCount = 2;
  
  $('#restart-button').hide();
  $('#hit-button').hide();
  $('#stand-button').hide();
  
  $('#deal-button').click(function(){
    dealerHand.addCard(gameDeck.draw());
    dealerHand.addCard(gameDeck.draw());
    playerHand.addCard(gameDeck.draw());
    playerHand.addCard(gameDeck.draw());
    $('#dealer-hand').append('<img src="' + dealerHand.hand[0].getImage() + '"/><img src="' + dealerHand.hand[1].getImage() + '"/>');
    $('#player-hand').append('<img src="' + playerHand.hand[0].getImage() + '"/><img src="' + playerHand.hand[1].getImage() + '"/>');
    $('#dealer-points').text(dealerHand.getPoints());
    $('#player-points').text(playerHand.getPoints());
    $('#deal-button').hide();
    $('#hit-button').show();
    $('#stand-button').show();
  });
  
  $('#hit-button').click(function(){
    playerHand.addCard(gameDeck.draw());
    $('#player-hand').append('<img src="' + playerHand.hand[hitCount].getImage() + '"/>');
    $('#player-points').text(playerHand.getPoints());
    if(playerHand.getPoints()>21){
      $('#messages').text("You've busted! Dealer wins.");
      $('#hit-button').hide();
      $('#stand-button').hide();
      $('#restart-button').show();
    }
    hitCount += 1;
  });
  
  $('#stand-button').click(function(){
    $('#hit-button').hide();
    while(dealerHand.getPoints()<17){
      dealerHand.addCard(gameDeck.draw());
      $('#dealer-hand').append('<img src="' + dealerHand.hand[standCount].getImage() + '"/>');
      $('#dealer-points').text(dealerHand.getPoints());
      standCount += 1;
    }
    if(dealerHand.getPoints()>21){
        $('#messages').text("Dealer has busted! You win!");
    } else {
      determineWinner();
    }
    $('#stand-button').hide();
    $('#restart-button').show();
  });
  
  $('#restart-button').click(function(){
    restart();
  });
  
});