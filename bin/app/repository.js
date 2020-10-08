const repositoryHandler = require('../modules/repository/handlers/api_handler');
const jwtAuth = require('../auth/jwt_auth');

const routes = (server) => {
  server.post('/api/repository', jwtAuth.verifyToken, repositoryHandler.insertReporitories);
  server.get('/api/repository',jwtAuth.verifyToken,repositoryHandler.getRepositories);
  server.get('/api/repository/:repositoryId',jwtAuth.verifyToken,repositoryHandler.getRepositoryById);
  server.get('/api/repositories/:userId',jwtAuth.verifyToken,repositoryHandler.getRepositoryByUserId);
  server.del('/api/repository/:repositoryId',jwtAuth.verifyToken,repositoryHandler.removeRepository);
  server.put('/api/repository/:repositoryId',jwtAuth.verifyToken,repositoryHandler.updateRepository);
};

module.exports = {
  routes
};
