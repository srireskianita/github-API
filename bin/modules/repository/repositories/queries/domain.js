const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger =require('../../../../helpers/utils/logger');
const { NotFoundError } = require('../../../../helpers/error');
const { removeRepository } = require('../../handlers/api_handler');
class Repository {
  constructor(db) {
    this.query = new Query(db);
  }

  async getManyRepository() {
    const retrieveRepository = await this.query.findManyRepository();
    if (retrieveRepository.err) {
      return wrapper.error(new NotFoundError('Data Not Found'));
    }
    const data = retrieveRepository.data;
    return wrapper.data(data);
  }

  async getRepositoryById(repositoryId) {
    console.log(repositoryId)
    const repository = await this.query.findRepositoryById(repositoryId);
    if (repository.err) {
      return wrapper.error(new NotFoundError('Data Not Found'));
    }
    const { data } = repository;
    return wrapper.data(data);
  }

  async getRepositoryByUserId(userId) {
    const retrieveRepository = await this.query.findManyRepository();
    if (retrieveRepository.err) {
      return wrapper.error(new NotFoundError('Data Not Found'));
    }
    const data = retrieveRepository.data;
    let repositoryUser = [];
    for (let item of data) {
      if (item.userId == userId) {
        repositoryUser.push(item);
      }
    }
    if (repositoryUser.length == 0) {
      return wrapper.error(new NotFoundError('Data Not Found'));
    }
    return wrapper.data(repositoryUser);
  }

}

module.exports = Repository;
