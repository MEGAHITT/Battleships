const functions = require('./functions.js')
const display = functions.display;
const inputValidation = functions.inputValidation;
const cpuGuess = functions.cpuGuess;
const userGuess = functions.userGuess;
const baseArray = functions.baseArray;
const cpuShipsGenerator = functions.cpuShipsGenerator;
const winCheck = functions.winCheck;
const hitCounter = functions.hitCounter;


const stateShip = '🚢';
const stateWater = '🌊';
const stateDebris = '💥';
const stateMiss = '💦';
const shipAmount = 5;


while (true) {
  
  console.clear();
  prompt('\n\n\n\n\n  PRESS ANY KEY TO START');

  let userInputX = '';
  let userInputY = '';
  let shipsAdded = 0;

  let cpuInputArray = baseArray(stateWater);
  const shipsCPU = baseArray(stateWater);

  let userInputArray = baseArray(stateWater);
  const shipsUser = baseArray(stateWater);

  cpuShipsGenerator(shipsCPU, stateShip);
  display(userInputArray, shipsUser);

  console.log(`Add ${shipAmount - shipsAdded} ships to you board`);

  while (true) {

    while (shipsAdded !== shipAmount) {

      userInputX = (prompt('Enter coordinate Y: ')) - 1;
      userInputY = (prompt('Enter coordinate X: ')) - 1;

      if (inputValidation(userInputX, userInputY) && shipsUser[userInputX][userInputY] === stateWater) {

        shipsUser[userInputX][userInputY] = stateShip;
        shipsAdded++;
        console.clear();
        display(userInputArray, shipsUser);
        console.log(`Add ${shipAmount - shipsAdded} ships to you board`);

      } else {

        console.clear();
        display(userInputArray, shipsUser);
        console.log(`Add ${shipAmount - shipsAdded} ships to you board`);

      }
    }

    display(userInputArray, shipsUser);

    while (true) {

      display(userInputArray, shipsUser);
      console.log(`USER HITS: ${hitCounter(stateDebris, userInputArray, shipsUser)[0]}     CPU HITS: ${hitCounter(stateDebris, userInputArray, shipsUser)[1]}`);
      console.log('\n     ⚔️ ⚔️ ⚔️  BATTLE ⚔️ ⚔️ ⚔️\n');
      userInputX = (prompt('Enter coordinate Y: ')) - 1;
      userInputY = (prompt('Enter coordinate X: ')) - 1;

      if (inputValidation(userInputX, userInputY)) {

        userGuess(shipsCPU, userInputArray, userInputX, userInputY, stateShip, stateDebris, stateMiss);
        break;

      }

      console.clear();

    }


    cpuGuess(cpuInputArray, shipsUser, stateWater, stateDebris, stateShip, stateMiss);

    if (winCheck(stateDebris, userInputArray, shipsUser, shipAmount) === 'USERWIN') {

      console.clear();
      display(userInputArray, shipsUser);
      console.log('     YOU WON THE BATTLE!!');
      break;

    } else if (winCheck(stateDebris, userInputArray, shipsUser, shipAmount) === 'CPUWIN') {

      console.clear();
      display(userInputArray, shipsUser);
      console.log('     YOU LOST THE BATTLE!!');
      break;

    } else if (winCheck(stateDebris, userInputArray, shipsUser, shipAmount) === 'TIE') {

      console.clear();
      display(userInputArray, shipsUser);
      console.log('        BATTLE DRAWN!!');
      break;

    }

    console.clear();

  }
}