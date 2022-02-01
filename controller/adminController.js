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
exports.dashboard = void 0;
var axios_1 = __importDefault(require("axios"));
var authenticationController_1 = require("./authenticationController");
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var creator, today, courses, sessions, appointments, gotopageURL, members, courses, sessions, appointments, gotopageURL, members;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, authenticationController_1.getCreator)(String(process.env.userId))];
                case 1:
                    creator = _a.sent();
                    today = new Date();
                    if (!(process.env.ENVIORMENT == 'development')) return [3 /*break*/, 6];
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/program/getCourses')];
                case 2:
                    courses = _a.sent();
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/session/getSessions')];
                case 3:
                    sessions = _a.sent();
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/appointment/getBookedAppointments/' + today.getMonth() + 1 + '/' + today.getFullYear())];
                case 4:
                    appointments = _a.sent();
                    gotopageURL = 'http://localhost:5000/gotopage';
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/member/members')];
                case 5:
                    members = _a.sent();
                    return [3 /*break*/, 11];
                case 6: return [4 /*yield*/, axios_1.default.get('https://' + String(process.env.userWebsite) + '/api/admin/program/getCourses')];
                case 7:
                    courses = _a.sent();
                    return [4 /*yield*/, axios_1.default.get('https://' + String(process.env.userWebsite) + '/api/admin/session/getSessions')];
                case 8:
                    sessions = _a.sent();
                    return [4 /*yield*/, axios_1.default.get('https://' + String(process.env.userWebsite) + '/api/admin/appointment/getBookedAppointments/' + today.getMonth() + 1 + '/' + today.getFullYear())];
                case 9:
                    appointments = _a.sent();
                    gotopageURL = 'https://' + String(process.env.userWebsite) + '/gotopage';
                    return [4 /*yield*/, axios_1.default.get('https://' + String(process.env.userWebsite) + '/api/admin/member/members')];
                case 10:
                    members = _a.sent();
                    _a.label = 11;
                case 11:
                    res.render('admin/dashboard', {
                        isWebsiteActive: creator['isWebsiteActive'],
                        isGoToPageActive: creator['isGoToPageActive'],
                        websiteOverview: {
                            createdOn: "12-Jan-2021",
                            lastPublishedOn: "18-Jan-2021",
                            monthlySiteVisits: "45",
                            totalFormSubmissions: "16",
                            formsLink: ""
                        },
                        goToPage: {
                            websiteLink: gotopageURL,
                            createdOn: "12-Jan-2021",
                            lastPublishedOn: "18-Jan-2021",
                            monthlySiteVisits: "50",
                            totalFormSubmissions: "12",
                            editWebsiteLink: "",
                            formsLink: ""
                        },
                        courses: courses.data,
                        sessions: sessions.data,
                        appointments: appointments.data,
                        members: members.data
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.dashboard = dashboard;
