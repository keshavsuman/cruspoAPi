"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var formSchema = function (prefix) { return new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paymentOrderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: prefix + "_PaymentOrder"
    },
    adminMailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    userMailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: ""
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    fields: [{
            type: Schema.Types.ObjectId,
            ref: 'field'
        }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
}); };
function formModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_forms");
    }
    catch (e) {
        model = mongoose_1.default.model(prefix + "_forms", formSchema(prefix));
    }
    return model;
}
exports.default = formModel;
