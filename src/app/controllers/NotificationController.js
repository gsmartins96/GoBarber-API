import User from '../models/User';
import Notification from '../schema/Notification';

class NotificationController {
  // Faz o listamento das notificações
  async index(req, res) {
    // Verifica se o usuario logado é o prestador de serviço
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    // Buscar as notificações desse usuário
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  // Marcar notificação como lida
  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
