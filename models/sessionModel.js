"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.sessionSchema = new mongoose_1.default.Schema({
    sessionTitle: {
        type: String,
        required: true
    },
    sessionDescription: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    duration: {
        type: {
            hours: { type: Number },
            minutes: { type: Number },
        },
        required: true
    },
    repeatFrequency: {
        type: String,
        enum: ['ONCE', 'DAILY', 'MONTOFRI', 'CUSTOM'],
        required: true
    },
    notifyViaEmail: {
        type: Boolean,
        default: false
    },
    group: {
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DELETED'],
        default: 'ACTIVE'
    },
}, { timestamps: true });
function sessionModel(prefix) {
    return mongoose_1.default.model(prefix + "_session", exports.sessionSchema);
}
exports.default = sessionModel;
