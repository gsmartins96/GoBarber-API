import { resolve } from 'path';
import nodemailer from 'nodemailer';
import nodemailehbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
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

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // configurar o compilador do
    this.transporter.use(
      'compile', // Compile: Como formata/compila nossos e-mails.
      nodemailehbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
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
