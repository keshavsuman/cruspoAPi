"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var roomSchema = function (prefix) { return new mongoose_1.default.Schema({
    room_id: {
        type: String,
    },
    room_name: {
        type: String,
    },
    room_description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    recording_info: {
        type: {
            enabled: Boolean,
            upload_info: {
                type: String,
                location: String,
                prefix: String,
                credentials: Map,
                options: Map,
            }
        }
    }
}); };
function RooomModel(prefix) {
    return mongoose_1.default.model(prefix + '_room', roomSchema(prefix));
}
exports.default = RooomModel;
