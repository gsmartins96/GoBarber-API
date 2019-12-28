import User from '../models/User';
import Notification from '../schema/Notification';

class NotificationController {
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
}

export default new NotificationController();
