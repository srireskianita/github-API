
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const uuidv4 = require('uuid/v4');

const { NotFoundError, UnauthorizedError, ConflictError, BadRequestError } = require('../../../../helpers/error');

const algorithm = 'aes-192-gcm';
const secretKey = 'secret';

class User {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async generateCredential(payload) {
    const ctx = 'domain-generateCredential';
    const { username, password } = payload;
    const user = await this.query.findOneUser({ username });
    if (user.err) {
      logger.log(ctx, user.err, 'user not found');
      return wrapper.error(new NotFoundError('user not found'));
    }
    const userId = user.data._id;
    const userName = user.data.username;
    const pass= user.data.password;
    if (username !== userName || password !== pass) {
      return wrapper.error(new UnauthorizedError('Password invalid!'));
    }
    const data = {
      username,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);
    return wrapper.data(token);
  }

  async register(payload) {
    console.log(payload)
    const { username, password,emailAddress, isActive } = payload;
    payload.userId = uuidv4();
    const user = await this.query.findOneUser({ username });

    if (user.data) {
      return wrapper.error(new ConflictError('user already exist'));
    }
    const data = {
      userId: payload.userId,
      username,
      password,
      emailAddress,
      isActive
    };
    const { data:result } = await this.command.insertOneUser(data);
    return wrapper.data(result);
  }

  async updateOneUser(userId, payload) {
    const ctx = 'domain-updateOneUser';
    payload.updatedAt = new Date();
    payload.updatedBy = '';

    const result = await this.command.updateOneUser(
      { userId },
      {
        $set: payload
      });
    if (result.err) {
      logger.log(ctx, result.err, 'error while update data');
      return wrapper.error(new BadRequestError('Failed Update data'));
    }
    return wrapper.data(result).data;
  }

  async removeOneUser(userId) {
    const ctx = 'domain-removeOneUser';
    const result = await this.command.deleteOneUser(userId);
    if (result.err) {
      logger.log(ctx, result.err, 'error while delete data user');
      return wrapper.error(new BadRequestError('failed delete user'));
    }
    return wrapper.data(null);
  }


}

module.exports = User;
