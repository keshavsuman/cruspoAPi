"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var feeDetailsSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        default: 0
    },
    currency: {
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    collectionPeriod: {
        type: String,
        enum: ['oneTime', 'monthly', 'yearly', 'custom']
    },
    collectionDuration: {
        type: Number
    },
    collectionDurationUnit: {
        type: String,
        enum: ['day', 'week', 'month', 'year']
    }
});
var ProgramSchema = function (prefix) { return new mongoose_1.default.Schema({
    programTitle: {
        type: String,
        required: true,
        trim: true
    },
    programDescription: {
        type: String,
        trim: true
    },
    programThumbnail: {
        type: String
    },
    programType: {
        type: String,
        enum: ['live-program', 'pre-recorded-program'],
        required: true
    },
    programCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "".concat(prefix, "_programCategory")
    },
    programSubCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "".concat(prefix, "_subCategory")
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    modules: {
        type: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "".concat(prefix, "_module")
            }],
    },
    batches: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "".concat(prefix, "_batch")
        }],
    feeDetails: {
        type: feeDetailsSchema
    },
    programExpiryDate: {
        type: Date
    },
    duration: {
        type: {
            durationValue: { type: Number },
            durationUnit: { type: String }
        }
    },
    status: {
        type: String,
        enum: ['PUBLISHED', 'UNPUBLISHED', 'EXPIRED', 'DRAFT', 'DELETED']
    },
}, { timestamps: true }); };
function programModel(prefix) {
    var program;
    try {
        program = mongoose_1.default.model("".concat(prefix, "_program"));
    }
    catch (_a) {
        program = mongoose_1.default.model("".concat(prefix, "_program"), ProgramSchema(prefix));
    }
    return program;
}
exports.default = programModel;
