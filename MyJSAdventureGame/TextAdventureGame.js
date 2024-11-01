//Imports node
import chalk from 'chalk';
const { yellow, green } = chalk;
import Confirm from 'prompt-confirm';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });
import Radio from 'prompt-radio';

//Import messages and maps
import { mapList } from './Maps.js';
import { invitationMessage, startFailMessage, invite, lastChanceToGoBack, startFailMessageTwo, noWayBackPartToOne, noWayBackPartToTwo, questionBottomTunnel, mainTunnelMessage, questionLeftTunnelWhenHaveMap, questionLeftTunnelWhenDontHaveMap, frontTunnelCloseMessageFirstPart, frontTunnelCloseMessageSecondPart, goToOpenFrontTunnelMessage, questionFrontTunnelWhenHaveKey, questionFrontTunnelWhenDontHaveKey, goToLargeRoomMessage, questionMainRoomWhenHaveMap, questionMainRoomWhenDontHaveMap, promptPuzzleGameYourNumberMessage, yourNumberPuzzleGameMessage, drawnNumberPuzzleGameMessage, winPuzzleGameMessage, lostPuzzleGameMessage, confirmRepeatPuzzleGameMessage, tryOpenFirstDoorMainRoom, doorOneOpenMessage, doorOneCloseMessage, doorOneWinAGamePartOne, doorOneWinAGamePartTwo, tryOpenSecondDoorMainRoom, doorOneOpenRiddleSolvedMessage, doorOneCloseRiddleDontSolvedMessage, errorMapPrintMessage, repeatGameQuestionMessage, repeatGameEndMessage } from './Messages.js';

//Variables 
let playerName = yellow('Unknown');
let haveMap = false;
let haveKey = false;
let riddleSolved = false;

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
    const questionOne = new Confirm(invitationMessage);
    questionOne.ask(function (enterCave) {
        if (enterCave == true) {
            bottomTunnel();
        } else {
            console.clear();
            console.log(startFailMessage);
            repeatMainGame();
        }
    });
}

//Ask for traveler name
function askForTravelerName() {
    playerName = prompt(invite);
}

//Bottom tunnel
function bottomTunnel() {
    console.clear();
    const questionOne = new Confirm(lastChanceToGoBack);
    questionOne.ask(function (enterCave) {
        if (enterCave == true) {
            inTheMiddleOfTunnels();
        } else {
            console.clear();
            console.log(startFailMessageTwo);
            repeatMainGame();
        }
    });
}

function bottomTunnelClosed() {
    console.clear();

    let radioDoorOne = new Radio({
        message: noWayBackPartToOne + yellow(playerName) + noWayBackPartToTwo,
        choices: [back],
    });

    radioDoorOne.ask(function (doorSecondOpen) {
        inTheMiddleOfTunnels();
    });
}

//Middle tunnel
function inTheMiddleOfTunnels() {
    console.clear();
    let options = [left, front, right, back];
    if (haveMap) {
        options.push(map);
    }

    let radioTunnel = new Radio({
        message: (questionBottomTunnel),
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
    console.log(mainTunnelMessage);

    let options = [back];
    if (haveMap) {
        options.push(map);
    } else {
        options.push(pickUpMap);
    }

    let radioTunnel = new Radio({
        message: haveMap ? questionLeftTunnelWhenHaveMap : questionLeftTunnelWhenDontHaveMap,
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
    let radioTunnel = new Radio({
        message: frontTunnelCloseMessageFirstPart + yellow(playerName) + frontTunnelCloseMessageSecondPart,
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
    console.log(goToOpenFrontTunnelMessage);
    let options = [back];
    if (haveMap) {
        options.push(map);
    }

    if (!haveKey) {
        options.push(pickUpKey);
    }

    let radioTunnel = new Radio({
        message: haveKey ? questionFrontTunnelWhenHaveKey : questionFrontTunnelWhenDontHaveKey,
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
    console.log(goToLargeRoomMessage);

    let options = [firstDoor, back];
    if (haveMap) {
        options.push(secondDoor);
        options.push(map);
    }

    let radioMainRoom = new Radio({
        message: haveMap ? questionMainRoomWhenHaveMap : questionMainRoomWhenDontHaveMap,
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
    let yourNumber = parseInt(prompt(promptPuzzleGameYourNumberMessage));
    const numberToGuess = Math.floor(Math.random() * 5) + 1;
    if (yourNumber == numberToGuess) {
        console.log(yourNumberPuzzleGameMessage, yourNumber);
        console.log(drawnNumberPuzzleGameMessage, numberToGuess);
        console.log(winPuzzleGameMessage);
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
    console.log(yourNumberPuzzleGameMessage, yourNumber);
    console.log(drawnNumberPuzzleGameMessage, numberToGuess);
    console.log(lostPuzzleGameMessage);
    const playAgain = new Confirm(confirmRepeatPuzzleGameMessage);
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
    console.log(tryOpenFirstDoorMainRoom);
    let options = [back];
    if (haveKey) {
        options.push(openTheDoor);
    }
    let radioDoorOne = new Radio({
        message: haveKey ? doorOneOpenMessage : doorOneCloseMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorSecondOpen) {
        console.log(doorSecondOpen);
        if (doorSecondOpen == openTheDoor) {
            console.clear();
            console.log(green(doorOneWinAGamePartOne + yellow(playerName) + doorOneWinAGamePartTwo))
            repeatMainGame()
        } else {
            mainRoom();
        }
    });
}

//Door two hidden 
function doorTwoHidden() {
    console.clear();
    console.log(tryOpenSecondDoorMainRoom);
    let options = [back];
    if (!riddleSolved) {
        options.push(guessTheRiddle);
    }
    let radioDoorOne = new Radio({
        message: riddleSolved ? doorOneOpenRiddleSolvedMessage : doorOneCloseRiddleDontSolvedMessage,
        choices: options,
    });
    radioDoorOne.ask(function (doorOneOpen) {
        console.log(doorOneOpen);
        if (doorOneOpen == guessTheRiddle) {
            puzzleGame()
        } else {
            mainRoom()
        }
    });
}

//Get map part one  
function getMap(expr) {
    if (mapList.length > expr) {
        return mapList[expr];
    } else {
        return errorMapPrintMessage;
    }
}

//Get map part two
function showMap(id) {
    console.clear();
    let mapId = id + riddleSolved * 4;
    console.log(getMap(mapId));
    prompt();

}

//Repeat main game 
function repeatMainGame() {
    //console.clear();
    const playAgain = new Confirm(repeatGameQuestionMessage + yellow(playerName) + '?');
    playAgain.ask(function (playAgainGame) {
        if (playAgainGame == true) {
            letsPlayGame();
        } else {
            console.log(repeatGameEndMessage);
            prompt();
            console.clear();
        }
    });
}

letsPlayGame();
