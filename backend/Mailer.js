import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default class Mailer {

  // Get info (sender email and app password from gmail-secret.json)
  static info = (() => {
    try {
      return JSON.parse(fs.readFileSync(
        path.join(import.meta.dirname, 'gmail-secret.json'), 'utf-8'));
    }
    catch (_e) {
      console.warn('\nMissing gmail-secret.json file!');
      return {};
    }
  })();

  static send(to, subject, text, html, attachments = []) {
    // Authenticate / create a mail client
    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.info.email,
        pass: this.info.appPassword
      }
    });
    // Send the mail
    // (see https://nodemailer.com/message for more options)
    client.sendMail({
      from: this.info.email,
      to, subject, text, html, attachments
    });
  }

}