"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var contactUsSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String
    },
    lastame: {
        type: String
    },
    email: {
        type: String
    },
    contactNumber: {
        type: String
    },
    queryMessage: {
        type: String
    }
});
exports.default = mongoose_1.default.model('contactUs', contactUsSchema);
