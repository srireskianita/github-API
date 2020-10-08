const restify = require('restify');
const cors = require('cors');
const project = require('../../package.json');
const wrapper = require('../helpers/utils/wrapper');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const user = require('./user');


function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version,
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  this.server.use(cors());
  this.server.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.send(200);
    }
    return next();
  });
  this.server.opts('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, content-type, **Authorization**');
    res.send(200);
    return next();
  });


  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });
  // authenticated client can access the end point, place code bellow

  user.routes(this.server);
  //Initiation

  mongoConnectionPooling.init();
}

module.exports = AppServer;
