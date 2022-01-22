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
var express_1 = require("express");
var programModel_1 = __importDefault(require("../../../models/programModel"));
var contentModel_1 = __importDefault(require("../../../models/content/contentModel"));
var appointmentModel_1 = __importDefault(require("../../../models/appointmentModel"));
var sessionModel_1 = __importDefault(require("../../../models/sessionModel"));
var axios_1 = __importDefault(require("axios"));
var response_1 = require("../../../controller/response");
var authenticationRoutes = require("./authenticationRoutes");
var programRoutes = require("./programRoutes");
var liveSessionsRoutes = require('./liveSessionsRoutes');
var contentRoutes = require('./contentRoutes');
var learnerRouter = express_1.Router();
learnerRouter.use('/auth', authenticationRoutes);
learnerRouter.use('/program', programRoutes);
learnerRouter.use('/content', contentRoutes);
learnerRouter.use('/liveSessions', liveSessionsRoutes);
learnerRouter.post('/page', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, limit, skip, response, creator, programs, contents, appointments, sessions, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, limit = _a.limit, skip = _a.skip;
                return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/getCreatorDetails', {
                        select: {
                            domainNames: { $in: [req.headers.cruspohost] }
                        },
                        project: {
                            _id: 0,
                            userName: 1,
                            about: 1,
                            firstName: 1,
                            lastName: 1,
                            profileImage: 1
                        }
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        },
                    })];
            case 1:
                response = _b.sent();
                creator = response.data.data;
                return [4 /*yield*/, programModel_1.default(creator.userName).find({
                        status: 'PUBLISHED'
                    }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
            case 2:
                programs = _b.sent();
                return [4 /*yield*/, contentModel_1.default(creator.userName).find().limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
            case 3:
                contents = _b.sent();
                return [4 /*yield*/, appointmentModel_1.default(creator.userName).find({
                        status: 'PUBLISHED'
                    }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
            case 4:
                appointments = _b.sent();
                return [4 /*yield*/, sessionModel_1.default(creator.userName).find({
                        status: 'PUBLISHED'
                    }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
            case 5:
                sessions = _b.sent();
                response_1.userResponse(res, 200, {
                    status: 200,
                    message: "Page details",
                    data: {
                        creator: creator,
                        programs: programs,
                        contents: contents,
                        appointments: appointments,
                        sessions: sessions,
                    }
                }, true);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                response_1.userResponse(res, 500, {
                    status: 500,
                    message: error_1,
                    data: null
                }, false);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
module.exports = learnerRouter;
