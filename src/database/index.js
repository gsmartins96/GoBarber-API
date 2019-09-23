import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Aqui tenho a conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

    // Percorrer todas as models, e para cada chama o init
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
