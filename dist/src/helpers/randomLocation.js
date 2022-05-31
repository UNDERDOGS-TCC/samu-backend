"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomLocationWithinRadius = void 0;
const EARTH_RADIUS = 6371000; // meters
const DEG_TO_RAD = Math.PI / 180;
const THREE_PI = Math.PI * 3;
const TWO_PI = Math.PI * 2;
const toRadians = (deg) => deg * DEG_TO_RAD;
const toDegrees = (rad) => rad / DEG_TO_RAD;
const randomLocationWithinRadius = (latitude, longitude, radius) => {
    const sinLat = Math.sin(toRadians(latitude));
    const cosLat = Math.cos(toRadians(latitude));
    // Random bearing (direction out of 360 degrees)
    const bearing = Math.random() * TWO_PI;
    const sinBearing = Math.sin(bearing);
    const cosBearing = Math.cos(bearing);
    // Theta is the approximated angular distance
    const theta = radius / EARTH_RADIUS;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const randomLatitude = Math.asin(sinLat * cosTheta + cosLat * sinTheta * cosBearing);
    const randomLongitude = toRadians(longitude) +
        Math.atan2(sinBearing * sinTheta * cosLat, cosTheta - sinLat * Math.sin(randomLatitude));
    // Normalize longitude L such that -PI < L < +PI
    const normalizedRandomLongitude = ((randomLongitude + THREE_PI) % TWO_PI) - Math.PI;
    return {
        lat: toDegrees(randomLatitude),
        lng: toDegrees(normalizedRandomLongitude),
    };
};
exports.randomLocationWithinRadius = randomLocationWithinRadius;
//# sourceMappingURL=randomLocation.js.map