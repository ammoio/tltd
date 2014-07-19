var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var q = require('q');

var commands = [];

var portMap = {
    'forward': 'G5', //black
    'right': 'G6',  //red
    'reverse': 'G2',    //white
    'left': 'G1'    //green
};

var DEFAULT_DURATION = 100,
    PRE_TURN_DELAY = 100; //ms

// initialize all pins to off
['G1', 'G6', 'G2', 'G5'].forEach(function (pin) {
    gpio.pin[pin].write(false);
});

var move = function (forwardOrBack, leftOrRight) {
    var movePromise = q.defer(),
        turnPromise;

    if (leftOrRight) {
        turnPromise = q.defer();
        gpio.pin[portMap[leftOrRight]].write(true);
        setTimeout(function(){
            turnPromise.resolve();
        }, PRE_TURN_DELAY);
    } else {
        turnPromise = q.when();
    }

    turnPromise.then(function() {
        gpio.pin[portMap[forwardOrBack]].write(true);
        setTimeout(function() {
            gpio.pin[portMap[forwardOrBack]].write(false);
            gpio.pin[portMap[leftOrRight]].write(false);
            movePromise.resolve();
        }, DEFAULT_DURATION);
    });

    return movePromise.promise;
};

var interpretCommand = function (command, duration) {
    duration = duration | DEFAULT_DURATION;

    switch (command) {
        case 'forward':
            return move('forward');
        case 'forwardRight':
            return move('forward', 'right');
        case 'forwardLeft':
            return move('forward', 'left');
        case 'reverse':
            return move('reverse');
        case 'reverseRight':
            return move('reverse', 'right');
        case 'reverseLeft':
            return move('reverse', 'left');
    }
};

var nextMove = function () {
    interpretCommand(commands.shift())
        .then(function(){
            if(commands.length) {
                nextMove();
            }
        });
}

process.on('message', function(msg) {
    commands.push(msg.move);
    if(commands.length === 1){
        nextMove();
    }
});

process.ref();
