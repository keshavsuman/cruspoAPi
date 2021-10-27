"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mailTemplateSchema = new mongoose_1.default.Schema({
    templateName: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        requried: true
    },
    body: {
        type: String,
        required: true
    },
    updatedOn: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});
function mailTemplateModel(prefix) {
    return mongoose_1.default.model(prefix + "_mailTemplate", mailTemplateSchema);
}
exports.default = mailTemplateModel;
