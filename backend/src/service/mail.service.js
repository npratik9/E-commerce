const { EmailConfig } = require("../config/config");
const nodemailer = require("nodemailer")

class MailService {
    #transport;
    constructor() {
        try{
            this.#transport= nodemailer.createTransport(EmailConfig.gmail)
        } catch(exception) {
            throw{code:400, message: "SMTP connection failed", status:"SMTP_ERR"}
        }
    }
}