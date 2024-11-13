const storedScore = localStorage.getItem('score');
if (storedScore) {
  score = JSON.parse(storedScore);
} else {
  score = { wins: 0, losses: 0, ties: 0 };
}

scoreUpdater ();

let isAutoPlaying = false;
let intervalId;

function autoPlayText () {
  buttonName = document.querySelector('.autoPlayButton').innerHTML;
  if (buttonName === 'Start Auto Play') {
    document.querySelector('.autoPlayButton').innerHTML = 'Stop Auto Play'
  } else if (buttonName === 'Stop Auto Play') {
    document.querySelector('.autoPlayButton').innerHTML = 'Start Auto Play'
  }
}

function autoPlay () {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function scoreUpdater () {
  document.querySelector('.winst').innerHTML = score.wins;
  document.querySelector('.lossest').innerHTML = score.losses;
  document.querySelector('.tiest').innerHTML = score.ties;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    return 'rock';
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose.'
    } else if (computerMove === 'paper') {
      result = 'You Win.'
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win.'
    } else if (computerMove === 'paper') {
      result = 'Tie.'
    } else if (computerMove === 'scissors') {
      result = 'You Lose.'
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You Lose.'
    } else if (computerMove === 'scissors') {
      result = 'You Win.'
    }
  }
  
  if (result === 'You Win.') {
    score.wins = score.wins + 1
  } else if (result === 'You Lose.') {
    score.losses = score.losses + 1
  } else if (result === 'Tie.') {
    score.ties = score.ties + 1
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  scoreUpdater ();

  document.querySelector('.js-result').innerHTML = result;
  
  document.querySelector('.js-choice').innerHTML = `		You - <img src="icons/${playerMove}-icon.png" class="resultIcon"> || Computer - <img src="icons/${computerMove}-icon.png" class="resultIcon">`;
}

