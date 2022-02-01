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
    sessionThumbnail: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: {
            hours: { type: Number },
            minutes: { type: Number },
        },
        required: true
    },
    isPaid: {
        type: Boolean,
    },
    price: {
        type: Number,
    },
    currency: {
        type: String,
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
        enum: ['PUBLISHED', 'UNPUBLISHED', 'DRAFT'],
        default: 'DRAFT'
    },
}, { timestamps: true });
function sessionModel(prefix) {
    return mongoose_1.default.model("".concat(prefix, "_session"), exports.sessionSchema);
}
exports.default = sessionModel;
