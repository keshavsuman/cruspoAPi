"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var timingSchema = new mongoose_1.default.Schema({
    timingTitle: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
    },
    endTime: {
        type: Date,
        // required:true
    },
    timeZone: {
        type: String,
        required: true,
    },
    duration: {
        type: {
            hours: {
                type: Number
            },
            minutes: {
                type: Number
            }
        }
    },
    seatLimit: {
        type: Number,
    }
});
var BatchSchema = new mongoose_1.default.Schema({
    batchTitle: {
        type: String,
        required: true
    },
    batchDescription: {
        type: String
    },
    timings: {
        type: [timingSchema],
    },
    status: {
        type: String,
        enum: ['DELETED', 'ACTIVE']
    }
});
function batchModel(prefix) {
    var batch;
    try {
        batch = mongoose_1.default.model(prefix + "_batch");
    }
    catch (_a) {
        batch = mongoose_1.default.model(prefix + "_batch", BatchSchema);
    }
    return batch;
}
exports.default = batchModel;
