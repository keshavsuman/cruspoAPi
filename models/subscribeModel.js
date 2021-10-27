"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var subscribeSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    subscribedOn: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model('subscribe', subscribeSchema);
