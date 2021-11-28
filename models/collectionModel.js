"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var collectionSchema = function (prefix) { return new mongoose_1.default.Schema({
    collectionName: {
        type: String,
    },
    collectionDescription: {
        type: String,
    },
    collectionThumbnail: {
        type: String,
    },
}); };
function collectionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_collection");
    }
    catch (_a) {
        model = mongoose_1.default.model(prefix + "_collection", collectionSchema(prefix));
    }
    return model;
}
exports.default = collectionModel;
