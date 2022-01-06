"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var availableDatesSchema = new mongoose_1.default.Schema({
    availabilityType: {
        type: String,
        enums: ['Once', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    value: {
        type: Date,
    },
    timings: {
        type: [{ startDuration: { type: String }, endDuration: { type: String } }]
    }
});
var availabilityType;
(function (availabilityType) {
    availabilityType["Once"] = "Once";
    availabilityType["Monday"] = "Monday";
    availabilityType["Tuesday"] = "Tuesday";
    availabilityType["Wednesday"] = "Wednesday";
    availabilityType["Thrusday"] = "Thursday";
    availabilityType["Friday"] = "Friday";
    availabilityType["Saturday"] = "Saturday";
    availabilityType["Sunday"] = "Sunday";
})(availabilityType || (availabilityType = {}));
exports.appointmentSchema = new mongoose_1.default.Schema({
    appointmentTitle: {
        type: String,
        required: true,
        trim: true
    },
    appointmentDescription: {
        type: String,
        trim: true
    },
    appointmentThumbnail: {
        type: String
    },
    duration: {
        type: {
            hours: Number,
            mins: Number
        }
    },
    timezone: {
        type: String,
    },
    currency: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'currencies'
    },
    appointmentPrice: {
        type: Number,
        required: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'DELETED', 'UNPUBLISHED'],
        default: 'DRAFT'
    },
    dateOverride: [{ type: mongoose_1.default.Schema.Types.Map }],
    schedule: {
        type: mongoose_1.default.Schema.Types.Map,
    }
}, {
    timestamps: true
});
function appointmentModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_appointment");
    }
    catch (_a) {
        model = mongoose_1.default.model(prefix + "_appointment", exports.appointmentSchema);
    }
    return model;
}
exports.default = appointmentModel;
