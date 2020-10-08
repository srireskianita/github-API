
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const insertReporitories= async (req, res) => {
  const payload = req.body;
  let {userId} = req;
  const validatePayload = validator.isValidPayload(payload, commandModel.repository);
  const postRequest = async (userId,result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.insertRepositories(userId, result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'insert repository')
      : wrapper.response(res, 'success', result, 'insert repository', http.OK);
  };
  sendResponse(await postRequest(userId, validatePayload));
};

const getRepositories= async (req, res) => {
  const getData = async () => queryHandler.getRepository();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get all repositories', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get all repositories', http.OK);
  };
  sendResponse(await getData());
};

const getRepositoryById = async (req, res) => {
  const { repositoryId } = req.params;
  const getData = async () => queryHandler.getRepositoryById(repositoryId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get repository by id', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get repository by id', http.OK);
  };
  sendResponse(await getData());
};

const updateRepository= async (req, res) => {
  const payload = req.body;
  let { repositoryId } = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.repository);
  const putRequest = async(repositoryId, result) => {
    if(result.err) {
      return result;
    }
    return commandHandler.updateRepository(repositoryId, result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed Update Repository', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Update repository', http.OK);
  };
  sendResponse(await putRequest(repositoryId, validatePayload));
};

const removeRepository = async (req, res) => {
  const repositoryId = req.params;
  const delData = async () => {
    return commandHandler.deleteRepository(repositoryId);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed Delete repository', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Success Delete repository', http.OK);
  };
  sendResponse(await delData());
};

const getRepositoryByUserId = async (req, res) => {
    const {userId}= req;
    const getData = async () => queryHandler.getRepositoryByUserId(userId);
    const sendResponse = async (result) => {
      (result.err) ? wrapper.response(res, 'fail', result, 'Get repository by id', httpError.NOT_FOUND)
        : wrapper.response(res, 'success', result, 'Get repository by id', http.OK);
    };
    sendResponse(await getData());
  };

module.exports = {
  insertReporitories,
  getRepositories,
  getRepositoryById,
  updateRepository,
  removeRepository,
  getRepositoryByUserId
  
};
