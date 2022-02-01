"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailOnFormResponse_creator = exports.sendMailOnFormResponse_user = exports.sendMailForWebsiteRequest = exports.sendRemainderMailTest = void 0;
var transporters_mail_1 = require("./transporters.mail");
var mailTemplateModel_1 = __importDefault(require("../../models/mail/mailTemplateModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment_1 = __importDefault(require("moment"));
var subscriberModel_1 = __importDefault(require("../../models/manageMember/subscriberModel"));
function sendRemainderMailTest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, learners, template, messages, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    token = jsonwebtoken_1.default.verify(req.body.payload, String(process.env.userId));
                    return [4 /*yield*/, (0, subscriberModel_1.default)(res.get('userName')).find({ $in: { 'batchesJoined': token['batchId'] } })];
                case 1:
                    learners = _b.sent();
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).find({ templateName: token['templateName'] })];
                case 2:
                    template = _b.sent();
                    messages = [];
                    learners === null || learners === void 0 ? void 0 : learners.forEach(function (learner) {
                        var firstName = learner.firstName;
                        var lastName = learner.lastName;
                        var d = (0, moment_1.default)().add(15, 'minute').format('LLLL');
                        var templateLiteral = eval('`' + template[0]['body'] + '`');
                        messages.push({
                            to: learner.email,
                            from: "Developer <developer@cruspo.com>",
                            subject: template[0]['subject'],
                            text: templateLiteral,
                        });
                    });
                    while (transporters_mail_1.developerTransporter.isIdle() && messages.length) {
                        transporters_mail_1.developerTransporter.sendMail((_a = messages.shift()) !== null && _a !== void 0 ? _a : {});
                    }
                    transporters_mail_1.developerTransporter.close();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(401).send(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sendRemainderMailTest = sendRemainderMailTest;
// export async function sendAppointmentRemainderMail(req:Request,res:Response){
//     try {
//         var token:any = jsonwebtoken.verify(req.body.payload,String(process.env.userId));
//         var template = await mailTemplateModel(res.get('userName')).find({templateName:token['templateName']});
//             var d = moment().add(15,'minute').format('LLLL');
//             var templateLiteral = eval('`'+template[0]['body']+'`');
//             // transporters.getCreatorTransport().then((transporter)=>{
//             //     transporter?.sendMail({
//             //                 to:token['receiverMail'],
//             //                 from: process.env.userName+"<"+process.env.userMail+">",
//             //                 subject:template[0]['subject'],
//             //                 text:templateLiteral,
//             //         });
//             // });
//         res.status(201).send();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
function sendMailForWebsiteRequest(domainName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                transporters_mail_1.developerTransporter.sendMail({
                    to: 'management@cruspo.com',
                    from: 'developer@cruspo.com',
                    subject: 'Request for Website',
                    text: "\n                From ".concat(process.env.userMail, ",\n                userName: ").concat(process.env.USERNAME, ",\n                domainName: ").concat(domainName, "\n            ")
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.sendMailForWebsiteRequest = sendMailForWebsiteRequest;
function sendMailOnFormResponse_user(templateId, data, creator) {
    return __awaiter(this, void 0, void 0, function () {
        var template, transporter, subject, body, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(creator.userName).findById(templateId)];
                case 1:
                    template = _a.sent();
                    transporter = (0, transporters_mail_1.creatorTransporter)(creator.email, creator.refreshToken, creator.accessToken);
                    subject = eval('`' + (template === null || template === void 0 ? void 0 : template.subject) + '`');
                    body = eval('`' + (template === null || template === void 0 ? void 0 : template.body) + '`');
                    transporter.sendMail({
                        to: data.email,
                        from: "".concat(creator.firstName, " ").concat(creator.lastName, "<").concat(creator.email, ">"),
                        subject: subject,
                        text: body,
                    });
                    return [2 /*return*/];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendMailOnFormResponse_user = sendMailOnFormResponse_user;
function sendMailOnFormResponse_creator(templateName, data, creator) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // const template = await mailTemplateModel(creator.userName).find({templateName:templateName});
                // const transporter = managementTransporter;
                // managementTransporter
                // const subject = eval('`'+template[0]['subject']+'`');
                // const body = eval('`'+template[0]['body']+'`');
                // transporter.sendMail({
                //     to:data.email,
                //     from:`${creator.firstName} ${creator.lastName}<${creator.email}>`,
                //     subject:subject,
                //     text:body,
                // });
                // var mailTemplate = await mailTemplateModel(creator.userName).find({templateName:req.body.templateName});
                // var recipients = await cruspoFormModel(req.headers.origin!).find({purpose:req.body.formTitle}).skip(480).limit(480);
                // if(recipients.length>500)
                // {
                //     res.status(400).send({message:"you can only send 500 mail in the timespan of 24 hours"});
                //     res.end(); 
                // }
                // var payload = {
                //     from:req.body.from,
                //     mailTemplate:mailTemplate[0],
                //     recipients:recipients,
                //     creatorId:process.env.userId
                // }
                // var response = await axios.post('http://localhost:6666/creator/sendBulkMail',payload);
                // res.status(200).send();
            }
            catch (error) {
                console.log(error);
                // res.status(400).send();
            }
            return [2 /*return*/];
        });
    });
}
exports.sendMailOnFormResponse_creator = sendMailOnFormResponse_creator;
// export async function sendSubscribeMail(user:string){
//     try {
//         managementTransporter.sendMail({
//             to: user,
//             from: 'Cruspo community <management@cruspo.com>',
//             subject: 'Congrats, You\'re in',
//             text: `Hey,
// First off, we’d like to extend a warm welcome and ‘thank you’ for subscribing to the Cruspo Exclusive Community. We recognize that your time is valuable and we're seriously flattered that you chose to join us.
// The Cruspo blog endeavors to send you only the best content, with actionable steps you can take to grow as a Content Creator. If we ever stray from that, just send us an email and we'll do our damndest to get it straightened out.
// In the meantime, we’d love to hear from you about why you’ve subscribed to our list, and what you’re interested in learning about. So long as you reply to this email, we promise we will too.
// If you need anything, please feel free to give us a shout at namaste@cruspo.com
// Best,
// Team Cruspo`,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
function memorySizeOf(obj) {
    var bytes = 0;
    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    }
                    else
                        bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    }
    ;
    function formatByteSize(bytes) {
        if (bytes < 1024)
            return bytes + " bytes";
        else if (bytes < 1048576)
            return (bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824)
            return (bytes / 1048576).toFixed(3) + " MiB";
        else
            return (bytes / 1073741824).toFixed(3) + " GiB";
    }
    ;
    return formatByteSize(sizeOf(obj));
}
;
