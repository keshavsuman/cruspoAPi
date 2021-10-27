"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var eventModelSchema = new mongoose_1.default.Schema({
    eventTitle: {
        type: String
    },
    eventDescription: {
        type: String
    },
    eventThumbnail: {
        type: String
    },
    startDate: {
        type: Date
    },
    startTime: {
        type: String
    },
    endDate: {
        type: Date
    },
    endTime: {
        type: String
    },
    timeZone: {
        type: String
    },
    notifyViaEmail: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    currency: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'currencies'
    },
    group: [{
            type: mongoose_1.default.Schema.Types.ObjectId
        }],
});
function eventModel(prefix) {
    return mongoose_1.default.model(prefix + "_event", eventModelSchema);
}
exports.default = eventModel;
