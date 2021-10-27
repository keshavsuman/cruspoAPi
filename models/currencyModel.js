"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencySchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.currencySchema = new mongoose_1.default.Schema({
    symbol: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("currencies", exports.currencySchema);
