"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningMode = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var EarningMode;
(function (EarningMode) {
    EarningMode["Sales"] = "sales";
    EarningMode["Earning"] = "earning";
})(EarningMode = exports.EarningMode || (exports.EarningMode = {}));
var earningSchema = new mongoose_1.default.Schema({
    razorpayOrderID: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    },
    razorpaySigature: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    earningMode: {
        type: String,
        enum: EarningMode,
        default: EarningMode.Earning,
    }
});
exports.default = mongoose_1.default.model('earning', earningSchema);
