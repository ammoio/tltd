var tessel = require('tessel');
var script =  '/tessel.js';
var myClient;

// creating tessel instance
tessel.findTessel(null, true, function(err, client) {
    if (err) throw err;
    client.run(__dirname + script, ['tessel', script], {
          single: true,
        }, function () {
          client.stdout.resume();
          client.stdout.pipe(process.stdout);
          client.stderr.resume();
          client.stderr.pipe(process.stderr);
          console.info('Running script...');

          myClient = client;

          // Stop on Ctrl+C.
          process.on('SIGINT', function() {
            setTimeout(function () {
              logs.info('Script aborted');
              process.exit(131);
            }, 200);
            client.stop();
          });
 
          client.once('script-stop', function (code) {
            client.close(function () {
              process.exit(code);
            });
          });
    });
});

var sendMessage = function (direction) {
    myClient.interface.writeProcessMessage({'move': direction});
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
        case 'fr': {
            sendMessage('forwardRight');
            break;
        }

        case 'forwardleft':
        case 'fl': {
            sendMessage('forwardLeft');
            break;
        }

        case 'reverse':
        case 'r': {
            sendMessage('reverse');
            break;
        }

        case 'reverseright':
        case 'rr': {
            sendMessage('reverseRight');
            break;
        }

        case 'reverseleft':
        case 'rl': {
            sendMessage('reverseLeft');
            break;
        }
    }
};

module.exports = handleMessage;
