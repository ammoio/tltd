var irc = require('node-twitch-irc');

var config = {
    nickname: 'deiniop',
    channels: ['#deiniop'],
    oauth: process.env.TWITCH_AUTH
};

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

var client = new irc.connect(config, function (err, event) {
    if (err) {
        console.log(err);
        return;
    }
    // "Connected" event.
    event.on('connected', function () {
        console.log('CONNECTED');
    });

    // "Disconnected" event.
    event.on('disconnected', function (reason) {
        console.log('DISCONNECTED: ' + reason);
    });

    // "Join" event.
    event.on("join", function (channel, username) {
        console.log(username + ' joined ' + channel);
    });

    // "Chat" event.
    event.on("chat", function (from, channel, message) {
        handleMessage(message);
        console.log('['+channel+'] <' + from.username + '> ' + message);
    });
});
