"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var folderSchema = new mongoose_1.default.Schema({
    folderName: {
        type: String,
        required: true,
        index: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date()
    }
});
function folderModel(prefix) {
    return mongoose_1.default.model(prefix + "_folder", folderSchema);
}
exports.default = folderModel;
