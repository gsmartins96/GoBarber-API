import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // vai ser chamado imediatamento pelo sequelize
  static init(sequelize) {
    // Chamando o metodo init da classe Model
    super.init(
      {
        // Enviar as colunas do nosso BD atraves de um objeto
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Nesse caso vai ser executado antes de qualquer save de qualquer usuario
    this.addHook('beforeSave', async user => {
      // só qnd estiver criando ou editando um novo user
      if (user.password) {
        // criptografa o password do user, 8 é o num da força da cryptgrafia
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // Sempre vai retornar o model que acabou de ser inicializado
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
