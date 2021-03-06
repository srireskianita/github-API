const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../config/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const getUser = async (userId) => {
  const getData = async () => {
    const result = await user.viewUser(userId);
    return result;
  };
  const result = await getData();
  return result;
};

const getUserById = async (userId) => {
  const getData = async () => {
    const result = await user.getUserById(userId);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getUser,
  getUserById
};