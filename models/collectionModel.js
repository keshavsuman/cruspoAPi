"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var collectionSchema = new mongoose_1.default.Schema({
    collectionTitle: {
        type: String
    },
    collectionDescription: {
        type: String
    },
    currency: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "currencies"
    },
    price: {
        type: Number
    },
    accessPolicy: {
        enum: ['lifetime', 'limited', 'free'],
    },
    contents: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "content"
        }]
});
function collectionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_collections");
    }
    catch (error) {
        model = mongoose_1.default.model(prefix + "_collections", collectionSchema);
    }
    return model;
}
exports.default = collectionModel;
