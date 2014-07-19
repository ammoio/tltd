var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var q = require('q');

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
            move('forward', true);
            console.log('moving ' + command);
            setTimeout(function () {
                move('forward', false);
                console.log('stop moving ' + command);
            }, duration);
            break;
        case 'forwardRight':
            move('forward', true, 'right');
            console.log('moving ' + command);
            setTimeout(function () {
                move('forward', false, 'right');
                console.log('stop moving ' + command);
            }, duration);
            break;
        case 'forwardLeft':
            move('forward', true, 'left');
            console.log('moving ' + command);
            setTimeout(function () {
                move('forward', false, 'left');
                console.log('stop moving ' + command);
            }, duration);
            break;
        case 'reverse':
            move('reverse', true);
            console.log('moving ' + command);
            setTimeout(function () {
                move('reverse', false);
                console.log('stop moving ' + command);
            }, duration);
            break;
        case 'reverseRight':
            move('reverse', true, 'right');
            console.log('moving ' + command);
            setTimeout(function () {
                move('reverse', false, 'right');
                console.log('stop moving ' + command);
            }, duration);
            break;
        case 'reverseLeft':
            move('reverse', true, 'left');
            console.log('moving ' + command);
            setTimeout(function () {
                move('reverse', false, 'left');
                console.log('stop moving ' + command);
            }, duration);
            break;
    }
};

process.on('message', function(msg) {
    interpretCommand(msg.move);
});

process.ref();
