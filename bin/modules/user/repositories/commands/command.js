class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneUser(document){
    this.db.setCollection('user');
    const result = await this.db.insertOne(document);
    return result;
  }

  async updateOneUser(userId, document){
    this.db.setCollection('user');
    const result = await this.db.updateOne(userId, document);
    return result;
  }

  async deleteOneUser(userId, document){
    this.db.setCollection('user');
    const result = await this.db.removeMany(userId, document);
    return result;
  }
}

module.exports = Command;
