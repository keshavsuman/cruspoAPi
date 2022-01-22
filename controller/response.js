"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatorResponse = exports.userResponse = void 0;
function userResponse(res, status, data, success) {
    data.success = success;
    res.status(status).json(data);
}
exports.userResponse = userResponse;
function creatorResponse() {
}
exports.creatorResponse = creatorResponse;
