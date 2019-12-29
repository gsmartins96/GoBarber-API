import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // Na hora de passar o usuário, verificar se tem um usuário, se não passa um usuário nulo
      auth: auth.user ? auth : null,
    });
  }

  // Metodo para enviar o e-mail
  sendMail(message) {
    // não chama direto esse metodo, pois deve passar o default junto com a menssagem
    return this.transporter.sendMail({
      // Pega todos os dados padrões e soma com os dados da message
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
