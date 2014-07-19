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

module.exports.getTessel = function () {
    return myClient;
};