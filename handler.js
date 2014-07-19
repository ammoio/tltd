var handleMessage = function (message) {
    message = message.toLowerCase();

    // Removing spaces so the user can type 'Forward Right' or w/e
    message = message.replace(/\s+/g, '');
    switch (message) {
        case 'forward':
        case 'f': {
            console.log("Forward");
            break;
        }

        case 'forwardright':
        case 'fr': {
            console.log("Forward Right");
            break;
        }

        case 'forwardleft':
        case 'fl': {
            console.log("Forward Left");
            break;
        }

        case 'reverse':
        case 'r': {
            console.log("Reverse");
            break;
        }

        case 'reverseright':
        case 'rr': {
            console.log("Reverse Right");
            break;
        }

        case 'reverseleft':
        case 'rl': {
            console.log("Reverse Left");
            break;
        }
    }
};

module.exports = handleMessage;
