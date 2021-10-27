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
exports.updateMember = exports.signup = exports.login = void 0;
var learnerModel_1 = __importDefault(require("../../models/manageMember/learnerModel"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var axios_1 = __importDefault(require("axios"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, learner, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(req.body.email && req.body.password)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/get', {
                            select: {
                                domainNames: { $in: [req.body.domainName] }
                            },
                            project: {
                                _id: 1,
                                userName: 1
                            }
                        }, {
                            headers: {
                                'Content-type': 'application/json'
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.data.length == 0) {
                        res.status(403).send({ message: 'User Not Found' });
                        return [2 /*return*/];
                    }
                    if (!(response.status == 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, learnerModel_1.default(response.data.userName).find({ email: req.body.email }, { firstName: 1, lastName: 1, email: 1, password: 1 })];
                case 2:
                    learner = _a.sent();
                    if (learner.length > 0) {
                        if (!bcryptjs_1.default.compareSync(req.body.password, learner[0]['password'])) {
                            res.send({
                                status: 200,
                                message: "PASSWORD_INCORRECT",
                                data: {}
                            });
                            return [2 /*return*/];
                        }
                        token = jsonwebtoken_1.default.sign({
                            firstName: learner[0].firstName,
                            lastName: learner[0].lastName,
                            email: learner[0].email,
                            userType: 'creator'
                        }, String(process.env.SECRET_KEY), {
                            expiresIn: 60 * 60 * 24
                        });
                        res.send({
                            status: 200,
                            message: "LOGIN_SUCCESSFULL",
                            data: {
                                user: {
                                    firstName: learner[0].firstName,
                                    lastName: learner[0].lastName,
                                    email: learner[0].email,
                                },
                                token: token
                            }
                        });
                    }
                    return [3 /*break*/, 3];
                case 3: return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learnerResponse, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/learner/get', {
                            select: {
                                email: req.body.email
                            },
                            project: {
                                email: 1,
                                password: 1,
                            }
                        }, {
                            headers: {
                                'Content-type': 'application/json'
                            },
                        })];
                case 1:
                    learnerResponse = _a.sent();
                    if (learnerResponse.data.length > 0) {
                        res.status(403).send({ message: 'User Already Exits' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/learner/signup', {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            domainName: req.body.domainName,
                        }, {
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    res.status(403).send({ message: response.data.message });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, learnerModel_1.default(response.data.creator.userName).create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: response.data.learner.password,
                        creatorId: response.data.creator._id,
                        learnerRefId: response.data.learner._id
                    })];
                case 4:
                    _a.sent();
                    res.status(201).send({ message: 'user Signup successfull' });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).send(error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.signup = signup;
function updateMember(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(req.body);
                    return [4 /*yield*/, learnerModel_1.default(res.get('creatorId')).findByIdAndUpdate(res.get('_id'), {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            contactNumber: {
                                countryCode: req.body.countryCode,
                                mobileNumber: req.body.mobileNumber
                            }
                        })];
                case 1:
                    _a.sent();
                    // Update at cruspo database    
                    res.status(200).send('Updated');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateMember = updateMember;
