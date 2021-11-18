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
exports.collectPayment = exports.pay = exports.verifySignature = void 0;
var crypto_1 = __importDefault(require("crypto"));
var paymentLogModel_1 = __importStar(require("../../models/payment/paymentLogModel"));
var axios_1 = __importDefault(require("axios"));
var appointmentModel_1 = __importDefault(require("../../models/appointmentModel"));
function createOrder(user, price, currency, access_token, paymentFor) {
    return __awaiter(this, void 0, void 0, function () {
        var order, paymentLog, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post('https://api.razorpay.com/v1/orders', {
                            "amount": price,
                            "currency": currency,
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            }
                        })];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, paymentLogModel_1.default.create({
                            user: user,
                            razorpayOrderId: order.data.id,
                            razorpayPublicToken: order.data.public_token,
                            paymentFor: paymentFor,
                            paymentStatus: paymentLogModel_1.PaymentStatus.PENDING,
                            currency: currency,
                            amount: price,
                        })];
                case 2:
                    paymentLog = _a.sent();
                    return [2 /*return*/, { order: order.data, paymentLog: paymentLog }];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function verifySignature(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var update, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, isSignatureVerified(req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature)];
                case 1:
                    update = _a.sent();
                    if (update) {
                        switch (update['paymentFor']) {
                            case 'APPOINTMENT':
                                res.status;
                                res.redirect('https://' + process.env.userWebsite);
                                break;
                            case 'MISCELLANEOUS':
                                res.redirect('https://' + process.env.userWebsite);
                                break;
                            default:
                                res.redirect('https://' + process.env.userWebsite);
                                console.log('Nothing happened');
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.send('failed to verify your payment please contact to site Owner');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.verifySignature = verifySignature;
;
function isSignatureVerified(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    return __awaiter(this, void 0, void 0, function () {
        var body, expectedSignature, update, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    body = razorpay_order_id + '|' + razorpay_payment_id;
                    expectedSignature = crypto_1.default.
                        createHmac("sha256", String(process.env.KEYSECRET)).
                        update(body.toString())
                        .digest('hex');
                    if (!(razorpay_signature === expectedSignature)) return [3 /*break*/, 2];
                    return [4 /*yield*/, paymentLogModel_1.default.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, {
                            razorpayPaymentID: razorpay_payment_id,
                            razorpaySignature: razorpay_signature,
                            paymentStatus: paymentLogModel_1.PaymentStatus.SUCCESS
                        }, { new: true })];
                case 1:
                    update = _a.sent();
                    return [2 /*return*/, update];
                case 2: return [2 /*return*/, false];
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function pay(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, appointment, order, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(req.body.collectionType === 'appointment')) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1.default.post(String(process.env.authenticationURL) + '/creator/getCreatorDetails', {
                            select: {
                                domainNames: { $in: [req.body.domainName] }
                            },
                            project: {
                                _id: 1,
                                userName: 1,
                                firstName: 1,
                                lastName: 1,
                                profileImage: 1,
                                razorpayDetails: 1,
                            }
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, appointmentModel_1.default(response.data.userName).findById(req.body.appointmentId).populate('currency')];
                case 2:
                    appointment = _a.sent();
                    if (!appointment) return [3 /*break*/, 4];
                    return [4 /*yield*/, createOrder(response.data, appointment.appointmentPrice, appointment.currency.get('name'), response.data.razorpayDetails.access_token, 'APPOINTMENT')];
                case 3:
                    order = _a.sent();
                    res.status(201).send(order);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).json({
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.pay = pay;
function collectPayment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var paymentLog, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, paymentLogModel_1.default.findById(req.query.order_id)];
                case 1:
                    paymentLog = _a.sent();
                    res.render('razorpay.ejs', {
                        keyId: paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.razorpayPublicToken,
                        orderId: paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.razorpayOrderId,
                        amount: paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.amount,
                        currency: paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.currency,
                        description: '',
                        name: (paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.user.get('firstName')) + ' ' + (paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.user.get('lastName')),
                        profileImage: paymentLog === null || paymentLog === void 0 ? void 0 : paymentLog.user.get('profileImage'),
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.collectPayment = collectPayment;
