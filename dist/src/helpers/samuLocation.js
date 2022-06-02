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
exports.closestSamuLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const closestSamuLocation = (latitude, longitude, radius = 5000) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = String(process.env.API_KEY);
    const apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=samu%20servico%20de%20emergencia&location=${latitude}%2C${longitude}&radius=${radius}&key=${apiKey}`;
    const config = {
        method: 'get',
        url: apiString,
        headers: {},
    };
    try {
        const response = yield (0, axios_1.default)(config);
        const location = response.data.results[0].geometry.location;
        return location;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.closestSamuLocation = closestSamuLocation;
//# sourceMappingURL=samuLocation.js.map