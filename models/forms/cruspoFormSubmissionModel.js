"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var formSubmissionSchema = new mongoose_1.default.Schema({}, { strict: false });
function cruspoFormSubmissions(prefix) {
    var cruspoForm;
    try {
        cruspoForm = mongoose_1.default.model(prefix + "_formSubissions");
    }
    catch (error) {
        cruspoForm = mongoose_1.default.model(prefix + "_formSubmissions", formSubmissionSchema);
    }
    return cruspoForm;
}
exports.default = cruspoFormSubmissions;
