"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var collectionSchema = new mongoose_1.default.Schema({});
function collectionModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_collections");
    }
    catch (error) {
        model = mongoose_1.default.model(prefix + "_collections", collectionSchema);
    }
}
exports.default = collectionModel;
