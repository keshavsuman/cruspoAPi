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
exports.getUserSessions = exports.getSessionById = exports.getPastSessions = exports.getUpcomingSessions = exports.getSessions = exports.deleteSession = exports.updateSession = exports.createSession = void 0;
var sessionModel_1 = __importDefault(require("../../models/sessionModel"));
var response_1 = require("../response");
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).create({
                            'sessionTitle': req.body.sessionTitle,
                            'sessionDescription': req.body.sessionDescription,
                            'startDate': req.body.startDate,
                            'startTime': req.body.startTime,
                            'sessionTimes': [],
                            'notifyViaEmail': req.body.notifyViaEmail,
                            'group': req.body.group,
                            // 'duration':req.body.duration,
                            // 'repeatFrequency':req.body.repeatFrequency,
                        })];
                case 1:
                    session = _a.sent();
                    if (session.notifyViaEmail) {
                    }
                    else {
                    }
                    res.status(201).json({
                        status: 201,
                        message: 'Session created successfully',
                        data: session
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).json({
                        status: 500,
                        message: error_1,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createSession = createSession;
function updateSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                sessionModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.sessionId, {
                    'sessionTitle': req.body.sessionTitle,
                    'sessionDescription': req.body.sessionDescription,
                    'startDate': req.body.startDate,
                    'startTime': req.body.startTime,
                    'duration': req.body.duration,
                    'repeatFrequency': req.body.repeatFrequency,
                    'notifyViaEmail': req.body.notifyViaEmail,
                    'group': req.body.group,
                });
                res.status(201).json({
                    status: 201,
                    message: 'Session updated successfully',
                    data: null
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error,
                    data: null
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.updateSession = updateSession;
function deleteSession(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.sessionId, {
                            status: 'DELETED'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Session deleted successfully',
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).json({
                        status: 500,
                        message: error_2,
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteSession = deleteSession;
function getSessions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, sessions, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).find(select, project).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    sessions = _b.sent();
                    // if(req.params.type=="upcoming"){
                    //     sessions = await sessionModel(res.get('userName')).find({
                    //         status:'ACTIVE',
                    //         startDate:{$gte:new Date(Date.now())}
                    //     }).limit(50);
                    // }else if(req.params.type=="past"){
                    //     sessions = await sessionModel(res.get('userName')).find({
                    //         status:'ACTIVE',
                    //         startDate:{$lte:new Date(Date.now())}
                    //     }).limit(50);
                    // }
                    res.status(200).json({
                        status: 200,
                        message: 'Sessions fetched successfully',
                        data: sessions
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    console.log(error_3);
                    res.status(500).json({
                        status: 500,
                        message: error_3,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSessions = getSessions;
function getUpcomingSessions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, sessions, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).aggregate([
                            {
                                $match: __assign(__assign({}, select), { startDate: { $gte: new Date(Date.now()) } }),
                            },
                            {
                                $group: {
                                    _id: "$startDate",
                                    sessions: { $push: "$$ROOT" }
                                },
                            }, {
                                $limit: limit !== null && limit !== void 0 ? limit : 20,
                            }, {
                                $skip: skip !== null && skip !== void 0 ? skip : 0
                            },
                        ])];
                case 1:
                    sessions = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Sessions upcoming fetched successfully',
                        data: sessions
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    console.log(error_4);
                    res.status(500).json({
                        status: 500,
                        message: error_4,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUpcomingSessions = getUpcomingSessions;
function getPastSessions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, sessions, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).aggregate([
                            {
                                $match: __assign(__assign({}, select), { startDate: { $lte: new Date(Date.now()) } }),
                            },
                            {
                                $group: {
                                    _id: "$startDate",
                                    sessions: { $push: "$$ROOT" }
                                },
                            }, {
                                $limit: limit !== null && limit !== void 0 ? limit : 20,
                            }, {
                                $skip: skip !== null && skip !== void 0 ? skip : 0
                            },
                        ])];
                case 1:
                    sessions = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Sessions past fetched successfully',
                        data: sessions
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    console.log(error_5);
                    res.status(500).json({
                        status: 500,
                        message: error_5,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPastSessions = getPastSessions;
function getSessionById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var session, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    session = _a.sent();
                    if (session) {
                        res.status(200).json({
                            status: 200,
                            message: 'Session fetched successfully',
                            data: session
                        });
                    }
                    else {
                        res.status(200).json({
                            status: 404,
                            message: 'Session not found',
                            data: null
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(500).json({
                        status: 500,
                        message: error_6,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSessionById = getSessionById;
function getUserSessions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, sessions, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, sessionModel_1.default(res.get('userName')).find(select, project).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    sessions = _b.sent();
                    response_1.userResponse(res, 200, {
                        status: 200,
                        message: 'Session fetched successfully',
                        data: sessions
                    }, true);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    console.log(error_7);
                    response_1.userResponse(res, 500, {
                        status: 500,
                        message: error_7,
                        data: null
                    }, false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserSessions = getUserSessions;
