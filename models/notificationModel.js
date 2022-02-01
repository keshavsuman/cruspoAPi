"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.notificationSchema = new mongoose_1.default.Schema({
    notificationType: {
        type: String
    },
    notificationTitle: {
        type: String
    },
    notificationsDescription: {
        type: String
    },
    notificationUrl: {
        type: String
    },
    createdOn: {
        type: String
    }
});
function notificationModel(prefix) {
    return mongoose_1.default.model("".concat(prefix, "_notification"), exports.notificationSchema);
}
exports.default = notificationModel;
