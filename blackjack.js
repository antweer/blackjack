$(function domReady() {
  var deck = [
    { point: 1, suit: 'hearts' },
    { point: 1, suit: 'spades' },
    { point: 1, suit: 'diamonds' },
    { point: 1, suit: 'clubs' },
    { point: 2, suit: 'hearts' },
    { point: 2, suit: 'spades' },
    { point: 2, suit: 'diamonds' },
    { point: 2, suit: 'clubs' },
    { point: 3, suit: 'hearts' },
    { point: 3, suit: 'spades' },
    { point: 3, suit: 'diamonds' },
    { point: 3, suit: 'clubs' },
    { point: 4, suit: 'hearts' },
    { point: 4, suit: 'spades' },
    { point: 4, suit: 'diamonds' },
    { point: 4, suit: 'clubs' },
    { point: 5, suit: 'hearts' },
    { point: 5, suit: 'spades' },
    { point: 5, suit: 'diamonds' },
    { point: 5, suit: 'clubs' },
    { point: 6, suit: 'hearts' },
    { point: 6, suit: 'spades' },
    { point: 6, suit: 'diamonds' },
    { point: 6, suit: 'clubs' },
    { point: 7, suit: 'hearts' },
    { point: 7, suit: 'spades' },
    { point: 7, suit: 'diamonds' },
    { point: 7, suit: 'clubs' },
    { point: 8, suit: 'hearts' },
    { point: 8, suit: 'spades' },
    { point: 8, suit: 'diamonds' },
    { point: 8, suit: 'clubs' },
    { point: 9, suit: 'hearts' },
    { point: 9, suit: 'spades' },
    { point: 9, suit: 'diamonds' },
    { point: 9, suit: 'clubs' },
    { point: 10, suit: 'hearts' },
    { point: 10, suit: 'spades' },
    { point: 10, suit: 'diamonds' },
    { point: 10, suit: 'clubs' },
    { point: 11, suit: 'hearts' },
    { point: 11, suit: 'spades' },
    { point: 11, suit: 'diamonds' },
    { point: 11, suit: 'clubs' },
    { point: 12, suit: 'hearts' },
    { point: 12, suit: 'spades' },
    { point: 12, suit: 'diamonds' },
    { point: 12, suit: 'clubs' },
    { point: 13, suit: 'hearts' },
    { point: 13, suit: 'spades' },
    { point: 13, suit: 'diamonds' },
    { point: 13, suit: 'clubs' },
  ];
  var dealerHand;
  var playerHand;
  function getImage(object){
    var pointConversion = {
      1:'ace',
      11:'jack',
      12:'queen',
      13:'king'
    };
    var point;
    if(object.point in pointConversion){
      point = pointConversion[object.point];
    }
    else{
      point = object.point
    }
    return("/images/" + point + "_of_" + object.suit + ".png");
  }
  $('#deal-button').click(function(){
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    $('#dealer-hand').append('<img src="' + getImage(dealerHand[0]) + '"/><img src="' + getImage(dealerHand[1]) + '"/>');
    $('#player-hand').append('<img src="' + getImage(playerHand[0]) + '"/><img src="' + getImage(playerHand[1]) + '"/>');
  });
  $('#hit-button').click(function(){
    $('#player-hand').append('<img src="images/2_of_diamonds.png"/>');
  });
});