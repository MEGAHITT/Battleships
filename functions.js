function randomNumberGenerator() {
  return Math.floor(Math.random() * (Number(4) - Number(0) + 1) + Number(0));
};

function display(userHitsArr, userShipsARR) {
  console.clear();
  console.log('   💥💥💥 BATTLESHIPS 💥💥💥\n    --------------------- \n')
  console.log('  CPU SHIPS        USER SHIPS\n')

  let display = '  1 2 3 4 5        1 2 3 4 5 \n'
  for (let i = 0; i < userHitsArr.length; i++) {
    display += `${i + 1} `;
    for (j = 0; j < userHitsArr[i].length; j++) {
      display += `${userHitsArr[i][j]}`;
    } display += `     ${i + 1} `;
    for (j = 0; j < userShipsARR[i].length; j++) {
      display += `${userShipsARR[i][j]}`;
    }
    display += '\n'
  }
  console.log(display);
};

function cpuShipsGenerator(arr, squareStateShip) {
  let randomY = 0;
  let randomX = 0;
  for (i = 0; i < 5; i++) {
    randomY = randomNumberGenerator();
    randomX = randomNumberGenerator();
    if (arr[randomX][randomY] !== squareStateShip) {
      arr[randomX][randomY] = squareStateShip;
    } else {
      i--;
    }
  }
};

function baseArray(squareStateWater) {
  const subArrays = 5, squares = 5;
  return Array.from({ length: subArrays }, () => Array.from({ length: squares }, () => squareStateWater));
};

function inputValidation(inputx, inputy) {

  const isNumber = (number) => /^\d+$/.test(number);

  try {
    if (!isNumber(inputx) || !isNumber(inputy)) throw 'Entry must be a number!'
    if (inputx > 4 || inputy > 4) throw 'Max value is 5!';
    return true;
  }
  catch (error) {
    console.log(`Error! ${error}`)
  }
};

function cpuGuess(cpuHitArr, userShipsArr, squareStateWater, squareStateDebris, squareStateShip, squareStateMiss) {
  cpuInputX = randomNumberGenerator();
  cpuInputY = randomNumberGenerator();


  while (cpuHitArr[cpuInputX][cpuInputY] !== squareStateWater) {
    cpuInputX = randomNumberGenerator();
    cpuInputY = randomNumberGenerator();
  }

  if (userShipsArr[cpuInputX][cpuInputY] === squareStateShip) {
    cpuHitArr[cpuInputX][cpuInputY] = squareStateDebris;
    userShipsArr[cpuInputX][cpuInputY] = squareStateDebris;
  } else {
    cpuHitArr[cpuInputX][cpuInputY] = squareStateMiss;
    userShipsArr[cpuInputX][cpuInputY] = squareStateMiss;
  }
};

function userGuess(cpuShipsArr, userHitsArr, inputx, inputy, squareStateShip, squareStateDebris, squareStateMiss) {
  if (cpuShipsArr[inputx][inputy] === squareStateShip) {
    cpuShipsArr[inputx][inputy] = squareStateDebris;
    userHitsArr[inputx][inputy] = squareStateDebris;
  } else if (userHitsArr[inputx][inputy] !== squareStateDebris) {
    userHitsArr[inputx][inputy] = squareStateMiss;
  }
};

function winCheck(x, arrayUserHits, arrayCPUHits, amounOfShips) {
  let userArrayToCheck = [].concat(...arrayUserHits);
  let cpuArrayToCheck = [].concat(...arrayCPUHits);
  const countUser = userArrayToCheck.reduce(
    (acc, y) => (x === y ? acc + 1 : acc),
    0
  );
  const countCpu = cpuArrayToCheck.reduce(
    (acc, y) => (x === y ? acc + 1 : acc),
    0
  );
  if (countUser === amounOfShips && countCpu !== amounOfShips) {
    return 'USERWIN';
  } else if (countCpu === amounOfShips && countUser !== amounOfShips) {
    return 'CPUWIN';
  } else if (countCpu === amounOfShips && countUser === amounOfShips) {
    return 'TIE';
  }
};

function hitCounter(x, arrayUserHits, arrayCPUHits) {
  let hitCountArray = [];
  let userArrayToCheck = [].concat(...arrayUserHits);
  let cpuArrayToCheck = [].concat(...arrayCPUHits);
  const hitCountUser = userArrayToCheck.reduce(
    (acc, y) => (x === y ? acc + 1 : acc),
    0
  );
  hitCountArray.push(hitCountUser);
  const hitCountCpu = cpuArrayToCheck.reduce(
    (acc, y) => (x === y ? acc + 1 : acc),
    0
  );
  hitCountArray.push(hitCountCpu);
  return hitCountArray;
};


module.exports = { display, inputValidation, cpuGuess, userGuess, randomNumberGenerator, winCheck, baseArray, cpuShipsGenerator, hitCounter };