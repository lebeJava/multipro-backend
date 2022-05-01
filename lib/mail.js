const nodemailer = require("nodemailer");
const { config } = require("../config");

class MailLib {
  constructor() {
    this.user = config.mailUser;
    this.pass = config.mailPassword;

    this.transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendNotify({ from, to, subject, html, attachments = null }) {
    try {
      const mail = await this.transporter.sendMail({
        from: `'${from}' <${this.user}>`,
        to,
        subject,
        html,
        attachments,
      });

      console.log("Message sent: %s", mail.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}

module.exports = { MailLib };
