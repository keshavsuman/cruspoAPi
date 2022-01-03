"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.developerTransporter = exports.managementTransporter = void 0;
var nodemailer = __importStar(require("nodemailer"));
exports.managementTransporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    port: 587,
    secure: false,
    auth: {
        user: 'management@cruspo.com',
        pass: 'YyajryAFUff3', // generated ethereal password
    },
});
exports.developerTransporter = nodemailer.createTransport({
    host: 'smtppro.zoho.in',
    port: 587,
    secure: false,
    auth: {
        user: 'developer@cruspo.com',
        pass: "HpP7EAt08H4E"
    }
});
// export async function getCreatorTransport(){
//     try {
//         var refreshToken = "1//0gE_Psyi5nNb9CgYIARAAGBASNwF-L9Iri6nSMv9cZLV7Z_vYt1udwVgAWywSPT8t8CkRjoV3b25aY_2U_iqhZicp91tawAyAFTY";
//         // google.oauth2();
//         // googleAuth.getAccessToken();
//         return nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 type:'OAuth2',
//                 user:'educationist.sapnashah15@gmail.com',
//                 clientId:process.env.GOOGLE_CLIENT_ID,
//                 clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//                 refreshToken:refreshToken,
//             },
//             pool:true,        }); 
//     } catch (error) {
//         console.log(error);   
//         return null;
//     }
// }
