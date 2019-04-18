
//https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
// npm run start
'use strict';
module.exports = function(app) {
  var sms = require('../controllers/smsController'),
      bodyParser = require('body-parser');

  // sms Routes
  // http://localhost:3000/smsTo/7573188659/test123
  app.post('/smsTo/:phone/:message', function(req, res) {
      var status = sms.smsTo(req, res);
      res.end(status);
  });

// route that handles all incoming repplies
  app.post('/message', function(req, res){
      console.log('message');
     var status = sms.smsInputAnalizer(req, res);
    //res.end(status);
  });
};
