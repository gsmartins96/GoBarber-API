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
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
