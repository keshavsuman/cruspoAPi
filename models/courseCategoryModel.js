"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var courseCategorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
});
exports.default = mongoose_1.default.model('courseCategory', courseCategorySchema);
