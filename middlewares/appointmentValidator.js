"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidator = void 0;
function appointmentValidator(req, res, next) {
    if (req.body.appointmentTitle != undefined) {
    }
    next();
}
exports.appointmentValidator = appointmentValidator;
