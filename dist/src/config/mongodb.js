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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
if (!MONGO_HOST || !MONGO_USER || !MONGO_PASSWORD || !MONGO_DATABASE) {
    throw new Error('Missing MONGO_DB environment variables');
}
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
exports.default = {
    client: null,
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield mongodb_1.MongoClient.connect(uri);
        });
    },
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
            this.client = null;
        });
    },
    getCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                yield this.connect();
            return this.client.db().collection(name);
        });
    },
};
//# sourceMappingURL=mongodb.js.map