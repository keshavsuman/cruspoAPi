"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var paymentSchema = new mongoose_1.default.Schema({
    user: {
        type: Map,
    },
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
    razorpayPublicToken: {
        type: String,
    },
    paymentFor: {
        type: String,
        enum: ['APPOINTMENT', 'COURSE', 'ASSETDOWNLOAD', 'MISCELLANEOUS']
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
        enum: ["PENDING", 'SUCCESS', 'FAILURE']
    },
    metaData: {
        type: Map,
    }
}, { timestamps: true });
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILURE"] = "FAILURE";
    PaymentStatus["PENDING"] = "PENDING";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
// function paymentLogModel(prefix:String){
//     var model;
//     try{
//         model = mongoose.model<Payment>(`paymentLog`,paymentSchema);
//     }catch{
//         model = mongoose.model<Payment>(`paymentLog`,paymentSchema);
//     }
//     return model;
// }
exports.default = mongoose_1.default.model("paymentLog", paymentSchema);
