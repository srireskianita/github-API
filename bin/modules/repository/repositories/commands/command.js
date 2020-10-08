class Command{

    constructor(db) {
      this.db = db;
    }
    async insertRepositories(document){
      this.db.setCollection('repository');
      const result = await this.db.insertOne(document);
      return result;
    }
  
    async updateRepository(repositoryId, document){
      this.db.setCollection('repository');
      const result = await this.db.updateOne(repositoryId, document);
      return result;
    }
  
    async deleteRepository(repositoryId, document){
      this.db.setCollection('repository');
      const result = await this.db.removeMany(repositoryId, document);
      return result;
    }
  
  }
  
  module.exports = Command;
  
  