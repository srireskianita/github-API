const Repository = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../config/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const insertRepositories = async (userId,payload) => {
  console.log(userId);
  const repository = new Repository(db);
  const postCommand= async (userId, payload) => repository.insertRepositories(userId, payload);
  return postCommand(userId, payload);
};

const updateRepository = async (repositoryId, payload) => {
  const repository = new Repository(db);
  const putCommand = async (repositoryId, payload) => repository.updateRepository(repositoryId, payload);
  return putCommand(repositoryId, payload);
};

const deleteRepository = async (repositoryId) => {
  const repository = new Repository(db);
  const delCommand = async (repositoryId) => repository.removeRepository(repositoryId);
  return delCommand(repositoryId);
};

module.exports = {
  insertRepositories,
  updateRepository,
  deleteRepository,
};
