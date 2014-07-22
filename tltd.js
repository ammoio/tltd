var twitchIrc = require('node-twitch-irc');
var handler = require('./handler');
var irc = require('irc');

var config = {
    nickname: 'twitchlearnstodrive',
    channels: ['#twitchlearnstodrive'],
    oauth: process.env.TWITCH_AUTH
};

var client = new twitchIrc.connect(config, function (err, event) {
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


var client = new irc.Client('bigcommerce.irc.slack.com', process.env.SLACK_NAME, {
    secure: true,
    userName: process.env.SLACK_NAME, // 'ray.ma',
    password: process.env.SLACK_PASSWORD,
    channel: ['#roadrage']
});

client.addListener('message#roadrage', function (from, message) {
    var commands = message.split(' ');
    commands.forEach(function (command) {
        handler(command);
    });
});
