//Imports node
const chalk = require('chalk');
const Confirm = require('prompt-confirm');
const prompt = require('prompt-sync')({ sigint: true });
const Radio = require('prompt-radio');


//Import messages and maps
var importMap = require('./Maps.js');
var importMessages = require('./Messages')

//Variables 
var playerName = chalk.yellow('Unknown');
var haveMap = false;
var haveKey = false;
var riddleSolved = false;

//Main game
function letsPlayGame() {
    console.clear();
    askForTravelerName();
    startSpace()
}

//Start space 
function startSpace() {
    console.clear();
    const questionOne = new Confirm(importMessages.invitationMessage);
    questionOne.ask(function (enterCave) {
        if (enterCave == true) {
            bottomTunnel();
        } else {
            console.clear();
            console.log(importMessages.startFailMessage);
            repeatMainGame();
        }
    });
}

//Ask for traveler name
function askForTravelerName() {
    playerName = prompt(importMessages.invite);
}

//Bottom tunnel
function bottomTunnel() {
    console.clear();
    const questionOne = new Confirm(importMessages.lastChanceToGoBack);
    questionOne.ask(function (enterCave) {
        if (enterCave == true) {
            inTheMiddleOfTunnels();
        } else {
            console.clear();
            console.log(importMessages.startFailMessageTwo);
            repeatMainGame();
        }
    });
}

function bottomTunnelClosed() {
    console.clear();

    var radioDoorOne = new Radio({
        name: 'radioDoor',
        message: importMessages.noWayBackPartToOne + chalk.yellow(playerName) + importMessages.noWayBackPartToTwo,
        choices: ['Back'],
    });

    radioDoorOne.ask(function (doorSecondOpen) {
        inTheMiddleOfTunnels();
    });
}

//Middle tunnel
function inTheMiddleOfTunnels() {
    console.clear();
    var options = ['Left', 'Front', 'Right', 'Back'];
    if (haveMap) {
        options.push('Map');
    }

    var radioTunnel = new Radio({
        name: 'radioTunnel',
        message: (importMessages.questionBottomTunnel),
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case 'Left': {
                leftTunnel();
                break;
            }
            case 'Front': {
                frontTunnel();
                break;
            }
            case 'Back': {
                bottomTunnelClosed();
                break;
            }
            case 'Right': {
                mainRoom();
                break;
            }
            case 'Map': {
                showMap(0);
                inTheMiddleOfTunnels();
                break;
            }
            default: {
                inTheMiddleOfTunnels();
            }
        }
    });
}

//Left tunnel 
function leftTunnel() {
    console.clear();
    console.log(importMessages.mainTunnelMessage);

    var options = ['Back'];
    if (haveMap) {
        options.push('Map');
    } else {
        options.push('Pick up map');
    }

    var radioTunnel = new Radio({
        name: 'radioTunnel',
        message: haveMap ? importMessages.questionLeftTunnelWhenHaveMap : importMessages.questionLeftTunnelWhenDontHaveMap,
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case 'Back': {
                inTheMiddleOfTunnels();
                break;
            }
            case 'Pick up map': {
                haveMap = true;
                leftTunnel();
                break;
            }
            case 'Map': {
                showMap(1);
                leftTunnel();
                break;
            }
            default: {
                leftTunnel();
            }
        }
    });
}

//Front tunnel
function frontTunnel() {
    if (riddleSolved) {
        frontTunnelOpen();
    } else {
        frontTunnelClosed()
    }
}

//Front tunnel closed
function frontTunnelClosed() {
    console.clear();
    var radioTunnel = new Radio({
        name: 'radioTunnel',
        message: importMessages.frontTunnelCloseMessageFirstPart + chalk.yellow(playerName) + importMessages.frontTunnelCloseMessageSecondPart,
        choices: ['Back'],
    });
    radioTunnel.ask(function (tunnelChoice) {
        if (tunnelChoice == 'Back') {
            inTheMiddleOfTunnels();
        } else {
            frontTunnel();
        }
    });
}

//Front tunnel open
function frontTunnelOpen() {
    console.clear();
    console.log(importMessages.goToOpenFrontTunnelMessage);
    var options = ['Back'];
    if (haveMap) {
        options.push('Map');
    }

    if (!haveKey) {
        options.push('Pick up key');
    }

    var radioTunnel = new Radio({
        name: 'radioTunnel',
        message: haveKey ? importMessages.questionFrontTunnelWhenHaveKey : importMessages.questionFrontTunnelWhenDontHaveKey,
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case 'Back': {
                inTheMiddleOfTunnels();
                break;
            }
            case 'Map': {
                showMap(3);
                frontTunnel();
                break;
            }
            case 'Pick up key': {
                haveKey = true;
                frontTunnel();
                break;
            }
            default: {
                frontTunnel();
            }
        }
    });
}

// Main room 
function mainRoom() {
    console.clear();
    console.log(importMessages.goToLargeRoomMessage);

    var options = ['First door', 'Back'];
    if (haveMap) {
        options.push('Second door');
        options.push('Map');
    }

    var radioMainRoom = new Radio({
        name: 'radioDoor',
        message: haveMap ? importMessages.questionMainRoomWhenHaveMap : importMessages.questionMainRoomWhenDontHaveMap,
        choices: options,
    });

    radioMainRoom.ask(function (choiceDoor) {
        switch (choiceDoor) {
            case 'First door': {
                doorOne()
                break;
            }
            case 'Second door': {
                doorTwoHidden();
                break;
            }
            case 'Back': {
                inTheMiddleOfTunnels();
                break;
            }
            case 'Map': {
                showMap(2);
                mainRoom();
                break;
            }
            default: {
                mainRoom();
            }
        }
    });
}

// Puzzle game door second 
function puzzleGame() {
    console.clear();
    var yourNumber = parseInt(prompt(importMessages.promptPuzzleGameYourNumberMessage));
    const numberToGuess = Math.floor(Math.random() * 5) + 1;
    if (yourNumber == numberToGuess) {
        console.log(importMessages.yourNumberPuzzleGameMessage, yourNumber);
        console.log(importMessages.drawnNumberPuzzleGameMessage, numberToGuess);
        console.log(importMessages.winPuzzleGameMessage);
        riddleSolved = true
        prompt();
        mainRoom()
    } else {
        riddleSolved = false
        puzzleGameRepeat(yourNumber, numberToGuess)
    }
}

//Puzzle game door second repeat game 
function puzzleGameRepeat(yourNumber, numberToGuess) {
    console.clear();
    console.log(importMessages.yourNumberPuzzleGameMessage, yourNumber);
    console.log(importMessages.drawnNumberPuzzleGameMessage, numberToGuess);
    console.log(importMessages.lostPuzzleGameMessage);
    const playAgain = new Confirm(importMessages.confirmRepeatPuzzleGameMessage);
    playAgain.ask(function (playAgainGame) {
        if (playAgainGame == true) {
            puzzleGame();
        } else {
            mainRoom()
            riddleSolved = false;
        }
    });
}

//Door one 
function doorOne() {
    console.clear();
    console.log(importMessages.tryOpenFirstDoorMainRoom);
    var options = ['Back'];
    if (haveKey) {
        options.push('Open the door');
    }
    var radioDoorOne = new Radio({
        name: 'radioDoor',
        message: haveKey ? importMessages.doorOneOpenMessage : importMessages.doorOneCloseMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorSecondOpen) {
        console.log(importMessages.doorSecondOpen);
        if (doorSecondOpen == 'Open the door') {
            console.clear();
            console.log(chalk.green(importMessages.doorOneWinAGamePartOne + chalk.yellow(playerName) + importMessages.doorOneWinAGamePartTwo))
            repeatMainGame()
        } else {
            mainRoom();
        }
    });
}

//Door two hidden 
function doorTwoHidden() {
    console.clear();
    console.log(importMessages.tryOpenSecondDoorMainRoom);
    var options = ['Back'];
    if (!riddleSolved) {
        options.push('Guess the riddle');
    }
    var radioDoorOne = new Radio({
        name: 'radioDoor',
        message: riddleSolved ? importMessages.doorOneOpenRiddleSolvedMessage : importMessages.doorOneCloseRiddleDontSolvedMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorOneOpen) {
        console.log(importMessages.doorOneOpen);
        if (doorOneOpen == 'Guess the riddle') {
            puzzleGame()
        } else {
            mainRoom()
        }
    });
}

//Get map part one  
function getMap(expr) {
    if (importMap.mapList.length > expr) {
        return importMap.mapList[expr];
    } else {
        return importMessages.errorMapPrintMessage;
    }
}

//Get map part two
function showMap(id) {
    console.clear();
    var mapId = id + riddleSolved * 4;
    console.log(getMap(mapId));
    prompt();

}

//Repeat main game 
function repeatMainGame() {
    //console.clear();
    const playAgain = new Confirm(importMessages.repeatGameQuestionMessage + chalk.yellow(playerName) + '?');
    playAgain.ask(function (playAgainGame) {
        if (playAgainGame == true) {
            letsPlayGame();
        } else {
            console.log(importMessages.repeatGameEndMessage);
            prompt();
            console.clear();
        }
    });
}

letsPlayGame();


