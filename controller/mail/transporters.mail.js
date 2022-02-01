"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatorTransporter = exports.developerTransporter = exports.managementTransporter = void 0;
var nodemailer = require('nodemailer');
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
var creatorTransporter = function (user, refreshToken, accessToken) {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: user,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: refreshToken,
            accessToken: accessToken,
        }
        // service: 'Gmail',
        // auth: {
        //   XOAuth2: {
        //     user: user,
        //     clientId:process.env.GOOGLE_CLIENT_ID,
        //     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        //     refreshToken: refreshToken,
        //     accessToken: accessToken,
        //   }
        // }
    });
};
exports.creatorTransporter = creatorTransporter;
// export const getCreatorTransport = async (email,refreshToken,accessToken) =>{
//     try {
//          return nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 type:'OAuth2',
//                 user:email,
//                 clientId:process.env.GOOGLE_CLIENT_ID,
//                 clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//                 refreshToken:refreshToken,
//                 accessToken:accessToken
//             },
//             pool:true,
//         }); 
//     } catch (error) {
//         console.log(error);   
//         return null;
//     }
// }
