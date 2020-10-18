// Print text 
const chalk = require('chalk');

const invitationMessage = chalk.grey('You are a dwarf who returns home after a long journey. A snowstorm is about to begin. Suddenly, around a bend, among the rocks, a cave entrance grows in front of you. Do you like went to the cave?');
const invite = chalk.grey('Tell your name traveler: ');

const questionBottomTunnel = chalk.grey('You are in the crossroads. There are three tunnels in front of you. Please choose one of them ?');
const lastChanceToGoBack = chalk.red('This is the last chance to go back are You going further (Y)? or going out ? (N)');
const noWayBackPartToOne = chalk.red('Bad luck ');
const noWayBackPartToTwo = chalk.red(' .Entrance is collapsed, there is no way back');
const frontTunnelCloseMessageFirstPart = chalk.red('You shall not pass ');
const frontTunnelCloseMessageSecondPart = chalk.red(' This cave is too dark to come in');

const mainTunnelMessage = chalk.grey('You are in small room');
const questionLeftTunnelWhenDontHaveMap = chalk.grey('Oh! What a luck! There is a ') + chalk.red('map') + chalk.grey(' on the ground.');
const questionLeftTunnelWhenHaveMap = chalk.red('Nothing to do here. Turn back ?');

const questionFrontTunnelWhenDontHaveKey = chalk.grey('Oh! What a luck! There is a ') + chalk.red('key') + chalk.grey(' on the table.');
const questionFrontTunnelWhenHaveKey = chalk.red('Nothing to do here. Turn back ?');
const goToOpenFrontTunnelMessage = chalk.grey('You are in front tunnel');

const questionMainRoomWhenHaveMap = chalk.grey('You see two doors. Do you want open the door ?');
const questionMainRoomWhenDontHaveMap = chalk.grey('You see one door. Do you want open the door ?');
const goToLargeRoomMessage = chalk.grey('You are in large room');
const tryOpenFirstDoorMainRoom = chalk.grey('You try open first door ');
const tryOpenSecondDoorMainRoom = chalk.grey('You open second door ');

const doorOneOpenRiddleSolvedMessage = chalk.red('Noting interesting here. Turn back ?');
const doorOneCloseRiddleDontSolvedMessage = chalk.grey('You see a very small room with the crystal ball. You look on it and there are appear a message. If you want to pass guess my number traveler from ') + chalk.red('1') + chalk.grey(' to ') + chalk.red('5');

const doorOneOpenMessage = chalk.green('Do you dare to open the door ?');
const doorOneCloseMessage = chalk.red('You try open the door, but door is close');
const doorOneWinAGamePartOne = chalk.green('You open the door and see a big treasure chest with golds coins. Behind chest there is a teleport that should take you home. You win the game !!! ');
const doorOneWinAGamePartTwo = chalk.green(' Congrats !!!');

const repeatGameQuestionMessage = chalk.red('Do you want run game one more time ');
const repeatGameEndMessage = chalk.white('Thanks for playing game :)');
const startFailMessage = chalk.grey('You stand front of the cave, but you decide to keep going hoping that the snowstorm will subside. You are going into the unknown. To be continued ?');
const startFailMessageTwo = chalk.grey('You turn back and decide to keep across snowstorm with hope it will subside. You are going into the unknown. To be continued ?');

const promptPuzzleGameYourNumberMessage = chalk.white('Write and check if you guessed number: ');
const yourNumberPuzzleGameMessage = chalk.cyan('Your number is: ');
const drawnNumberPuzzleGameMessage = chalk.blue('The drawn number is: ');
const winPuzzleGameMessage = chalk.green('You win ! In the crystal ball you can see torches lighting up in the one of the tunnel.');
const lostPuzzleGameMessage = chalk.red('You lost !');
const confirmRepeatPuzzleGameMessage = chalk.white('Do you want run game one more time ? ');

const errorMapPrintMessage = chalk.white('Error while printing map');

module.exports = {
    invitationMessage: invitationMessage,
    invite: invite,
    questionBottomTunnel: questionBottomTunnel,
    lastChanceToGoBack: lastChanceToGoBack,
    noWayBackPartToOne: noWayBackPartToOne,
    noWayBackPartToTwo: noWayBackPartToTwo,
    frontTunnelCloseMessageFirstPart: frontTunnelCloseMessageFirstPart,
    frontTunnelCloseMessageSecondPart: frontTunnelCloseMessageSecondPart,
    mainTunnelMessage: mainTunnelMessage,
    questionLeftTunnelWhenDontHaveMap: questionLeftTunnelWhenDontHaveMap,
    questionLeftTunnelWhenHaveMap: questionLeftTunnelWhenHaveMap,
    questionFrontTunnelWhenDontHaveKey: questionFrontTunnelWhenDontHaveKey,
    questionFrontTunnelWhenHaveKey: questionFrontTunnelWhenHaveKey,
    goToOpenFrontTunnelMessage: goToOpenFrontTunnelMessage,
    questionMainRoomWhenHaveMap: questionMainRoomWhenHaveMap,
    questionMainRoomWhenDontHaveMap: questionMainRoomWhenDontHaveMap,
    goToLargeRoomMessage: goToLargeRoomMessage,
    tryOpenFirstDoorMainRoom: tryOpenFirstDoorMainRoom,
    tryOpenSecondDoorMainRoom: tryOpenSecondDoorMainRoom,
    doorOneOpenRiddleSolvedMessage: doorOneOpenRiddleSolvedMessage,
    doorOneCloseRiddleDontSolvedMessage: doorOneCloseRiddleDontSolvedMessage,
    doorOneOpenMessage: doorOneOpenMessage,
    doorOneCloseMessage: doorOneCloseMessage,
    doorOneWinAGamePartOne: doorOneWinAGamePartOne,
    doorOneWinAGamePartTwo: doorOneWinAGamePartTwo,
    repeatGameQuestionMessage: repeatGameQuestionMessage,
    repeatGameEndMessage: repeatGameEndMessage,
    startFailMessage: startFailMessage,
    startFailMessageTwo: startFailMessageTwo,
    promptPuzzleGameYourNumberMessage: promptPuzzleGameYourNumberMessage,
    yourNumberPuzzleGameMessage: yourNumberPuzzleGameMessage,
    drawnNumberPuzzleGameMessage: drawnNumberPuzzleGameMessage,
    winPuzzleGameMessage: winPuzzleGameMessage,
    lostPuzzleGameMessage: lostPuzzleGameMessage,
    confirmRepeatPuzzleGameMessage: confirmRepeatPuzzleGameMessage,
    errorMapPrintMessage: errorMapPrintMessage
};