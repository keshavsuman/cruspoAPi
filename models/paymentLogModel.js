"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var paymentSchema = new mongoose_1.default.Schema({
    razorpayPaymentID: {
        type: String,
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpaySignature: {
        type: String,
    },
    learnerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'learner'
    },
    paymentFor: {
        type: String,
        enum: ['APPOINTMENT', 'COURSE', 'TEST', 'ASSETDOWNLOAD', 'MISCELLANEOUS']
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['SUCCESS', 'FAILURE']
    },
    metaData: {
        type: Map,
    }
}, { timestamps: true });
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILURE"] = "FAILURE";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
exports.default = mongoose_1.default.model('paymentLog', paymentSchema);
