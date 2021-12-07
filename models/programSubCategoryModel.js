"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var subCategorySchema = new mongoose_1.default.Schema({
    programCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'programCategory',
        required: true
    },
    subCategory: {
        type: String,
        required: true,
        // unique:true,
        trim: true
    }
});
function programSubCategoryModel(prefix) {
    return mongoose_1.default.model(prefix + "_subCategory", subCategorySchema);
}
exports.default = programSubCategoryModel;
