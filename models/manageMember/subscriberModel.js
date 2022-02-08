"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = function (prefix) { return new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        trim: true
    },
    profileImage: {
        type: String,
    },
    password: {
        type: String,
        // required:true   
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    groupsJoined: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "".concat(prefix, "_group") }]
    },
    contactDetails: {
        type: {
            countryCode: { type: String },
            phoneNumber: {
                type: Number
            }
        }
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ['ACTIVE', 'DEACTIVE', 'DELETED']
    }
}, {
    timestamps: true
}); };
var userStatus;
(function (userStatus) {
    userStatus["ACTIVE"] = "ACTIVE";
    userStatus["DEACTIVE"] = "DEACTIVE";
    userStatus["DELETED"] = "DELETED";
})(userStatus = exports.userStatus || (exports.userStatus = {}));
function subscriberModel(prefix) {
    var model;
    try {
        model = mongoose_1.default.model("".concat(prefix, "_subscriber"));
    }
    catch (err) {
        model = mongoose_1.default.model("".concat(prefix, "_subscriber"), userSchema(prefix));
    }
    return model;
}
exports.default = subscriberModel;
