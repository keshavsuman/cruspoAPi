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
exports.deleteAppointment = exports.updateAppointment = exports.createAppointments = exports.bookAppointment = exports.getBookedAppointments = exports.allAppointment = exports.getAppointment = void 0;
var appointmentModel_1 = __importDefault(require("../../models/appointmentModel"));
var appointmentsBookingModel_1 = __importDefault(require("../../models/appointmentsBookingModel"));
function getAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var appointment, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentModel_1.default(res.get('userName')).findById(req.params.id).populate('currency')];
                case 1:
                    appointment = _a.sent();
                    if (appointment) {
                        res.status(200).send(appointment);
                    }
                    else {
                        res.status(404).send({ message: "Appointment Not Found" });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(403).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAppointment = getAppointment;
function allAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var appointments, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentModel_1.default(res.get('userName')).find({}).populate('currency')];
                case 1:
                    appointments = _a.sent();
                    res.status(200).send(appointments);
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
exports.allAppointment = allAppointment;
function getBookedAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, bookedAppointment, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = {};
                    if (req.params.type === 'upcoming') {
                        body = {
                            $gte: ['$bookedDate', new Date(Date.now())]
                        };
                    }
                    else if (req.params.type === 'past') {
                        body = {
                            $lte: ['$bookedDate', new Date(Date.now())]
                        };
                    }
                    else {
                        res.status(406).send('Invalid Type');
                    }
                    return [4 /*yield*/, appointmentsBookingModel_1.default(res.get('userName')).aggregate([{
                                $match: {
                                    $expr: body
                                },
                            }, {
                                $lookup: {
                                    'from': 'appointments',
                                    'localField': 'appointmentId',
                                    'foreignField': '_id',
                                    'as': 'appointmentData'
                                },
                            }, {
                                '$addFields': {
                                    'appointment': {
                                        '$first': '$appointmentData'
                                    }
                                },
                            }, {
                                '$project': {
                                    'appointmetnData': 0,
                                    '__v': 0
                                }
                            }
                        ])];
                case 1:
                    bookedAppointment = _a.sent();
                    res.status(200).send(bookedAppointment);
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
exports.getBookedAppointments = getBookedAppointments;
function bookAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var appointment, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentsBookingModel_1.default(res.get('userName')).create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            appointmentId: req.params.appointmentId,
                            timings: {
                                startTime: req.body.timings.startTime,
                                endTime: req.body.timings.endTime
                            },
                            bookedDate: req.body.bookedDate,
                        })];
                case 1:
                    appointment = _a.sent();
                    res.status(201).send('APPOINTMENT_BOOKED');
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(401).send(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.bookAppointment = bookAppointment;
function createAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var appointment, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, appointmentModel_1.default(res.get('userName')).create({
                            'status': 'DRAFT',
                            'appointmentTitle': req.body.appointmentTitle,
                            'appointmentThumbnail': req.body.appointmentThumbnail,
                            'appointmentDescription': req.body.appointmentDescription,
                            'appointmentPrice': req.body.appointmentPrice,
                            'currency': req.body.currency,
                            'isPaid': req.body.isPaid
                        })];
                case 1:
                    appointment = _a.sent();
                    return [4 /*yield*/, appointment.save()];
                case 2:
                    _a.sent();
                    res.status(201).send('APPOINTMENT_CREATED');
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(500).send(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createAppointments = createAppointments;
function updateAppointment(req, res) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var appointment, error_6;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 5, , 6]);
                    console.log(req.body);
                    return [4 /*yield*/, appointmentModel_1.default(res.get('userName')).findById(req.body.appointmentId)];
                case 1:
                    appointment = _g.sent();
                    if (!appointment) return [3 /*break*/, 3];
                    appointment.appointmentTitle = req.body.appointmentTitle;
                    appointment.appointmentDescription = req.body.appointmentDescription;
                    appointment.appointmentThumbnail = (_a = req.body.appointmentThumbnail) !== null && _a !== void 0 ? _a : appointment.appointmentThumbnail;
                    appointment.currency = (_b = req.body.currency) !== null && _b !== void 0 ? _b : appointment.currency;
                    appointment.appointmentPrice = (_c = req.body.appointmentPrice) !== null && _c !== void 0 ? _c : appointment.appointmentPrice;
                    appointment.status = (_d = req.body.status) !== null && _d !== void 0 ? _d : appointment.status;
                    appointment.timezone = (_e = req.body.timezone) !== null && _e !== void 0 ? _e : appointment.timezone;
                    appointment.duration = (_f = req.body.duration) !== null && _f !== void 0 ? _f : appointment.duration;
                    appointment.schedule = req.body.schedule;
                    if (req.body.mode == 'save') {
                        appointment.status = 'DRAFT';
                    }
                    if (req.body.mode == 'save-and-publish') {
                        appointment.status = 'PUBLISHED';
                    }
                    if (req.body.mode == 'unpublish') {
                        appointment.status = 'UNPUBLISHED';
                    }
                    return [4 /*yield*/, appointment.save()];
                case 2:
                    _g.sent();
                    res.status(200).send('APPOINTMENT_UPDATED');
                    return [3 /*break*/, 4];
                case 3:
                    res.status(500).send("Appointment with this Id doesn't exists");
                    _g.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _g.sent();
                    console.log(error_6);
                    res.status(500).send(error_6);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateAppointment = updateAppointment;
function deleteAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.id, {
                            'status': 'DELETED'
                        })];
                case 1:
                    _a.sent();
                    res.status(201).send('APPOINTMENT_DELETED');
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    res.status(400).send(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAppointment = deleteAppointment;
