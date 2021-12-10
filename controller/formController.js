"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.paidSubmit = exports.register = exports.downloadForm = exports.subscribe = exports.createForm = void 0;
var downloadFormModel_1 = __importDefault(require("../models/downloadFormModel"));
var subscribeModel_1 = __importDefault(require("../models/subscribeModel"));
var mailSender = __importStar(require("./mail/sendMailController"));
var cruspoFormSubmissionModel_1 = __importDefault(require("../models/forms/cruspoFormSubmissionModel"));
var formModel_1 = __importDefault(require("../models/forms/formModel"));
var axios_1 = __importDefault(require("axios"));
var RazorpayController = __importStar(require("../controller/payment/razorpayController"));
var jwt = __importStar(require("jsonwebtoken"));
var paymentOrderModel_1 = __importDefault(require("../models/payment/paymentOrderModel"));
function createForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var form, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(res.get('userName'));
                    return [4 /*yield*/, formModel_1.default(res.get('userName')).create(__assign(__assign({}, req.body), { createdBy: res.get('_id') }))];
                case 1:
                    form = _a.sent();
                    res.status(200).json(form);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createForm = createForm;
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, subscribeModel_1.default.create({
                            'email': req.body.email,
                        })];
                case 1:
                    _a.sent();
                    // console.log(res.get('userEmail'));
                    // mailSender.sendFormSubmissionMailToCreator(res.get('userEmail'),'Subscribe Form',res.get('userEmail'),req.body);
                    mailSender.sendSubscribeMail(req.body.email);
                    res.redirect('https://' + req.query.redirect);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).send(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.subscribe = subscribe;
function downloadForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, downloadFormModel_1.default.create({
                            'email': req.body.email,
                            'name': req.body.name
                        })];
                case 1:
                    _a.sent();
                    // createOrder();
                    mailSender.sendDownloadFormMail(req.body.email, req.body.name);
                    res.redirect('https://' + req.query.redirect);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(400).send(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.downloadForm = downloadForm;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, formData, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.post(String(process.env.authenticationURL) + '/creator/getCreatorDetails', {
                            select: { domainNames: { $in: [req.body.domainName] } },
                            project: { email: 1, _id: 0, userName: 1, refreshToken: 1, firstName: 1, lastName: 1 }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, (cruspoFormSubmissionModel_1.default(response.data.userName).create(req.body))];
                case 2:
                    formData = _a.sent();
                    formData.set('title', req.params.title);
                    return [4 /*yield*/, formData.save()];
                case 3:
                    _a.sent();
                    if (req.body.email) {
                        mailSender.sendFormSubmissionMailToUser(req.params.title, req.body, response.data);
                        mailSender.sendFormSubmissionMailToCreator(response.data.email, req.params.title, response.data.userName, req.body);
                    }
                    res.redirect(req.protocol + '://' + req.query.redirect);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    res.status(500).send(e_1);
                    console.log(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function paidSubmit(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, form, formData, paymentOrder, order, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    console.log(req.headers.host);
                    return [4 /*yield*/, axios_1.default.post(String(process.env.authenticationURL) + '/creator/getCreatorDetails', {
                            select: { domainNames: { $in: [req.headers.host] } },
                            project: { email: 1, _id: 0, userName: 1, refreshToken: 1, firstName: 1, lastName: 1, razorpayDetails: 1 }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, formModel_1.default(response.data.userName).findById(req.params.formId)];
                case 2:
                    form = _a.sent();
                    if (!form) return [3 /*break*/, 10];
                    return [4 /*yield*/, (cruspoFormSubmissionModel_1.default(response.data.userName).create(req.body))];
                case 3:
                    formData = _a.sent();
                    formData.set('title', req.params.title);
                    if (!form.isPaid) return [3 /*break*/, 7];
                    formData.set('paymentStatus', false);
                    return [4 /*yield*/, formData.save()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, paymentOrderModel_1.default(response.data.userName).findById(form.paymentOrderId)];
                case 5:
                    paymentOrder = _a.sent();
                    return [4 /*yield*/, RazorpayController.createOrder(response.data, paymentOrder.paymentOrderAmount, 'INR', response.data.razorpayDetails.access_token, 'FORM')];
                case 6:
                    order = _a.sent();
                    if (order) {
                        res.redirect("https://" + req.headers.host + "/payment/collectPayment?order_id=" + order.paymentLog._id);
                    }
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, formData.save()];
                case 8:
                    _a.sent();
                    mailSender.sendFormSubmissionMailToUser(req.params.title, req.body, response.data);
                    mailSender.sendFormSubmissionMailToCreator(response.data.email, req.params.title, response.data.userName, req.body);
                    res.redirect(form.redirectUrl);
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    res.status(404).send('Form not found');
                    _a.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send(error_4);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.paidSubmit = paidSubmit;
function decryptToken(token) {
    var decoded = jwt.decode(token);
    return decoded;
}
