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
exports.uploadAppointmentThumbnail = exports.bookAppointment = exports.deleteAppointment = exports.unpublishAppointment = exports.saveAndPublishAppointment = exports.saveAppointment = exports.insertAppointment = exports.getEditAppointment = exports.getAppointments = void 0;
var appointmentModel_1 = __importDefault(require("../../models/appointmentModel"));
var razorpay_1 = __importDefault(require("razorpay"));
var imageUploadCotroller_1 = require("../imageUploadCotroller");
var currencyModel_1 = __importDefault(require("../../models/currencyModel"));
var notificationModel_1 = __importDefault(require("../../models/notificationModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var appointmentsBookingModel_1 = __importDefault(require("../../models/appointmentsBookingModel"));
function getAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var currency, notifications, appointmentsBooking, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, currencyModel_1.default.find()];
                case 1:
                    currency = _a.sent();
                    return [4 /*yield*/, notificationModel_1.default.find().limit(10)];
                case 2:
                    notifications = _a.sent();
                    ;
                    return [4 /*yield*/, appointmentsBookingModel_1.default.find({})];
                case 3:
                    appointmentsBooking = _a.sent();
                    return [4 /*yield*/, appointmentModel_1.default.find().limit(50)];
                case 4:
                    data = _a.sent();
                    res.render('admin/appointments.ejs', {
                        appointments: data,
                        currencies: currency,
                        notifications: notifications,
                        // user:user,
                        appointmentsBooking: appointmentsBooking
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getAppointments = getAppointments;
function getEditAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var currency, notifications, appointment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, currencyModel_1.default.find()];
                case 1:
                    currency = _a.sent();
                    return [4 /*yield*/, notificationModel_1.default.find().limit(10)];
                case 2:
                    notifications = _a.sent();
                    return [4 /*yield*/, appointmentModel_1.default.findById(req.params.appointmentID)];
                case 3:
                    appointment = _a.sent();
                    res.render('admin/edit-appointment.ejs', {
                        currencies: currency,
                        appointment: appointment,
                        notifications: notifications
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getEditAppointment = getEditAppointment;
function insertAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = jsonwebtoken_1.default.verify(req.cookies.authToken, String(process.env.userId));
                    return [4 /*yield*/, appointmentModel_1.default.create({
                            appointmentTitle: req.body.appointmentTitle,
                            appointmentDescription: req.body.appointmentDescription,
                            appointmentCreatorId: user.creatorId,
                            appointmentThumbnail: req.file.location,
                            currency: JSON.parse(req.body.currency),
                            appointmentPrice: req.body.appointmentPrice,
                            status: 'DRAFT'
                        })];
                case 1:
                    data = _a.sent();
                    res.redirect('/admin/appointment/edit/' + data['_id']);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertAppointment = insertAppointment;
;
function saveAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userData, duration, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userData = jsonwebtoken_1.default.verify(req.cookies.authToken, String(process.env.userId));
                    duration = {
                        hours: req.body.hoursValue,
                        minutes: req.body.minsValue
                    };
                    return [4 /*yield*/, appointmentModel_1.default.findByIdAndUpdate(req.body.appointmentId, {
                            appointmentTitle: req.body.appointmentTitle,
                            appointmentCreatorId: userData.creatorId,
                            appointmentDescription: req.body.appointmentDescription,
                            appointmentThumbnail: req.body.appointmentThumbnail,
                            currency: JSON.parse(req.body.currency),
                            appointmentPrice: req.body.appointmentPrice,
                            // duration:duration,
                            timeZone: req.body.timeZone,
                            status: 'DRAFT'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send('SAVED');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(400).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.saveAppointment = saveAppointment;
;
function saveAndPublishAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userData, duration, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userData = jsonwebtoken_1.default.verify(req.cookies.authToken, String(process.env.userId));
                    duration = {
                        hours: req.body.hoursValue,
                        minutes: req.body.minsValue
                    };
                    return [4 /*yield*/, appointmentModel_1.default.findByIdAndUpdate(req.body.appointmentId, {
                            appointmentTitle: req.body.appointmentTitle,
                            appointmentCreatorId: userData.creatorId,
                            appointmentDescription: req.body.appointmentDescription,
                            appointmentThumbnail: req.body.appointmentThumbnail,
                            currency: JSON.parse(req.body.currency),
                            appointmentPrice: req.body.appointmentPrice,
                            // duration:duration,
                            timeZone: req.body.timeZone,
                            status: 'PUBLISHED'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send("PUBLISHED");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).send(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.saveAndPublishAppointment = saveAndPublishAppointment;
;
function unpublishAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentModel_1.default.findByIdAndUpdate(req.body.appointmentId, {
                            status: 'UNPUBLISHED'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send('UNPUBLISHED');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.unpublishAppointment = unpublishAppointment;
;
function deleteAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                appointmentModel_1.default.findByIdAndDelete(req.body.appointmentId);
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.deleteAppointment = deleteAppointment;
;
function bookAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var instance, options;
        return __generator(this, function (_a) {
            try {
                instance = new razorpay_1.default({ key_id: process.env.KEYID, key_secret: process.env.KEYSECRET });
                options = {
                    amount: 50000,
                    currency: "INR",
                    receipt: "order_rcptid_11"
                };
                //   instance.orders.create(options, function(err, order) {
                //     console.log(order);
                //   });
                //   sendAppointmentMail()
            }
            catch (error) {
            }
            return [2 /*return*/];
        });
    });
}
exports.bookAppointment = bookAppointment;
function uploadAppointmentThumbnail(req, res, next) {
    var upload = imageUploadCotroller_1.multerUpload.single('appointmentThumbnail');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('image uploaded');
            next();
        }
    });
}
exports.uploadAppointmentThumbnail = uploadAppointmentThumbnail;
