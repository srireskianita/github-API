const Repository = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../config/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const repository = new Repository(db);

const getRepository= async () => {
  const getData = async () => {
    const result = await repository.getManyRepository();
    return result;
  };
  const result = await getData();
  return result;
};

const getRepositoryById = async (repositoryId) => {
  const getData = async (repositoryId) => {
    const result = await repository.getRepositoryById({repositoryId});
    return result;
  };
  const result = await getData(repositoryId);
  return result;
};

const getRepositoryByUserId = async (userId) => {
  const getData = async (userId) => {
    const result = await repository.getRepositoryByUserId(userId);
    return result;
  };
  const result = await getData(userId);
  return result;
};

module.exports = {
  getRepository,
  getRepositoryById,
  getRepositoryByUserId
};
