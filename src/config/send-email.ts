import nodemailer, {SendMailOptions, SentMessageInfo} from 'nodemailer';
import {SendEmailParams} from '../interfaces/sendEmailParams';

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_SECURE = process.env.EMAIL_SECURE;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_HOST || !EMAIL_SECURE || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
  throw new Error('Missing email config');
}

const transporterOptions = {
  host: EMAIL_HOST,
  secure: EMAIL_SECURE === 'true',
  port: Number(EMAIL_PORT),
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};
const transporter = nodemailer.createTransport(transporterOptions);

export default async function sendEmail(
  mailObject: SendEmailParams,
): Promise<SentMessageInfo> {
  const mailOptions: SendMailOptions = {
    to: mailObject.to,
    from: mailObject.from ?? EMAIL_USER,
    html: mailObject.message,
    subject: mailObject.subject,
  };

  const mailResponse = await transporter.sendMail(mailOptions);
  return mailResponse;
}
