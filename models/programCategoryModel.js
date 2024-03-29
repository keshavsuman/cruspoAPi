"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var programCategorySchema = new mongoose_1.default.Schema({
    categoryName: {
        type: String
    }
});
function programCategoryModel(prefix) {
    return mongoose_1.default.model("".concat(prefix, "_programCategory"), programCategorySchema);
}
exports.default = programCategoryModel;
