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
exports.sendSubscribeMail = exports.sendMailToFormResponse = exports.sendMailForWebsiteRequest = exports.sendRemainderMail = exports.sendAppointmentRemainderMail = exports.sendRemainderMailTest = exports.sendDownloadFormMail = exports.sendResetPasswordMailToLearner = exports.sendResetPasswordMailToCreator = exports.sendFormSubmissionMailToUser = exports.sendFormSubmissionMailToCreator = exports.sendLearnerRegisterMailToCreator = void 0;
var templates_mail_1 = __importDefault(require("./templates.mail"));
var transporters = __importStar(require("./transporters.mail"));
var mailTemplateModel_1 = __importDefault(require("../../models/mail/mailTemplateModel"));
var mailAdminTemplateModel_1 = __importDefault(require("../../models/mail/mailAdminTemplateModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment_1 = __importDefault(require("moment"));
var learnerModel_1 = __importDefault(require("../../models/manageMember/learnerModel"));
var cruspoFormSubmissionModel_1 = __importDefault(require("../../models/forms/cruspoFormSubmissionModel"));
var axios_1 = __importDefault(require("axios"));
function sendLearnerRegisterMailToCreator(to) {
    return __awaiter(this, void 0, void 0, function () {
        var mail;
        return __generator(this, function (_a) {
            try {
                mail = {
                    to: to,
                    from: 'developer@cruspo.com',
                    subject: templates_mail_1.default.learner_register_for_creator_subject(),
                    text: templates_mail_1.default.learner_register_for_creator(),
                };
                transporters.developerTransporter.sendMail(mail);
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.sendLearnerRegisterMailToCreator = sendLearnerRegisterMailToCreator;
function sendFormSubmissionMailToCreator(to, title, userName, data) {
    return __awaiter(this, void 0, void 0, function () {
        var template, parsedBody, parsedSubject, mail, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mailAdminTemplateModel_1.default(userName).findOne({ mailEvent: title })];
                case 1:
                    template = _a.sent();
                    if (template) {
                        parsedBody = eval('`' + template['body'] + '`');
                        parsedSubject = eval('`' + template['subject'] + '`');
                        mail = {
                            to: to,
                            from: 'developer@cruspo.com',
                            subject: parsedSubject,
                            text: parsedBody,
                        };
                        transporters.developerTransporter.sendMail(mail);
                    }
                    else {
                        console.log('template not found');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendFormSubmissionMailToCreator = sendFormSubmissionMailToCreator;
function sendFormSubmissionMailToUser(title, data, creator) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, template, parsedBody, parsedSubject, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, transporters.getCreatorTransport(creator)];
                case 1:
                    transporter = _a.sent();
                    return [4 /*yield*/, mailTemplateModel_1.default(creator['userName']).findOne({ mailEvent: title })];
                case 2:
                    template = _a.sent();
                    // var d = moment(new Date(2021,7,7)).format('LLLL');
                    if (template) {
                        parsedBody = eval('`' + template['body'] + '`');
                        parsedSubject = eval('`' + template['subject'] + '`');
                        transporter === null || transporter === void 0 ? void 0 : transporter.sendMail({
                            subject: parsedSubject,
                            text: parsedBody,
                            to: data['email'],
                            from: creator['firstName'] + " " + creator['lastName'] + " <" + creator['email'] + ">",
                        });
                    }
                    else {
                        console.log('template not found');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sendFormSubmissionMailToUser = sendFormSubmissionMailToUser;
function sendResetPasswordMailToCreator(email, link) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transporters.developerTransporter.sendMail({
                        to: email,
                        from: 'developer@cruspo.com',
                        subject: 'Reset Password',
                        text: link,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendResetPasswordMailToCreator = sendResetPasswordMailToCreator;
function sendResetPasswordMailToLearner(email, link) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.sendResetPasswordMailToLearner = sendResetPasswordMailToLearner;
function sendDownloadFormMail(to, name) {
    return __awaiter(this, void 0, void 0, function () {
        var link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    link = 'https://www.amazon.in/Flight-Spiritual-Awakening-discoveries-revelations-ebook/dp/B0894YVWXZ/ref=sr_1_1?crid=358817BFTFJH4&dchild=1&keywords=the+flight+to+spiritual+awakening&qid=1612557605&sprefix=the+flight+to+spiritual+%2Caps%2C266&sr=8-1';
                    return [4 /*yield*/, transporters.developerTransporter.sendMail({
                            to: to,
                            from: 'developer@cruspo.com',
                            subject: templates_mail_1.default.downloadForm_mail_subject(),
                            text: templates_mail_1.default.downloadForm_mail(name, String(process.env.userWebsite), link, String(process.env.userMail)),
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendDownloadFormMail = sendDownloadFormMail;
function sendRemainderMailTest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, learners, template, messages, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    token = jsonwebtoken_1.default.verify(req.body.payload, String(process.env.userId));
                    return [4 /*yield*/, learnerModel_1.default(res.get('userName')).find({ $in: { 'batchesJoined': token['batchId'] } })];
                case 1:
                    learners = _b.sent();
                    return [4 /*yield*/, mailTemplateModel_1.default(res.get('userName')).find({ templateName: token['templateName'] })];
                case 2:
                    template = _b.sent();
                    messages = [];
                    learners === null || learners === void 0 ? void 0 : learners.forEach(function (learner) {
                        var firstName = learner.firstName;
                        var lastName = learner.lastName;
                        var d = moment_1.default().add(15, 'minute').format('LLLL');
                        var templateLiteral = eval('`' + template[0]['body'] + '`');
                        messages.push({
                            to: learner.email,
                            from: "Developer <developer@cruspo.com>",
                            subject: template[0]['subject'],
                            text: templateLiteral,
                        });
                    });
                    while (transporters.developerTransporter.isIdle() && messages.length) {
                        transporters.developerTransporter.sendMail((_a = messages.shift()) !== null && _a !== void 0 ? _a : {});
                    }
                    transporters.developerTransporter.close();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.log(error_3);
                    res.status(401).send(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sendRemainderMailTest = sendRemainderMailTest;
function sendAppointmentRemainderMail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, template, d, templateLiteral, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = jsonwebtoken_1.default.verify(req.body.payload, String(process.env.userId));
                    return [4 /*yield*/, mailTemplateModel_1.default(res.get('userName')).find({ templateName: token['templateName'] })];
                case 1:
                    template = _a.sent();
                    d = moment_1.default().add(15, 'minute').format('LLLL');
                    templateLiteral = eval('`' + template[0]['body'] + '`');
                    // transporters.getCreatorTransport().then((transporter)=>{
                    //     transporter?.sendMail({
                    //                 to:token['receiverMail'],
                    //                 from: process.env.userName+"<"+process.env.userMail+">",
                    //                 subject:template[0]['subject'],
                    //                 text:templateLiteral,
                    //         });
                    // });
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendAppointmentRemainderMail = sendAppointmentRemainderMail;
function sendRemainderMail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // var arr = ['Gurpreet.kaur.ghai@gmail.com','nitikagoelsj@gmail.com','umarathi@gmail.com','nirmala.palukuri@gmail.com'];
                // var name = ['Harkeerat','Nitika','Uma','Nirmala'];
                // for (var i=0;i<arr.length;i++)
                // {
                // var transporter = await transporters.getCreatorTransport();
                // transporter?.sendMail({
                //     to: arr[i],
                //     from: 'Sapna shah <educationist.sapnashah15@gmail.com>',
                //     subject: 'Reminder: Session with Sapna Shah',
                //     text: `Dear ${name[i]},
                //     This is a friendly reminder for your upcoming Session with Sapna Shah on 25 June 2021, Friday at 7:00 AM IST. 
                //     You can join this session with your smartphone, tablet or pc
                //     Join Session
                //     https://us04web.zoom.us/j/7308147568?pwd=RHRXcnlobSszV0FWOTJkVFYwNnRrZz09
                //     In case of any queries or concerns, feel free to contact me on educationist.sapnashah15@gmail.com or call +919820294061
                //     Best
                //     Sapna Shah`,
                // });
                // }
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.sendRemainderMail = sendRemainderMail;
function sendMailForWebsiteRequest(domainName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                transporters.developerTransporter.sendMail({
                    to: 'management@cruspo.com',
                    from: 'developer@cruspo.com',
                    subject: 'Request for Website',
                    text: "\n                From " + process.env.userMail + ",\n                userName: " + process.env.USERNAME + ",\n                domainName: " + domainName + "\n            "
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
/**
 * body:{
 *      "templateName":"",
 *      "formTitle":"",
 * }
 * */
function sendMailToFormResponse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var mailTemplate, recipients, payload, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mailTemplateModel_1.default(res.get('userName')).find({ templateName: req.body.templateName })];
                case 1:
                    mailTemplate = _a.sent();
                    return [4 /*yield*/, cruspoFormSubmissionModel_1.default(req.headers.origin).find({ purpose: req.body.formTitle }).skip(480).limit(480)];
                case 2:
                    recipients = _a.sent();
                    if (recipients.length > 500) {
                        res.status(400).send({ message: "you can only send 500 mail in the timespan of 24 hours" });
                        res.end();
                    }
                    payload = {
                        from: req.body.from,
                        mailTemplate: mailTemplate[0],
                        recipients: recipients,
                        creatorId: process.env.userId
                    };
                    return [4 /*yield*/, axios_1.default.post('http://localhost:6666/creator/sendBulkMail', payload)];
                case 3:
                    response = _a.sent();
                    res.status(200).send();
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(400).send();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.sendMailToFormResponse = sendMailToFormResponse;
function sendSubscribeMail(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                transporters.managementTransporter.sendMail({
                    to: user,
                    from: 'Cruspo community <management@cruspo.com>',
                    subject: 'Congrats, You\'re in',
                    text: "Hey,\n\nFirst off, we\u2019d like to extend a warm welcome and \u2018thank you\u2019 for subscribing to the Cruspo Exclusive Community. We recognize that your time is valuable and we're seriously flattered that you chose to join us.\n\nThe Cruspo blog endeavors to send you only the best content, with actionable steps you can take to grow as a Content Creator. If we ever stray from that, just send us an email and we'll do our damndest to get it straightened out.\n\nIn the meantime, we\u2019d love to hear from you about why you\u2019ve subscribed to our list, and what you\u2019re interested in learning about. So long as you reply to this email, we promise we will too.\n\nIf you need anything, please feel free to give us a shout at namaste@cruspo.com\n\nBest,\n\nTeam Cruspo",
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.sendSubscribeMail = sendSubscribeMail;
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
