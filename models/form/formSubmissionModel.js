"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function formSubmissionModel(prefix) {
    return (0, mongoose_1.model)("".concat(prefix, "_formSubmission"), new mongoose_1.Schema({}, { strict: false, timestamps: true }));
}
exports.default = formSubmissionModel;
