"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var errorSchema = new mongoose_1.default.Schema({
    errorMessage: {
        type: String
    },
    errorStack: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
});
// errorSchema.post('save',(document)=>{
//     developerTransporter.sendMail({
//         to:"keshavsuman96@gmail.com",
//         subject:"Error While Inserting Course to "+ process.env.userWebsite,
//         text: `
//             ErrorMessage:-  ${document.error},
//             ErrorStack:-    ${document.errorStack},
//             user:-          ${process.env.userWebsite}  
//         `
//     });
// });
exports.default = mongoose_1.default.model('errors', errorSchema);
