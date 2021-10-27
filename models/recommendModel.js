"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var recommendSchema = new mongoose_1.default.Schema({
    recommendation: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
});
exports.default = mongoose_1.default.model('recommendation', recommendSchema);
