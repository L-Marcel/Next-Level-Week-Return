import { MailAdapter, SendMailData } from "../mailAdapter";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "eb7706936f8a9f",
    pass: "6a61861ca21b06"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Lucas Marcel <lmgh1312@gmail.com>",
      subject: data.subject,
      html: data.body
    });
  };
};