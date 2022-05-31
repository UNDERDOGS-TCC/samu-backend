"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("./src/middlewares"));
const routes_1 = __importDefault(require("./src/routes"));
const mongodb_1 = __importDefault(require("./src/config/mongodb"));
const app = (0, express_1.default)();
app.use('/', express_1.default.static('public'));
(0, middlewares_1.default)(app);
(0, routes_1.default)(app);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
mongodb_1.default
    .connect()
    .then(() => {
    console.log('connected to mongodb');
    app.listen(port, () => console.log(`listening on port ${port}`));
})
    .catch(console.error);
//# sourceMappingURL=server.js.map