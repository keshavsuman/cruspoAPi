"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.durationSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.durationSchema = new mongoose_1.default.Schema({
    hours: {
        type: Number,
        default: 0,
    },
    minutes: {
        type: Number,
        default: 0
    }
});
