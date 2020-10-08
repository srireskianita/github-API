
const jwt = require('jsonwebtoken');
const queryUser = require('../modules/user/repositories/queries/query_handler');
const wrapper = require('../helpers/utils/wrapper');
const { ERROR } = require('../helpers/http-status/status_code');
const { UnauthorizedError, ForbiddenError } = require('../helpers/error');

const generateToken = async (payload) => {
  const token = jwt.sign(payload, 'secret');
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };
  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError('Invalid token!');
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, 'secret');
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError('Access token expired!');
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.UNAUTHORIZED);
    }
    result.err = new UnauthorizedError('Token is not valid!');
    return wrapper.response(res, 'fail', result, 'Token is not valid!', ERROR.UNAUTHORIZED);
  }
  const userId = decodedToken.sub;
  const user = await queryUser.getUser(userId);
  if (user.err) {
    result.err = new ForbiddenError('Invalid token!');
    wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  }
  req.userId = userId;
  next();
};

module.exports = {
  generateToken,
  verifyToken
};
