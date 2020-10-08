
const validate = require('validate.js');
const mongoConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');

class DB {
  constructor(config) {
    this.config = config;
  }

  setCollection(collectionName) {
    this.collectionName = collectionName;
  }

  async getDatabase() {
    const config = this.config.replace('//', '');
    /* eslint no-useless-escape: "error" */
    const pattern = new RegExp('/([a-zA-Z0-9-]+)?');
    const dbName = pattern.exec(config);
    return dbName[1];
  }

  async findOne(parameter) {
    const ctx = 'mongodb-findOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.findOne(parameter);
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found Please Try Another Input');
      }
      return wrapper.data(recordset);

    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Error Find One Mongo ${err.message}`);
    }

  }

  async findMany(parameter) {
    const ctx = 'mongodb-findMany';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.find(parameter).toArray();
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found , Please Try Another Input');
      }
      return wrapper.data(recordset);

    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Error Find Many Mongo ${err.message}`);
    }

  }

  async insertOne(document) {
    const ctx = 'mongodb-insertOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.insertOne(document);
      if (recordset.result.n !== 1) {
        return wrapper.error('Failed Inserting Data to Database');
      }
      return wrapper.data(document);

    } catch (err) {
      logger.log(ctx, err.message, 'Error insert data in mongodb');
      return wrapper.error(`Error Insert One Mongo ${err.message}`);
    }

  }

  async removeMany(data) {
    const ctx = 'mongodb-insertMany';
    const document = data;
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.deleteMany(document);
      if (recordset.result.n < 1) {
        return wrapper.error('Failed Remove Data to Database');
      }
      return wrapper.data(document);

    } catch (err) {
      logger.log(ctx, err.message, 'Error Remove data in mongodb');
      return wrapper.error(`Error Remove Many Mongo ${err.message}`);
    }

  }
  async updateOne(parameter, updateQuery) {
    const ctx = 'mongodb-updateOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.update(parameter, updateQuery, { upsert: false });
      if (data.result.nModified >= 0) {
        const { result: { nModified } } = data;
        const recordset = await this.findOne(parameter);
        if (nModified === 1) {
          return wrapper.data(recordset.data);
        }
        return wrapper.data(recordset.data);

      }
      return wrapper.error('Failed update data');
    } catch (err) {
      logger.log(ctx, err.message, 'Error update data in mongodb');
      return wrapper.error(`Error update Mongo ${err.message}`);
    }

  }
}

module.exports = DB;
