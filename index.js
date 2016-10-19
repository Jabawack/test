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

function authorize(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM users WHERE email=$1', [req.username], function(err, result) {
      done();
      if (err) {
        return next(new restify.InternalServerError('Error querying your db'));
      }

      if (result.rows.length < 1) {
        return next(new restify.UnauthorizedError());
      }

      if (req.authorization.basic.password != result.rows[0]['password']) {
        return next(new restify.UnauthorizedError());
      }

      req.authorization.user = {};
      req.authorization.user.id = result.rows[0]['id'];
      req.authorization.user.email = result.rows[0]['email'];
      req.authorization.user.username = result.rows[0]['username'];

      return next();
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