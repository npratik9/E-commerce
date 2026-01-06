const { AppConfig } = require("../../config/config");
const MailService = require("../../service/mail.service");

class AuthMailService extends MailService {
  async activateYourAccount(user) {
    try {
      let activationLink =
        AppConfig.frontendUrl + "/activate" + user.activationToken;
      return await this.sendEmail({
        to: user.email,
        subject: "Activate your account",
        message: `<!DOCTYPE html>
        <html>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
                <div style="background: #0d9488; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-weight: 500;">Account Activation</h1>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #0d9488; margin-top: 0;">Hello ${user.name
                      .split(" ")
                      .shift()},</h2>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for registering with us! Your username is: <strong>${
                          user.email
                        }</strong>.
                    </p>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
                        Please click the button below to activate your account:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${activationLink}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: 500; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#0f766e'" onmouseout="this.style.backgroundColor='#0d9488'">
                            Activate Account
                        </a>
                    </div>
                    <p style="color: #777; font-size: 14px; line-height: 1.5;">
                        <strong>Note:</strong> This activation link will expire in 1 day.
                    </p>
                </div>
                <div style="background: #f1f5f9; padding: 15px; text-align: center; color: #64748b; font-size: 12px;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} BIN-Commerce. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async welcomeMessageToUser(userDetail) {
    try {
      let loginLink = AppConfig.frontendUrl + "/login";
      return await this.sendEmail({
        to: userDetail.email,
        subject: "Thank you for registering!!!",
        message: `<!DOCTYPE html>
        <html>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
                <div style="background: #0d9488; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-weight: 500;">Welcome Aboard!</h1>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #0d9488; margin-top: 0;">Congratulations ${userDetail.name
                      .split(" ")
                      .shift()}!</h2>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Your account is now active and ready to explore all the amazing features we offer!
                    </p>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
                        We're excited to have you join our community. Start your journey by logging in below:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${loginLink}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: 500; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#0f766e'" onmouseout="this.style.backgroundColor='#0d9488'">
                            Login Now
                        </a>
                    </div>
                    <p style="color: #777; font-size: 14px; line-height: 1.5;">
                        <strong>Tip:</strong> Your account gives you access to exclusive features and personalized content.
                    </p>
                </div>
                <div style="background: #f1f5f9; padding: 15px; text-align: center; color: #64748b; font-size: 12px;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} BIN-Commerce. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
      });
    } catch (exception) {
      throw exception
    }
  }

  async resendTokenNotification(userDetail) {
    try {
      let loginLink = AppConfig.frontendUrl + "/login";
      return await this.sendEmail({
        to: userDetail.email,
        subject: "Re-activate your account!!!",
        message: `<!DOCTYPE html>
        <html>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
                <div style="background: #0d9488; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-weight: 500;">New Activation Link</h1>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #0d9488; margin-top: 0;">Hello ${userDetail.name
                      .split(" ")
                      .shift()},</h2>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        We've generated a new activation link for your account <strong>${
                          userDetail.email
                        }</strong>.
                    </p>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
                        Your previous activation link has expired. Please use this new link to complete your registration:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${activationLink}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: 500; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor='#0f766e'" onmouseout="this.style.backgroundColor='#0d9488'">
                            Activate Now
                        </a>
                    </div>
                    <p style="color: #777; font-size: 14px; line-height: 1.5;">
                        <strong>Important:</strong> This new activation link will expire in 24 hours.
                    </p>
                </div>
                <div style="background: #f1f5f9; padding: 15px; text-align: center; color: #64748b; font-size: 12px;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} BIN-Commerce. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
      });
    } catch (exception) {
      throw exception
    }
  }

}
const authMailSvc = new AuthMailService();

module.exports = authMailSvc;
