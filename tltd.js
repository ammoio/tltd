var irc = require('node-twitch-irc');
var handler = require('./handler');

var config = {
    nickname: 'deiniop',
    channels: ['#deiniop'],
    oauth: process.env.TWITCH_AUTH
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
        handler(message);
        console.log('['+channel+'] <' + from.username + '> ' + message);
    });
});
