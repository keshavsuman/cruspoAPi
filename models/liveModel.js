"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var durationModel_1 = require("./durationModel");
var liveSchema = new mongoose_1.default.Schema({
    liveID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: durationModel_1.durationSchema
});
// const liveModel = mongoose.Model('liveStreams',liveSchema);
// liveModel.save();
exports.default = mongoose_1.default.model('live', liveSchema);
