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
const express_1 = require("express");
const userController_1 = __importDefault(require("../../controllers/userController"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.login(req, res); }));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.signup(req, res); }));
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.update(req, res); }));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.getUserById(req, res); }));
router.post('/resetpassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.resetPassword(req, res); }));
router.post('/redefinepassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController_1.default.redefinePassword(req, res); }));
exports.default = router;
//# sourceMappingURL=user.js.map