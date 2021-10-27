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
exports.updateGoToPage = exports.contactUs = exports.newRecommendation = void 0;
var contactUsModel_1 = __importDefault(require("../../models/contactUsModel"));
var recommendModel_1 = __importDefault(require("../../models/recommendModel"));
var axios_1 = __importDefault(require("axios"));
function newRecommendation(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var recommendation, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    recommendation = new recommendModel_1.default();
                    recommendation.recommendation = req.body.recommendation, recommendation.name = req.body.name, recommendation.email = req.body.email;
                    return [4 /*yield*/, recommendation.save()];
                case 1:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(403).send(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.newRecommendation = newRecommendation;
function contactUs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var contactus;
        return __generator(this, function (_a) {
            try {
                contactus = new contactUsModel_1.default();
                contactus.firstName = req.body.firstName,
                    contactus.lastName = req.body.lastName,
                    contactus.email = req.body.email,
                    contactus.contactNumber = req.body.contactNumber,
                    contactus.queryMessage = req.body.message,
                    res.status(201).send();
            }
            catch (error) {
                console.log(error);
                res.status(403).send(error.message);
            }
            return [2 /*return*/];
        });
    });
}
exports.contactUs = contactUs;
function updateGoToPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/update', {
                            creatorId: process.env.userId,
                            about: req.body.about,
                            bgImage: req.body.bgImage
                        })];
                case 1:
                    data = _a.sent();
                    if (data.data != null) {
                        res.status(201).send();
                    }
                    else {
                        res.status(data.status).send(data.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(403).send(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateGoToPage = updateGoToPage;
