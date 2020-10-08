const userHandler = require('../modules/user/handlers/api_handler');
const jwtAuth = require('../auth/jwt_auth');

const routes = (server) => {
  server.post('/api/user/register', [], userHandler.registerUser);
  server.post('/api/user', [], userHandler.postDataLogin);
  server.get('/api/user/me',jwtAuth.verifyToken,userHandler.getUser);
  server.get('/api/user/:userId',jwtAuth.verifyToken,userHandler.getUserById);
  server.put('/api/user/:userId',jwtAuth.verifyToken,userHandler.updateUser);
  server.del('/api/user/:userId',jwtAuth.verifyToken,userHandler.removeUser);
};

module.exports = {
  routes
};
