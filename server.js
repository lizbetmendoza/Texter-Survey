// nodemon server.js will start node-monitor
// ngrok http 3000 to init the tunnel

var
  express = require('express'),
  routes = require('./routes/smsRoutes.js'),
  app = express(),
  port = process.env.PORT || 3000;

routes(app); // here is all our routes and controllers calls
app.listen(port);

console.log('texter RESTful API server started on port: ' + port);
