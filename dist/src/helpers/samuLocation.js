"use strict";
//import {axios} from 'axios';
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
exports.closestSamuLocation = void 0;
const closestSamuLocation = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cgeometry&input=samu%20Sao%20Paulo&inputtype=textquery&key=${String(process.env.GOOGLE_API_KEY)}`,
        headers: {},
    };
    console.log(config);
    // axios(config)
    //   .then((response: any) => {
    //     console.log(response.data);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
    return {
        lat: latitude,
        lng: longitude,
    };
});
exports.closestSamuLocation = closestSamuLocation;
//# sourceMappingURL=samuLocation.js.map