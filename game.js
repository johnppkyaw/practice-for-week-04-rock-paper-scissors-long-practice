const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/

//DRY Principle
function printHelp() {
  for (let key in VALID_MOVES) {
    console.log(`  Type '${key}' for ${VALID_MOVES[key].name}`)
  }
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

//Single Responsibility Principle
function getWinner(move1, move2) {
  if (VALID_MOVES[move1].winsAgainst === move2) {
    return 1;
  } else if (VALID_MOVES[move2].winsAgainst === move1) {
    return -1;
  } else {
    return 0;
  }
}

//Single Responsibility Principle
function getCPUMove() {
  //get an array of keys of VALID_MOVES object
  const validMoveKeys = Object.keys(VALID_MOVES);
  //random number between 0-3 (3 exclusive);
  //random index 0-2;
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIndex];
}

//Single Responsibility Principle
function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  let result = getWinner(cmd, cpu);
  if (result === 0) { // tie
    console.log("You tie.\n");
    ties++;
  }
  else if (result === 1) { // win
    console.log("You win!\n");
    wins++;
  } else { // loss
    console.log("You lose...\n");
    losses++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp()
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]){
      //get cpu's move
      const cpu = getCPUMove();
      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
