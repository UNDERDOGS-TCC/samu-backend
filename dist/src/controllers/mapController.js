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
const samuLocation_1 = require("../helpers/samuLocation");
exports.default = {
    samuLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { latitude, longitude, radius } = req.body;
        if (!latitude || !longitude) {
            return res.status(200).json({
                message: 'Latitude ou longitude faltando',
                success: false,
            });
        }
        const LatLng = yield (0, samuLocation_1.closestSamuLocation)(latitude, longitude, radius);
        if (!LatLng.lat || !LatLng.lng) {
            return res.status(200).json({
                message: 'Ocorreu um erro ao buscar a localização',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Localização encontrada com sucesso',
            success: true,
            data: LatLng,
        });
    }),
};
//# sourceMappingURL=mapController.js.map