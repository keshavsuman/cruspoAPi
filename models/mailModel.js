"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mailSchema = new mongoose_1.default.Schema({
    subject: {
        type: String
    },
    body: {
        type: String
    },
    templateName: {
        type: String
    },
});
function mailModel(prefix) {
    return mongoose_1.default.model(prefix + "_mail", mailSchema);
}
exports.default = mailModel;
