"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var currencyModel_1 = require("./currencyModel");
var feeDetailsSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        default: 0
    },
    currency: {
        type: currencyModel_1.currencySchema
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
var CourseSchema = new mongoose_1.default.Schema({
    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
        trim: true
    },
    courseThumbnail: {
        type: String
    },
    courseType: {
        type: String,
        enum: ['liveProgram', 'preRecordedProgram'],
        required: true
    },
    courseCategory: {
        type: String
    },
    courseSubCategory: {
        type: String
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    courseCreationDate: {
        type: Date,
        required: true,
        default: Date()
    },
    modules: {
        type: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'module'
            }],
    },
    batches: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'batch'
        }],
    feeDetails: {
        type: feeDetailsSchema
    },
    currency: {
        type: currencyModel_1.currencySchema
    },
    courseExpiryDate: {
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
    lastUpdate: {
        type: Date,
    }
});
CourseSchema.post('updateOne', function (doc) {
    console.log(doc);
});
exports.default = mongoose_1.default.model('course', CourseSchema);
