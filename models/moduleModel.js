"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.moduleSchema = new mongoose_1.default.Schema({
    moduleTitle: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true
    },
    moduleDescription: {
        type: String
    },
    moduleThumbnail: {
        type: String
    },
    lessons: {
        type: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'lesson'
            }],
    }
});
function moduleModel(prefix) {
    var module;
    try {
        module = mongoose_1.default.model("".concat(prefix, "_module"), exports.moduleSchema);
    }
    catch (error) {
        module = mongoose_1.default.model("".concat(prefix, "_module"), exports.moduleSchema);
    }
    return module;
}
exports.default = moduleModel;
