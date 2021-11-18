"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var appointmentsBookingSchema = function (prefix) { return new mongoose_1.default.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    appointmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: prefix + "_appointments",
        required: true
    },
    timings: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },
    bookedDate: {
        type: Date,
        required: true
    },
    paymentRef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: prefix + "_paymentLog"
    }
}); };
function appointmentBookingModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_appointmentsBooking");
    }
    catch (_a) {
        model = mongoose_1.default.model(prefix + "_appointmentsBooking", appointmentsBookingSchema(prefix));
    }
    return model;
}
exports.default = appointmentBookingModel;
