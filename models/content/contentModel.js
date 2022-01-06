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
var contentSchema = function (prefix) { return new mongoose_1.default.Schema({
    contentTitle: {
        type: String,
        required: true,
        trim: true
    },
    contentDescription: {
        type: String,
        trim: true
    },
    contentThumbnail: {
        type: String
    },
    contentType: {
        type: String,
        enum: ['video', 'audio', 'blog', 'resource'],
        required: true
    },
    contentURL: {
        type: String,
        required: true,
        trim: true
    },
    // contentCategory:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:`${prefix}_contentCategory`
    // },
    // contentSubCategory:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:`${prefix}_subCategory`
    // },
    isPaid: {
        type: Boolean,
        required: true
    },
    // modules:{
    //     type:[{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:`${prefix}_module`
    //     }],
    // },
    // batches:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:`${prefix}_batch`
    // }],
    feeDetails: {
        type: feeDetailsSchema
    },
    contentExpiryDate: {
        type: Date
    },
    // duration:{
    //     type:{
    //         durationValue:{type:Number},
    //         durationUnit:{type:String}
    //     }
    // },
    status: {
        type: String,
        default: 'draft',
        enum: ['published', 'unpublished', 'draft', 'deleted']
    },
}, { timestamps: true }); };
function contentModel(prefix) {
    var content;
    try {
        content = mongoose_1.default.model(prefix + "_content");
    }
    catch (_a) {
        content = mongoose_1.default.model(prefix + "_content", contentSchema(prefix));
    }
    return content;
}
exports.default = contentModel;
