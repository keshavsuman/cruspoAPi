"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var collectionSchema = function (prefix) { return new mongoose_1.default.Schema({
    collectionTitle: {
        type: String
    },
    collectionDescription: {
        type: String
    },
    collectionThumbnail: {
        type: String
    },
    isPaid: {
        type: Boolean
    },
    price: {
        type: {
            currency: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "currencies"
            },
            amount: {
                type: Number
            },
            discountedPrice: {
                type: Number
            }
        }
    },
    accessPolicy: {
        enum: ['LIFETIME', 'LIMITED', 'FREE'],
    },
    contents: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "".concat(prefix, "_content")
        }],
    status: {
        enum: ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'],
        type: String,
        default: "DRAFT",
    }
}); };
function collectionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model("".concat(prefix, "_collections"));
    }
    catch (error) {
        model = mongoose_1.default.model("".concat(prefix, "_collections"), collectionSchema(prefix));
    }
    return model;
}
exports.default = collectionModel;
