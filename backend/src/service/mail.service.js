const { EmailConfig, SmtpConfig } = require("../config/config");
const nodemailer = require("nodemailer");

class MailService {
  #transport;
  constructor() {
    try {
      this.#transport = nodemailer.createTransport(EmailConfig.gmail);
      console.log("****SMTP server connected. ServiceProvider: gmail****");
    } catch (exception) {
      throw {
        code: 500,
        message: "SMTP connection failed",
        status: "SMTP_ERR",
      };
    }
  }

  async sendEmail({to, subject, message, cc = null, bcc = null, attachments = null,}) {
    try {
      let messageBody = {
        to: to,
        from: SmtpConfig.smtpFrom,
        subject: subject,
        html: message,
      };

      if (cc) {
        messageBody['cc'] = cc;
      }

      if (bcc) {
        messageBody['bcc'] = bcc;
      }

      if (attachments) {
        messageBody['attachments'] = attachments;
      }
        

     return await this.#transport.sendMail(messageBody);
    } catch (exception) {
      throw {
        code: 500,
        message: "SMTP email sending failed",
        status: "SMTP_EMAIL_SEND_ERR",
      };
    }
  }
}

module.exports = MailService
