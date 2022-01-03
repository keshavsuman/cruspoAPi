"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.learnerStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var learnerSchema = new mongoose_1.default.Schema({
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
    programsPurchased: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "program" }]
    },
    batchesJoined: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "batch" }]
    },
    // learnerRefId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true
    // },
    groupsJoined: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "group" }]
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
});
var learnerStatus;
(function (learnerStatus) {
    learnerStatus["ACTIVE"] = "ACTIVE";
    learnerStatus["DEACTIVE"] = "DEACTIVE";
    learnerStatus["DELETED"] = "DELETED";
})(learnerStatus = exports.learnerStatus || (exports.learnerStatus = {}));
function subscriberModel(prefix) {
    return mongoose_1.default.model(prefix + "_subscriber", learnerSchema);
}
exports.default = subscriberModel;