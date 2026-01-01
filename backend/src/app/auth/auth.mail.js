const MailService = require("../../service/mail.service")

class AuthMailService extends MailService {

}

const authMailSvc = new AuthMailService;

module.exports = authMailSvc