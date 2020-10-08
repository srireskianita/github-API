const Command = require('./command');
const Query = require('../queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const uuidv4 = require('uuid/v4');
const { BadRequestError, NotImplement, InternalServerError, NotFoundError } = require('../../../../helpers/error');

class Repository {

  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async insertRepositories(userId, payload) {
    const ctx = 'domain-insertOneRepositories';
    const { name, description, visibility } = payload;
    payload.repositoryId = uuidv4();
    const data = {
      repositoryId: payload.repositoryId,
      name,
      description,
      visibility,
      userId,
      createdAt: new Date(),
      createdBy: '',
    };
    const { data: result } = await this.command.insertRepositories(data);
    if (result.err) {
      logger.log(ctx, result.err, 'error while insert data');
      return wrapper.error(new BadRequestError('Failed insert data'));
    }
    return wrapper.data(result);
  }

  async updateRepository(repositoryId, payload) {
    const ctx = 'domain-updateRepository';
    payload.updatedAt = new Date();
    payload.updatedBy = '';
    const repository = await this.query.findRepositoryById({ repositoryId });
    if (repository.err) {
      return wrapper.error(new NotFoundError('Repository Not Found'));
    }
    const result = await this.command.updateRepository(
      { repositoryId },
      {
        $set: payload
      });
    if (result.err) {
      logger.log(ctx, result.err, 'error while update repository');
      return wrapper.error(new BadRequestError('Failed Update repository'));
    }

    return wrapper.data(result).data;
  }

  async removeRepository(repositoryId) {
    const ctx = 'domain-removeOneRepository';
    if (!repositoryId) {
      logger.log(ctx, 'repositoryId', 'error delete repository cause id does not supply');
      return wrapper.error(new NotImplement('repository id Must Be filled !'));
    }
    const result = await this.command.deleteRepository(repositoryId);
    if (result.err) {
      logger.log(ctx, result.err, 'error while delete data repository');
      return wrapper.error(new InternalServerError('failed delete repository'));
    }
    return wrapper.data(null);
  }
}

module.exports = Repository;
