
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const postDataLogin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataLogin(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
      : wrapper.response(res, 'success', result, 'Login User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const getUser = async (req, res) => {
  const { userId } = req;
  const getData = async () => queryHandler.getUser(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await getData());
};

const getUserById = async (req, res) => {
  const { accountNumber } = req.params;
  const getData = async () => queryHandler.getUserByAccountNum(accountNumber);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await getData());
};


const registerUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.user);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Register User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Register User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateUser= async (req, res) => {
  const payload = req.body;
  let { userId } = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.user);
  const putRequest = async(userId, result) => {
    if(result.err) {
      return result;
    }
    return commandHandler.updateUser(userId, result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed Update User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Update User', http.OK);
  };
  sendResponse(await putRequest(userId, validatePayload));
};

const removeUser = async (req, res) => {
  const userId = req.params;
  const delData = async () => {
    return commandHandler.deleteUser(userId);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed Delete User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Success Delete User', http.OK);
  };
  sendResponse(await delData());
};

module.exports = {
  postDataLogin,
  getUser,
  registerUser,
  getUserById,
  updateUser,
  removeUser
};
