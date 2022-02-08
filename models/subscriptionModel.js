"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var subscriptionSchema = function (prefix) { return new mongoose_1.default.Schema({
    subscriptionName: {
        type: String,
        required: true
    },
    subscriptionDescription: {
        type: String
    },
    subscriptionThumbnail: {
        type: String
    },
    subscriptionPrice: {
        amount: {
            type: String
        },
        currency: {
            type: mongoose_1.default.Schema.Types.ObjectId
        },
        discountedPrice: {
            type: String
        }
    },
    collections: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "".concat(prefix, "_collection")
        }],
    subscriptionDuration: {
        type: Number,
        required: true
    },
    subscriptionType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}); };
function subscriptionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model("".concat(prefix, "_subscription"));
    }
    catch (_a) {
        model = mongoose_1.default.model("".concat(prefix, "_subscription"), subscriptionSchema(prefix));
    }
    return model;
}
exports.default = subscriptionModel;
