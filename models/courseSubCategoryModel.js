"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var subCategorySchema = new mongoose_1.default.Schema({
    category: {
        type: String
    },
    subCategory: {
        type: String
    }
});
exports.default = mongoose_1.default.model('subCategory', subCategorySchema);
