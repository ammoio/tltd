var linkedList = require('linkedlist');
var tessel = require('./initializeTessel');

var sendMessage = function (direction) {
    tessel.getTessel().interface.writeProcessMessage({'move': direction});
};

var handleMessage = function (message) {
    message = message.toLowerCase();

    // Removing spaces so the user can type 'Forward Right' or w/e
    message = message.replace(/\s+/g, '');
    switch (message) {
        case 'forward':
        case 'f': {
            sendMessage('forward');
            break;
        }

        case 'forwardright':
        case 'fr':
        case 'right': {
            sendMessage('forwardRight');
            break;
        }

        case 'forwardleft':
        case 'fl':
        case 'left': {
            sendMessage('forwardLeft');
            break;
        }

        case 'reverse':
        case 'r':
        case 'back':
        case 'b': {
            sendMessage('reverse');
            break;
        }

        case 'reverseright':
        case 'rr':
        case 'backright':
        case 'br': {
            sendMessage('reverseRight');
            break;
        }

        case 'reverseleft':
        case 'rl':
        case 'backleft':
        case 'bl': {
            sendMessage('reverseLeft');
            break;
        }
    }
};

module.exports = handleMessage;
