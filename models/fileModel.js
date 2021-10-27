"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileType = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var fileType;
(function (fileType) {
    fileType["pdf"] = "pdf";
    fileType["jpg"] = "jpg";
    fileType["png"] = "png";
    fileType["gif"] = "gif";
    fileType["docx"] = "docx";
})(fileType = exports.fileType || (exports.fileType = {}));
var fileSchema = new mongoose_1.default.Schema({
    fileName: {
        type: String
    },
    fileURL: {
        type: String
    },
    fileSize: {
        type: String
    },
    fileType: {
        type: String,
        // enum:fileType
    },
    fileThumbnail: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastModified: {
        type: Date,
    }
});
function fileModel(prefix) {
    return mongoose_1.default.model(prefix + "_files", fileSchema);
}
exports.default = fileModel;
