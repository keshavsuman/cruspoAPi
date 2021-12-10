"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
;
var PaymentOrder = new mongoose_1.default.Schema({
    paymentOrderAmount: {
        type: Number,
        required: true
    },
    PaymentCollectionName: {
        type: String,
    },
    image: {
        type: String,
    },
    paymentCollectionDescription: {
        type: String,
    },
    paymentOrderCurrency: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Currency',
    },
    emailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});
function PaymentOrderModel(prefix) {
    try {
        return mongoose_1.default.model(prefix + "_PaymentOrder");
    }
    catch (e) {
        return mongoose_1.default.model(prefix + "_PaymentOrder", PaymentOrder);
    }
}
exports.default = PaymentOrderModel;
