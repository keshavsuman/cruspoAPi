"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function formSubmissionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model("".concat(prefix, "_formSubmission"));
    }
    catch (error) {
        model = mongoose_1.default.model("".concat(prefix, "_formSubmission"), new mongoose_1.default.Schema({}, { strict: false, timestamps: true }));
    }
    return model;
}
exports.default = formSubmissionModel;
