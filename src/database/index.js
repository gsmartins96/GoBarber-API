import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Aqui tenho a conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

    // Percorrer todas as models, e para cada chama o init
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
