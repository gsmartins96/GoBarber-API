import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  // vai ser chamado imediatamento pelo sequelize
  static init(sequelize) {
    // Chamando o metodo init da classe Model
    super.init(
      {
        // Enviar as colunas do nosso BD atraves de um objeto
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    // Sempre vai retornar o model que acabou de ser inicializado
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
