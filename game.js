document.addEventListener('DOMContentLoaded', init);

//VARIABLES
let numSpins = 0;

let randColor = 'none';
let randFinger = 'none';

let curKeysPressed = [];
let curFingersActive = [];

let score = 0;

let numReds = 0;
let numBlues = 0;
let numYellows = 0;
let numGreens = 0;

const fingerNames = ['index', 'middle', 'ring', 'pinky'];
const colors = ['red', 'blue', 'yellow', 'green'];

let currentFinger = 'none'; //current finger being moved

const dots = [
    //first row
    { key: 'q', color: 'red', finger: 'none' },
    { key: 'w', color: 'blue', finger: 'none' },
    { key: 'e', color: 'yellow', finger: 'none' },
    { key: 'r', color: 'green', finger: 'none' },
    //second row
    { key: 'a', color: 'red', finger: 'none' },
    { key: 's', color: 'blue', finger: 'none' },
    { key: 'd', color: 'yellow', finger: 'none' },
    { key: 'f', color: 'green', finger: 'none' },
    //third row
    { key: 'z', color: 'red', finger: 'none' },
    { key: 'x', color: 'blue', finger: 'none' },
    { key: 'c', color: 'yellow', finger: 'none' },
    { key: 'v', color: 'green', finger: 'none' },
];

function init() {
    window.addEventListener('keydown', (event) => {
        //highlight when button is pressed down
        document
            .getElementById(event.key)
            .setAttribute('style', 'border: 5px solid black; opacity: 100%');

        //stop if this key is already pressed down
        if (!curKeysPressed.includes(event.key)) {
            console.log(curKeysPressed);

            //verify the event
            verifyKeyDown(event);
        }
    });

    window.addEventListener('keyup', (event) => {
        //remove highlight when button is let go
        document
            .getElementById(event.key)
            .setAttribute('style', 'border: 5px solid grey; opacity: 70%;');

        //remove the current key from the list of keys being pressed
        curKeysPressed.splice(curKeysPressed.indexOf(event.key), 1);
    });

    //create spin function
    document.getElementById('spinButton').addEventListener('click', spin);
}

//check to see if the color matches with the random spin, basically if the correct color has been pressed down
function verifyKeyDown(event) {
    let colorSearched = findColor(dots, event.key);
    if (colorSearched === randColor) {
        let recordFinger = dots.find(function (o) {
            return o.key === event.key;
        });
        recordFinger.finger = currentFinger;
        //now check if the number of that color searched is actually matching how many is supposed to be pressed
        let tempColor = dots.filter(
            (dot) => dot.finger != 'none' && dot.color === colorSearched,
        );

        switch (colorSearched) {
            case 'red':
                if (tempColor.length != numReds) {
                    gameOver(
                        'hey, we have the wrong number of ' +
                            colorSearched +
                            ' pressed!',
                    );
                    console.log(
                        tempColor.length +
                            '<- length of tempcolor ' +
                            numReds +
                            '<- num color',
                    );
                } else {
                    score = numSpins;
                }
                break;
            case 'blue':
                if (tempColor.length != numBlues) {
                    gameOver(
                        'hey, we have the wrong number of ' +
                            colorSearched +
                            ' pressed!',
                    );
                    console.log(
                        tempColor.length +
                            '<- length of tempcolor ' +
                            numBlues +
                            '<- num color',
                    );
                } else {
                    score = numSpins;
                }
                break;
            case 'yellow':
                if (tempColor.length != numYellows) {
                    gameOver(
                        'hey, we have the wrong number of ' +
                            colorSearched +
                            ' pressed!',
                    );
                    console.log(
                        tempColor.length +
                            '<- length of tempcolor ' +
                            numYellows +
                            '<- num color',
                    );
                } else {
                    score = numSpins;
                }
                break;
            case 'green':
                if (tempColor.length != numGreens) {
                    gameOver(
                        'hey, we have the wrong number of ' +
                            colorSearched +
                            ' pressed!',
                    );
                    console.log(
                        tempColor.length +
                            '<- length of tempcolor ' +
                            numGreens +
                            '<- num color',
                    );
                } else {
                    score = numSpins;
                }
                break;
        }
    } else {
        gameOver('wrong color pressed!!');
    }

    //record the key as pressed
    curKeysPressed.push(event.key);
}


function updateColorCount(color, increment) {
    switch (color) {
        case 'red':
            numReds += increment;
            break;
        case 'blue':
            numBlues += increment;
            break;
        case 'yellow':
            numYellows += increment;
            break;
        case 'green':
            numGreens += increment;
            break;
    }
}

function spin() {
    numSpins++;

    validateColorCount();

    //generate random index of finger to color
    var randomFingerIndex = Math.floor(Math.random() * 4);
    var randomColorIndex = Math.floor(Math.random() * 4);

    //set the random color and finger
    randColor = colors[randomColorIndex];
    randFinger = fingerNames[randomFingerIndex];

    currentFinger = randFinger;

    //if the finger is already active, figure out where and reset
    if (curFingersActive.includes(randFinger)) {
        console.log('finger already active in list');
        let obj = dots.find(function (o) {
            return o.finger === randFinger;
        });
        obj.finger = 'none'; //reset
        //depending on where the finger was at before, remove the color count expected
        updateColorCount(obj.color, -1);
    }

    //append current finger to list of fingers active if not already there
    if (!curFingersActive.includes(randFinger)) {
        curFingersActive.push(randFinger);
    }

    //add color count
    updateColorCount(randColor, 1);

    //output results
    document.getElementById('output').innerHTML = randFinger + ' ' + randColor;
    document.getElementById('scoreOutput').innerHTML = 'Score: ' + score;
}

//make sure count is correct during spin button press
function validateColorCount() {
    let sum = numBlues + numGreens + numReds + numYellows;
    //prettier-ignore
    if (sum != curFingersActive.length || (curFingersActive.length === 0 && numSpins === 0)) {
        gameOver('incorrect amount of fingers on board!');
    }
}

//reset styles and score. also object in the arraylist and numSpins
function reset() {
    console.log('reset initiated');
    score = 0;
    document.getElementById('scoreOutput').innerHTML = 'Score: ' + score;
    document.getElementById('output').innerHTML = 'Click "Spin!" to start!';

    dots.forEach((element) => {
        document
            .getElementById(element.key)
            .setAttribute('style', 'border: 5px solid grey; opacity: 70%;');
    });

    //reset values
    dots.forEach((dot) => {
        dot.finger = 'none';
    });

    numSpins = 0;
    randColor = 'none';
    randFinger = 'none';
    curKeysPressed = [];

    curFingersActive = [];
    score = 0;
    numReds = 0;
    numBlues = 0;
    numYellows = 0;
    numGreens = 0;

    currentFinger = 'none'; //current finger being moved
}



function gameOver(penaltyMessage) {
    alert(penaltyMessage + '\nScore: ' + score);
    setTimeout(() => {
        reset();
    }, 0);
}

function findColor(array, key) {
    return array.find(function (o) {
        return o.key === key;
    }).color;
}
