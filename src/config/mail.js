export default {
  // Protoco SMTP, de envio de e-mail
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // Configurações padrões do envio de e-mail
  default: {
    from: 'Equipe GoBarber <noreply@gobarber>',
  },
};
