"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var formSchema = function (prefix) { return new mongoose_1.default.Schema({
    formName: {
        type: String
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    price: {
        amount: { type: Number },
        currency: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Currency' }
    },
    redirectTo: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    userMailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "".concat(prefix, "_mail")
    },
    creatorMailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "".concat(prefix, "_mail")
    }
}, {
    timestamps: true
}); };
function formModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model("".concat(prefix, "_Form"));
    }
    catch (error) {
        model = mongoose_1.default.model("".concat(prefix, "_Form"), formSchema("".concat(prefix, "_Form")));
    }
    return model;
}
exports.default = formModel;
