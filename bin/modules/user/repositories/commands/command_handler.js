
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../config/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const postDataLogin = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.register(payload);
  return postCommand(payload);
};

const updateUser= async (userId,payload) => {
  const user = new User(db);
  const putCommand = async (userId,payload) => user.updateOneUser(userId,payload);
  return putCommand(userId,payload);
};

const deleteUser = async (userId) => {
  const user= new User(db);
  const delCommand = async (userId) => user.removeOneUser(userId);
  return delCommand(userId);
};

module.exports = {
  postDataLogin,
  registerUser,
  updateUser,
  deleteUser
};
