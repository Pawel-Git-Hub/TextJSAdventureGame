// Print text 
import chalk from 'chalk';
const { grey, red, green, white, cyan, blue } = chalk;

const invitationMessage = grey('You are a dwarf who returns home after a long journey. A snowstorm is about to begin. Suddenly, around a bend, among the rocks, a cave entrance grows in front of you. Do you like went to the cave?');
const invite = grey('Tell your name traveler: ');

const questionBottomTunnel = grey('You are in the crossroads. There are three tunnels in front of you. Please choose one of them ?');
const lastChanceToGoBack = red('This is the last chance to go back are You going further (Y)? or going out ? (N)');
const noWayBackPartToOne = red('Bad luck ');
const noWayBackPartToTwo = red(' .Entrance is collapsed, there is no way back');
const frontTunnelCloseMessageFirstPart = red('You shall not pass ');
const frontTunnelCloseMessageSecondPart = red(' This cave is too dark to come in');

const mainTunnelMessage = grey('You are in small room');
const questionLeftTunnelWhenDontHaveMap = grey('Oh! What a luck! There is a ') + red('map') + grey(' on the ground.');
const questionLeftTunnelWhenHaveMap = red('Nothing to do here. Turn back ?');

const questionFrontTunnelWhenDontHaveKey = grey('Oh! What a luck! There is a ') + red('key') + grey(' on the table.');
const questionFrontTunnelWhenHaveKey = red('Nothing to do here. Turn back ?');
const goToOpenFrontTunnelMessage = grey('You are in front tunnel');

const questionMainRoomWhenHaveMap = grey('You see two doors. Do you want open the door ?');
const questionMainRoomWhenDontHaveMap = grey('You see one door. Do you want open the door ?');
const goToLargeRoomMessage = grey('You are in large room');
const tryOpenFirstDoorMainRoom = grey('You try open first door ');
const tryOpenSecondDoorMainRoom = grey('You open second door ');

const doorOneOpenRiddleSolvedMessage = red('Noting interesting here. Turn back ?');
const doorOneCloseRiddleDontSolvedMessage = grey('You see a very small room with the crystal ball. You look on it and there are appear a message. If you want to pass guess my number traveler from ') + red('1') + grey(' to ') + red('5');

const doorOneOpenMessage = green('Do you dare to open the door ?');
const doorOneCloseMessage = red('You try open the door, but door is close');
const doorOneWinAGamePartOne = green('You open the door and see a big treasure chest with golds coins. Behind chest there is a teleport that should take you home. You win the game !!! ');
const doorOneWinAGamePartTwo = green(' Congrats !!!');

const repeatGameQuestionMessage = red('Do you want run game one more time ');
const repeatGameEndMessage = white('Thanks for playing game :)');
const startFailMessage = grey('You stand front of the cave, but you decide to keep going hoping that the snowstorm will subside. You are going into the unknown. To be continued ?');
const startFailMessageTwo = grey('You turn back and decide to keep across snowstorm with hope it will subside. You are going into the unknown. To be continued ?');

const promptPuzzleGameYourNumberMessage = white('Write and check if you guessed number: ');
const yourNumberPuzzleGameMessage = cyan('Your number is: ');
const drawnNumberPuzzleGameMessage = blue('The drawn number is: ');
const winPuzzleGameMessage = green('You win ! In the crystal ball you can see torches lighting up in the one of the tunnel.');
const lostPuzzleGameMessage = red('You lost !');
const confirmRepeatPuzzleGameMessage = white('Do you want run game one more time ? ');

const errorMapPrintMessage = white('Error while printing map');

export { invitationMessage, startFailMessage, invite, lastChanceToGoBack, startFailMessageTwo, noWayBackPartToOne, noWayBackPartToTwo, questionBottomTunnel, mainTunnelMessage, questionLeftTunnelWhenHaveMap, questionLeftTunnelWhenDontHaveMap, frontTunnelCloseMessageFirstPart, frontTunnelCloseMessageSecondPart, goToOpenFrontTunnelMessage, questionFrontTunnelWhenHaveKey, questionFrontTunnelWhenDontHaveKey, goToLargeRoomMessage, questionMainRoomWhenHaveMap, questionMainRoomWhenDontHaveMap, promptPuzzleGameYourNumberMessage, yourNumberPuzzleGameMessage, drawnNumberPuzzleGameMessage, winPuzzleGameMessage, lostPuzzleGameMessage, confirmRepeatPuzzleGameMessage, tryOpenFirstDoorMainRoom, doorOneOpenMessage, doorOneCloseMessage, doorOneWinAGamePartOne, doorOneWinAGamePartTwo, tryOpenSecondDoorMainRoom, doorOneOpenRiddleSolvedMessage, doorOneCloseRiddleDontSolvedMessage, errorMapPrintMessage, repeatGameQuestionMessage, repeatGameEndMessage }