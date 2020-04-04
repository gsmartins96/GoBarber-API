import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  // Vai receber os dados
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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

    await user.update(req.body);

    const { id, nome, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      nome,
      email,
      avatar,
    });
  }
}

export default new UserController();
