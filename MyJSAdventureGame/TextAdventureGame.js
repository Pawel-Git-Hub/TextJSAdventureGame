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

const left = 'Left'
const right = 'Right'
const front = 'Front'
const back = 'Back';
const map = 'Map';
const pickUpMap = 'Pick up map';
const pickUpKey = 'Pick up key';
const firstDoor = 'First door'
const secondDoor = 'Second door'
const openTheDoor = 'Open the door'
const guessTheRiddle = 'Guess the riddle'

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
        message: importMessages.noWayBackPartToOne + chalk.yellow(playerName) + importMessages.noWayBackPartToTwo,
        choices: [back],
    });

    radioDoorOne.ask(function (doorSecondOpen) {
        inTheMiddleOfTunnels();
    });
}

//Middle tunnel
function inTheMiddleOfTunnels() {
    console.clear();
    var options = [left, front, right, back];
    if (haveMap) {
        options.push(map);
    }

    var radioTunnel = new Radio({
        message: (importMessages.questionBottomTunnel),
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case left: {
                leftTunnel();
                break;
            }
            case front: {
                frontTunnel();
                break;
            }
            case back: {
                bottomTunnelClosed();
                break;
            }
            case right: {
                mainRoom();
                break;
            }
            case map: {
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

    var options = [back];
    if (haveMap) {
        options.push(map);
    } else {
        options.push(pickUpMap);
    }

    var radioTunnel = new Radio({
        message: haveMap ? importMessages.questionLeftTunnelWhenHaveMap : importMessages.questionLeftTunnelWhenDontHaveMap,
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case back: {
                inTheMiddleOfTunnels();
                break;
            }
            case pickUpMap: {
                haveMap = true;
                leftTunnel();
                break;
            }
            case map: {
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
        message: importMessages.frontTunnelCloseMessageFirstPart + chalk.yellow(playerName) + importMessages.frontTunnelCloseMessageSecondPart,
        choices: [back],
    });
    radioTunnel.ask(function (tunnelChoice) {
        if (tunnelChoice == back) {
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
    var options = [back];
    if (haveMap) {
        options.push(map);
    }

    if (!haveKey) {
        options.push(pickUpKey);
    }

    var radioTunnel = new Radio({
        message: haveKey ? importMessages.questionFrontTunnelWhenHaveKey : importMessages.questionFrontTunnelWhenDontHaveKey,
        choices: options,
    });

    radioTunnel.ask(function (tunnelChoice) {
        switch (tunnelChoice) {
            case back: {
                inTheMiddleOfTunnels();
                break;
            }
            case map: {
                showMap(3);
                frontTunnel();
                break;
            }
            case pickUpKey: {
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

    var options = [firstDoor, back];
    if (haveMap) {
        options.push(secondDoor);
        options.push(map);
    }

    var radioMainRoom = new Radio({
        message: haveMap ? importMessages.questionMainRoomWhenHaveMap : importMessages.questionMainRoomWhenDontHaveMap,
        choices: options,
    });

    radioMainRoom.ask(function (choiceDoor) {
        switch (choiceDoor) {
            case firstDoor: {
                doorOne()
                break;
            }
            case secondDoor: {
                doorTwoHidden();
                break;
            }
            case back: {
                inTheMiddleOfTunnels();
                break;
            }
            case map: {
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
    var options = [back];
    if (haveKey) {
        options.push(openTheDoor);
    }
    var radioDoorOne = new Radio({
        message: haveKey ? importMessages.doorOneOpenMessage : importMessages.doorOneCloseMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorSecondOpen) {
        console.log(importMessages.doorSecondOpen);
        if (doorSecondOpen == openTheDoor) {
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
    var options = [back];
    if (!riddleSolved) {
        options.push(guessTheRiddle);
    }
    var radioDoorOne = new Radio({
        message: riddleSolved ? importMessages.doorOneOpenRiddleSolvedMessage : importMessages.doorOneCloseRiddleDontSolvedMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorOneOpen) {
        console.log(importMessages.doorOneOpen);
        if (doorOneOpen == guessTheRiddle) {
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
