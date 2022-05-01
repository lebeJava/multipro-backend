const nodemailer = require("nodemailer");

const config = require("../config");

class EmailLib {
  constructor() {}

  async sendMail({ to, subject, html }) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "wilhelm.mayert8@ethereal.email",
        pass: "Ap87MtY7aFv8wmufHS",
      },
    });

    const mailOptions = {
      from: "Nube | Murcielago <equipo@murcielago.com.pe>",
      to,
      subject,
      html,
    };

    let sent = await transporter.sendMail(mailOptions);
    if (sent.messageId) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = EmailLib;
