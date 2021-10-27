"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var durationModel_1 = require("./durationModel");
var sessionSchema = function (prefix) { return new mongoose_1.default.Schema({
    sessionType: {
        type: String,
        required: true,
        enum: ['SESSION', 'EVENT']
    },
    sessionTitle: {
        type: String,
        required: true,
        trim: true
    },
    sessionDescription: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
    },
    startTime: {
        type: Date
    },
    endDate: {
        type: Date,
    },
    endTime: {
        type: Date
    },
    timeZone: {
        type: String
    },
    duration: {
        type: durationModel_1.durationSchema
    },
    notifyViaEmail: {
        type: Boolean,
        default: false
    },
    group: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: prefix + "_group"
    }
}); };
function sessionModel(prefix) {
    return mongoose_1.default.model(prefix + "_session", sessionSchema(prefix));
}
exports.default = sessionModel;
