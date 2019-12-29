import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // vai ser chamado imediatamento pelo sequelize
  static init(sequelize) {
    // Chamando o metodo init da classe Model
    super.init(
      {
        // Enviar as colunas do nosso BD atraves de um objeto
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    // Sempre vai retornar o model que acabou de ser inicializado
    return this;
  }
}

export default File;
