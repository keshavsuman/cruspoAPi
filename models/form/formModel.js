"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var formSchema = new mongoose_1.default.Schema({
    formName: {
        type: String
    },
    isPaid: {
        type: Boolean
    },
    mailTemplate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    }
});
function formModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model(prefix + "_Form");
    }
    catch (error) {
        model = mongoose_1.default.model(prefix + "_Form", formSchema);
    }
    return model;
}
exports.default = formModel;
