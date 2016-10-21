var restify = require('restify');
var pg = require('pg');
var port = process.env.PORT || 3000;

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(restify.CORS({
    origins: ['*'],
    credentials: true
}));

server.get('/db', function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    //client.query('SELECT * FROM users WHERE email=$1', [req.username], function(err, result) {
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if (err) {
          console.error(err); res.send("Error " + err);
      } else {
          res.render('pages/db', {results: result.rows} );
      }
    });
  });
}

server.get('/', function(req, res, next) {
	res.send('hello');
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
