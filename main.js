/*----- constants -----*/
const playerColor = {
    '1': 'blue',
    '-1': 'red',
    'null': 'lightgreen'
  };

  const playerSymbol = {
      '1': 'X',
      '-1': 'O',
      'null': ''
  };
  
  const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ]
  /*----- app's state (variables) -----*/
  let board, winner, turn;
  
  /*----- cached element references -----*/
  const squares = document.querySelectorAll('td div');
  const message = document.querySelector('h1');
  
  /*----- event listeners -----*/
  document.querySelector('table').addEventListener('click', handleMove);
  document.querySelector('button').addEventListener('click', init);
  
  
  /*----- functions -----*/
  init();
  
  function handleMove(evt) {
      // obtain index of square
    const idx = parseInt(evt.target.id.replace('sq', ''));
  //  console.log(idx);
    if (board[idx] || winner) return;
  
    board[idx] = turn;
  
    // Toggle player turn
    turn *= -1;
    
    winner = getWinner();
    
    render();
  }
  
  function getWinner() {
    for (let i=0; i < winStates.length; i++) {
      if (Math.abs(board[winStates[i][0]] + board[winStates[i][1]] + board[winStates[i][2]]) === 3) return board[winStates[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
  }
  
  function render() {
     board.forEach(function(sq, idx) {
        squares[idx].style.background = playerColor[sq];
        squares[idx].innerHTML = playerSymbol[sq];
      });
      if (winner === 'T') {
        message.innerHTML = 'Tie Game!';
      } else if (winner) {
        message.innerHTML = `${playerColor[winner].toUpperCase()} Wins!`;
      } else {
        message.innerHTML = `${playerColor[turn].toUpperCase()}'s Turn`;
      }
  }
  
  function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
  }