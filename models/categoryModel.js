"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.categorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model("category", exports.categorySchema);
