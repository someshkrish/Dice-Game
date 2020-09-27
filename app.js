var scores, roundScore, activePlayer, gamePlaying, name1, name2;

//Calling initialization function
init();

//Adding an event Listener to roll the dice when we click the roll dice option
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //Random Number
    var dice = Math.floor(Math.random()*6)+1;

    //Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
   
    //Update the round score if the rolled number is not a 1
    if(dice !==1){
       //Add dice value to current score
       roundScore += dice;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
   
    }else {
       //pass the chance to another player
       nextPlayer();
    }
    }
    else{
        alerting();
    }
});

function alerting(){
    console.log(alert('Game Over!!! \nClick on NEW GAME...'));
}

//Updating the score to global and checking winner
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
       //Adding the current value to global score
       scores[activePlayer] += roundScore;
    
       //Update the UI
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

       //Checking Winner
       if(scores[activePlayer] >= 100){
          document.querySelector('#name-' + activePlayer).textContent='Winner!';
          document.querySelector('.dice').style.display ='none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
        }
        else{
          nextPlayer();
        }   
    }
    else{
        alerting();
    }
})

//function to toggle the next player
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//Adding Eventlistener to newgame button
//Here init is callback function called by addEventListener
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying =true;
    
    //modifying the css to hide the image of the dice in the beginning
    document.querySelector('.dice').style.display ='none';
    
    //Initializing
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

name1 = prompt("Enter Player 1 Name....")
name2 = prompt("Enter Player 2 Name....")
console.log(alert("Hello "+ name1+" and "+name2+".\n" +"GAME RULES:\n- The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn\n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn\n- The first player to reach 100 points on GLOBAL score wins the game"));
