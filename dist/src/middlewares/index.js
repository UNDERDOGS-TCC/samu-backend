"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nocache_1 = __importDefault(require("nocache"));
const bodyParser_1 = __importDefault(require("./bodyParser"));
const morgan_1 = __importDefault(require("./morgan"));
exports.default = (app) => {
    app.use(bodyParser_1.default);
    app.use(morgan_1.default);
    app.set('etag', false);
    app.use((0, nocache_1.default)());
};
//# sourceMappingURL=index.js.map