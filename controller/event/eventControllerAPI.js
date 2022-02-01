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
exports.getAllEvents = exports.getEventById = exports.deleteEvent = exports.updateEvent = exports.createEvent = void 0;
var eventModel_1 = __importDefault(require("../../models/eventModel"));
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, eventModel_1.default)(res.get('userName')).create({
                            'eventTitle': req.body.eventTitle,
                            'eventDescription': req.body.eventDescription,
                            'eventThumbnail': req.body.eventThumbnail,
                            'startDate': req.body.startDate,
                            'startTime': req.body.startTime,
                            'endDate': req.body.endDate,
                            'endTime': req.body.endTime,
                            'timeZone': req.body.timeZone,
                            'price': req.body.price,
                            'currency': JSON.parse(req.body.currency),
                            'notifyViaEmail': req.body.notifyViaEmail,
                            'group': req.body.group,
                        })];
                case 1:
                    _a.sent();
                    res.status(201).send();
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
exports.createEvent = createEvent;
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, eventModel_1.default)(res.get('userName')).findByIdAndUpdate(req.params.sessionId, {
                            'eventTitle': req.body.sessionTitle,
                            'eventDescription': req.body.sessionDescription,
                            'startDate': req.body.startDate,
                            'startTime': req.body.startTime,
                            'endDate': req.body.endDate,
                            'endTime': req.body.endTime,
                            'timeZone': req.body.timZone,
                            'repeatFrequency': req.body.repeatFrequency,
                            'notifyViaEmail': req.body.notifyViaEmail,
                            'group': req.body.group,
                        })];
                case 1:
                    _a.sent();
                    res.status(201).send();
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
exports.updateEvent = updateEvent;
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                (0, eventModel_1.default)(res.get('userName')).findByIdAndUpdate(req.params.eventId, {
                    status: 'DELETED'
                });
                res.status(200).send();
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ status: 500, message: error });
            }
            return [2 /*return*/];
        });
    });
}
exports.deleteEvent = deleteEvent;
function getEventById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, eventModel_1.default)(res.get('userName')).findById(req.params.eventId)];
                case 1:
                    event = _a.sent();
                    if (event) {
                        res.status(200).send(event);
                    }
                    else {
                        res.status(200).send({
                            status: 404,
                            message: "event not found"
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send({ status: 500, message: error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getEventById = getEventById;
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var events, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, eventModel_1.default)(res.get('userName')).find({
                            status: "ACTIVE",
                        })];
                case 1:
                    events = _a.sent();
                    res.status(200).send(events);
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
exports.getAllEvents = getAllEvents;
