"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
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
const transporter = nodemailer_1.default.createTransport(transporterOptions);
function sendEmail(mailObject) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            to: mailObject.to,
            from: (_a = mailObject.from) !== null && _a !== void 0 ? _a : EMAIL_USER,
            html: mailObject.message,
            subject: mailObject.subject,
        };
        const mailResponse = yield transporter.sendMail(mailOptions);
        return mailResponse;
    });
}
exports.default = sendEmail;
//# sourceMappingURL=send-email.js.map