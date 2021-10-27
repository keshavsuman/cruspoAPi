"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var LessonSchema = function (prefix) { return new mongoose_1.default.Schema({
    lessonTitle: {
        type: String,
        required: true
    },
    lessonDescription: {
        type: String,
    },
    lessonThumbnail: {
        type: String
    },
    moduleID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: prefix + "_module"
    },
    videoURL: {
        type: String,
    },
    lessontype: {
        type: String,
        enum: ['VIDEO', 'DOCUMENT', 'ACTIVITY']
    }
}); };
function lessonModel(prefix) {
    return mongoose_1.default.model(prefix + "_lesson", LessonSchema(prefix));
}
exports.default = lessonModel;
