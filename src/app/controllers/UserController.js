import User from '../models/User';

class UserController {
  // Vai receber os dados
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Users already exists' });
    }

    // Vai retornar somente esses dados para o nosso fron-end
    const { id, nome, email, provider } = await User.create(req.body);

    // Então vai mostrar somente isso no front-end
    return res.json({
      id,
      nome,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Users already exists' });
      }
    }

    // Dupla condição, ou seja, só irá trocar a senha se a antiga foi informada
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const { id, nome, provider } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
      provider,
    });
  }
}

export default new UserController();
