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
exports.initEditGotoPage = exports.initGotoPage = void 0;
var appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
var programModel_1 = __importDefault(require("../models/programModel"));
var recommendModel_1 = __importDefault(require("../models/recommendModel"));
var axios_1 = __importDefault(require("axios"));
var eventModel_1 = __importDefault(require("../models/eventModel"));
function initGotoPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, appointments, recommendations, events, userDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, programModel_1.default)(res.get('userName')).find({})];
                case 1:
                    courses = _a.sent();
                    return [4 /*yield*/, (0, appointmentModel_1.default)(res.get('userName')).find({ status: "PUBLISHED" })];
                case 2:
                    appointments = _a.sent();
                    return [4 /*yield*/, recommendModel_1.default.find({}).limit(20)];
                case 3:
                    recommendations = _a.sent();
                    return [4 /*yield*/, (0, eventModel_1.default)(res.get('userName')).find({})];
                case 4:
                    events = _a.sent();
                    return [4 /*yield*/, axios_1.default.get('https://authentication.cruspo.com/creator/getCreator/' + process.env.userId)];
                case 5:
                    userDetails = _a.sent();
                    try {
                        res.render('admin/gotopage', {
                            title: process.env.USERNAME,
                            courses: courses,
                            appointments: appointments,
                            events: events,
                            recommendations: recommendations,
                            userDetails: userDetails.data
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.initGotoPage = initGotoPage;
function initEditGotoPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDetails, courses, appointments, recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get('https://authentication.cruspo.com/creator/getCreator/' + process.env.userId)];
                case 1:
                    userDetails = _a.sent();
                    return [4 /*yield*/, (0, programModel_1.default)(res.get('userName')).find({})];
                case 2:
                    courses = _a.sent();
                    return [4 /*yield*/, (0, appointmentModel_1.default)(res.get('userName')).find({})];
                case 3:
                    appointments = _a.sent();
                    return [4 /*yield*/, recommendModel_1.default.find()];
                case 4:
                    recommendations = _a.sent();
                    res.render('admin/edit-gotopage', {
                        recommendations: recommendations,
                        userDetails: userDetails.data,
                        courses: courses,
                        appointments: appointments
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.initEditGotoPage = initEditGotoPage;
