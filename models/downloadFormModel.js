"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var downloadForm = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date()
    }
});
exports.default = mongoose_1.default.model('downloadForm', downloadForm);
