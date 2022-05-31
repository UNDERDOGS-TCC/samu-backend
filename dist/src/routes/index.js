"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user/user"));
const map_1 = __importDefault(require("./map/map"));
exports.default = (app) => {
    app.get('/api', (req, res) => res.status(200).send('API running'));
    app.use('/api/user', user_1.default);
    app.use('/api/map', map_1.default);
};
//# sourceMappingURL=index.js.map