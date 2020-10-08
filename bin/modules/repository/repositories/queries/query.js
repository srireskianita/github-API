class Query {
  constructor(db) {
    this.db = db;
  }

  async findManyRepository() {
    this.db.setCollection('repository');
    const recordset = await this.db.findMany({});
    return recordset;
  }

  async findRepositoryById(parameter){
    this.db.setCollection('repository');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}

module.exports = Query;
