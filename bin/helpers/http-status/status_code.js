const ERROR = {
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404,
    'INTERNAL_ERROR': 500,
    'CONFLICT': 409,
    'EXPECTATION_FAILED': 417,
    'FORBIDDEN': 403,
    'UNAUTHORIZED': 401,
    'SERVICE_UNAVAILABLE': 503,
    'GATEWAY_TIMEOUT': 504
  };
  
  const SUCCESS = {
    'OK': 200,
    'CREATED': 201
  };
  
  module.exports = {
    ERROR,
    SUCCESS
  };
  