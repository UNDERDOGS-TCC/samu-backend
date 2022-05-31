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
const mongodb_1 = __importDefault(require("../config/mongodb"));
const crypto_1 = __importDefault(require("crypto"));
const mongodb_2 = require("mongodb");
const paramsValidation_1 = require("../helpers/paramsValidation");
const send_email_1 = __importDefault(require("../config/send-email"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, paramsValidation_1.signupParamsValidator)(req.body);
        if (error) {
            res.status(200).json({ message: error.message, success: false });
        }
        else {
            const body = req.body;
            delete body.passwordConfirmation;
            if (!body.complement) {
                body.complement = 'N/A';
            }
            const users = yield mongodb_1.default.getCollection('users');
            const response = yield users.insertOne(body);
            res.status(200).json({
                message: 'Usuário criado com sucesso',
                success: true,
                id: response.insertedId,
            });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(200)
                .json({ message: 'Email ou senha faltando', success: false });
        }
        else {
            const usersCollection = yield mongodb_1.default.getCollection('users');
            const user = yield usersCollection.findOne({ email: email });
            if (!user) {
                res
                    .status(200)
                    .json({ message: 'Email ou senha incorretos', success: false });
            }
            else {
                if (user.password !== password) {
                    res
                        .status(200)
                        .json({ message: 'Email ou senha incorretos', success: false });
                }
                else {
                    delete user.password;
                    res.status(200).json({
                        message: 'Usuário validado com sucesso',
                        success: true,
                        user,
                    });
                }
            }
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const error = (0, paramsValidation_1.updateParamsValidator)(req.body);
        if (error) {
            res.status(200).json({ message: error.message, success: false });
        }
        const user = req.body;
        delete user._id;
        const usersCollection = yield mongodb_1.default.getCollection('users');
        const userFound = yield usersCollection.findOne({ email: user.email });
        if (!userFound) {
            res.status(200).json({ message: 'Usuário não encontrado', success: false });
        }
        else {
            const response = yield usersCollection.updateOne({ _id: userFound._id }, { $set: user });
            if (response.acknowledged) {
                res.status(200).json({
                    message: 'Usuário atualizado',
                    success: true,
                    id: response.upsertedId,
                });
            }
            else {
                res.status(200).json({
                    message: 'Ocorreu um erro ao atualizar o usuário, tente novamente mais tarde',
                    success: false,
                });
            }
        }
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            res.status(200).json({ message: 'Id de usuário faltando', success: false });
            return;
        }
        const usersCollection = yield mongodb_1.default.getCollection('users');
        const user = (yield usersCollection.findOne({
            _id: new mongodb_2.ObjectId(id),
        }));
        if (!user) {
            res.status(200).json({ message: 'Usuário não encontrado', success: false });
            return;
        }
        delete user.password;
        res
            .status(200)
            .json({ message: 'Usuáiro encontrado', success: true, user: user });
        return;
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { cpf, email, birthday } = req.body;
        if (!cpf || !email || !birthday) {
            res.status(200).json({ message: 'Dados faltando', success: false });
            return;
        }
        const usersCollection = yield mongodb_1.default.getCollection('users');
        const user = (yield usersCollection.findOne({
            cpf: cpf,
            email: email,
            birthday: birthday,
        }));
        if (!user) {
            res.status(200).json({ message: 'Usuário não encontrado', success: false });
            return;
        }
        const newPassword = crypto_1.default.randomUUID();
        user.password = newPassword;
        const response = yield usersCollection.updateOne({ _id: new mongodb_2.ObjectId(user._id) }, { $set: user });
        if (!response.acknowledged) {
            res
                .status(200)
                .json({ message: 'Não foi possível redefinir a senha', success: false });
            return;
        }
        const mailBody = `
      <p>Olá, <strong>${user.name.split(' ')[0]}</strong>.</p>
      <p>Sua nova senha é <strong>${newPassword}</strong>.</p>
      <p>Você deve alterar para uma nova senha dentro do aplicativo.</p>
    `;
        const mailObject = {
            to: user.email,
            message: mailBody,
            subject: 'Sua senha foi redefinida',
        };
        yield (0, send_email_1.default)(mailObject);
        res.status(200).json({
            message: 'Sua nova senha foi enviada para o seu email',
            success: true,
        });
    }),
    redefinePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, oldPassword, newPassword } = req.body;
        if (!id || !oldPassword || !newPassword) {
            res.status(200).json({ message: 'Dados faltando', success: false });
            return;
        }
        const usersCollection = yield mongodb_1.default.getCollection('users');
        const user = yield usersCollection.findOne({ _id: new mongodb_2.ObjectId(id) });
        if (!user) {
            res.status(200).json({ message: 'Usuário não encontrado', success: false });
            return;
        }
        if (user.password !== oldPassword) {
            res.status(200).json({ message: 'Senha atual incorreta', success: false });
            return;
        }
        user.password = newPassword;
        const response = yield usersCollection.updateOne({ _id: new mongodb_2.ObjectId(user._id) }, { $set: user });
        if (!response.acknowledged) {
            res
                .status(200)
                .json({ message: 'Não foi possível redefinir a senha', success: false });
            return;
        }
        res.status(200).json({
            message: 'Sua senha foi redefinida com sucesso',
            success: true,
        });
    }),
};
//# sourceMappingURL=userController.js.map