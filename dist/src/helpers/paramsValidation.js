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
exports.updateParamsValidator = exports.signupParamsValidator = void 0;
const mongodb_1 = __importDefault(require("../config/mongodb"));
const signupParamsValidator = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const SIGNUP_FIELDS = [
        'name',
        'password',
        'passwordConfirmation',
        'cpf',
        'birthday',
        'cellphone',
        'email',
        'address',
        'cep',
        'state',
        'city',
    ];
    if (!body)
        return new Error('Dados faltando');
    for (const field of SIGNUP_FIELDS) {
        if (!body[field])
            return new Error(`O seguinte campo está faltando: ${field}`);
    }
    const usersCollection = yield mongodb_1.default.getCollection('users');
    const emailExists = yield usersCollection.findOne({ email: body.email });
    const cpfExists = yield usersCollection.findOne({ cpf: body.cpf });
    if (emailExists !== null && emailExists !== void 0 ? emailExists : cpfExists)
        return new Error('O usuário já existe');
    if (body.password !== body.passwordConfirmation) {
        return new Error('As senhas não são iguais');
    }
    return null;
});
exports.signupParamsValidator = signupParamsValidator;
const updateParamsValidator = (body) => {
    const UPDATE_FIELDS = [
        'cellphone',
        'email',
        'address',
        'cep',
        'state',
        'city',
    ];
    if (!body)
        return new Error('Missing body');
    for (const field of UPDATE_FIELDS) {
        if (!body[field])
            return new Error(`Missing field: ${field}`);
    }
    return null;
};
exports.updateParamsValidator = updateParamsValidator;
//# sourceMappingURL=paramsValidation.js.map