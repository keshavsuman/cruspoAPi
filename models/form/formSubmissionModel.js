"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function formSubmissionModel(prefix) {
    return mongoose_1.model(prefix + "_formSubmission", new mongoose_1.Schema({}, { strict: false }));
}
exports.default = formSubmissionModel;
