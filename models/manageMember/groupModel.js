"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.groupSchema = new mongoose_1.default.Schema({
    groupName: {
        type: String,
        unique: true
    },
}, {
    timestamps: true
});
function groupModel(prefix) {
    return mongoose_1.default.model(prefix + "_group", exports.groupSchema);
}
exports.default = groupModel;
