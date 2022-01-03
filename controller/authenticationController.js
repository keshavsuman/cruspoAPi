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
exports.getCreator = exports.learnerForgetPassword = exports.refreshToken = exports.learnerSignin = exports.learnerSignup = exports.resetPassword = exports.forgetPassword = exports.updateProfile = exports.login = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var axios_1 = __importDefault(require("axios"));
var subscriberModel_1 = __importDefault(require("../models/manageMember/subscriberModel"));
var mailSender = __importStar(require("./mail/sendMailController"));
var mongoose_1 = require("mongoose");
dotenv_1.default.config();
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var responseData, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/login/', { email: req.body.email })];
                case 1:
                    responseData = _a.sent();
                    if (responseData.status == 200) {
                        if (responseData.data == 'USER_NOT_FOUND') {
                            res.send({
                                status: 404,
                                message: "USER_NOT_FOUND",
                                data: {}
                            });
                        }
                        else {
                            if (!bcryptjs_1.default.compareSync(req.body.password, responseData.data[0]['password'])) {
                                res.send({
                                    status: 200,
                                    message: "PASSWORD_INCORRECT",
                                    data: {}
                                });
                            }
                            token = jsonwebtoken_1.default.sign({
                                userName: responseData.data[0]['userName'],
                                creatorId: responseData.data[0]['_id'],
                                firstName: responseData.data[0]['firstName'],
                                lastName: responseData.data[0]['lastName'],
                                profileImage: responseData.data[0]['profileImage'],
                                about: responseData.data[0]['about'],
                                bgImage: responseData.data[0]['bgImage'],
                                userType: 'creator'
                            }, String(process.env.SECRET_KEY), {
                                expiresIn: 60 * 60 * 24
                            });
                            res.send({
                                status: 200,
                                message: "LOGIN_SUCCESSFULL",
                                data: {
                                    user: responseData.data[0],
                                    token: token
                                }
                            });
                        }
                    }
                    else {
                        console.log(responseData);
                        res.send({
                            status: 406,
                            message: "ERROR_OCCURED",
                            data: responseData
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
;
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // axios.post('https://authentication.cruspo.com/creator/update',{
                // },{
                // });
                res.status(200).send();
            }
            catch (error) {
                console.log(error);
                res.status(500).send({});
            }
            return [2 /*return*/];
        });
    });
}
exports.updateProfile = updateProfile;
function forgetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var responseData, token, link, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/forgetPassword', {
                            email: req.body.email
                        }, {
                        // headers:{
                        //     'Content-Type':'application/x-www-form-urlencoded'
                        // }
                        })];
                case 1:
                    responseData = _a.sent();
                    if (responseData.status == 201) {
                        if (responseData.data == 'USER_NOT_FOUND') {
                            res.render('forgot-password', {
                                error: 'this is not a recognised mail'
                            });
                        }
                        else {
                            token = jsonwebtoken_1.default.sign({
                                email: req.body.email,
                            }, String(process.env.userId), {
                                expiresIn: 60 * 60
                            });
                            link = req.protocol + '://' + req.hostname + '/authentication/resetpassword/' + token;
                            mailSender.sendResetPasswordMailToCreator(req.body.email, link);
                            res.redirect('/authentication/resetPassword');
                        }
                    }
                    else {
                        res.render('forgot-password', {
                            error: responseData.data
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.forgetPassword = forgetPassword;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordReset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.body.password == req.body.confirmPassword)) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/resetPassword', {
                            password: req.body.password,
                            creatorId: process.env.userId
                        })];
                case 1:
                    passwordReset = _a.sent();
                    if (passwordReset.data == true) {
                        res.redirect('/authentication');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    res.render('change-password', {
                        error: 'Password and Confirm Password doesn\'t match'
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.resetPassword = resetPassword;
/**
 *
 * learner dahsboard authentication function started
 *
 */
function learnerSignup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, salt, password, learnerRegistered, newLearner, jwtToken, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).find({ email: req.body.email })];
                case 1:
                    learner = _a.sent();
                    if (!(learner.length > 0)) return [3 /*break*/, 2];
                    res.render('learn/sign-up', { error: 'User Already Exists', mode: "signup" });
                    return [3 /*break*/, 8];
                case 2: return [4 /*yield*/, bcryptjs_1.default.genSalt()];
                case 3:
                    salt = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash(req.body.password, salt)];
                case 4:
                    password = _a.sent();
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/learner/signup', {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: password,
                            creatorId: process.env.userId,
                        })];
                case 5:
                    learnerRegistered = _a.sent();
                    if (!mongoose_1.Types.ObjectId.isValid(learnerRegistered.data)) return [3 /*break*/, 7];
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: password,
                            learnerRefId: learnerRegistered.data
                        })];
                case 6:
                    newLearner = _a.sent();
                    jwtToken = jsonwebtoken_1.default.sign({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        learnerId: newLearner['_id'],
                        creatorId: String(process.env.userId),
                        userType: "learner",
                        isVerified: false
                    }, String(process.env.userId), {
                        expiresIn: 60 * 60 * 24
                    });
                    res.cookie('authLearnerToken', jwtToken, { httpOnly: true });
                    res.redirect('/learn');
                    return [3 /*break*/, 8];
                case 7:
                    res.render('learn/sign-up', { error: 'Some error occured,please try later', mode: "signup" });
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_3 = _a.sent();
                    res.render('learn/sign-up', { error: error_3, mode: "signup", });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.learnerSignup = learnerSignup;
function learnerSignin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, token, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).find({ email: req.body.email })];
                case 1:
                    learner = _a.sent();
                    if (learner.length == 0) {
                        res.render('learn/sign-up', { error: 'User doesn\'t exits', mode: "login" });
                    }
                    else {
                        // var learner = await axios.post('https://authentication.cruspo.com/learner/login', {
                        //     email: req.body.email
                        // });
                        if (!bcryptjs_1.default.compareSync(req.body.password, learner[0]['password'])) {
                            res.render('learn/sign-up', { error: 'Password is not correct', mode: "login" });
                            return [2 /*return*/];
                        }
                        token = jsonwebtoken_1.default.sign({
                            learnerId: learner[0]._id,
                            firstName: learner[0].firstName,
                            lastName: learner[0].lastName,
                            profileImage: learner[0].profileImage,
                            creatorId: String(process.env.userId),
                            userType: 'learner',
                            isVerified: false
                        }, String(process.env.userId), {
                            expiresIn: 60 * 60 * 24
                        });
                        res.cookie('authLearnerToken', token, { httpOnly: true });
                        res.status(200);
                        res.redirect('/learn');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    res.render('learn/sign-up', { error: e_1, mode: "login" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.learnerSignin = learnerSignin;
function refreshToken(authToken, userDoc) {
    return __awaiter(this, void 0, void 0, function () {
        var user, data, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(userDoc == null || userDoc == undefined)) return [3 /*break*/, 2];
                    user = jsonwebtoken_1.default.verify(authToken, String(process.env.userId));
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/api/getUserDetailsByEmail', {
                            email: user['email']
                        })];
                case 1:
                    data = _a.sent();
                    userDoc = data.data;
                    _a.label = 2;
                case 2:
                    try {
                        token = jsonwebtoken_1.default.sign({
                            userName: userDoc['userName'],
                            userId: userDoc['_id'],
                            firstName: userDoc['firstName'],
                            lastName: userDoc['lastName'],
                            profileImage: userDoc['profileImage'],
                            about: userDoc['about'],
                            userType: 'creator',
                            bgImage: userDoc['bgImage'],
                        }, String(process.env.userId), {
                            expiresIn: 60 * 60 * 24
                        });
                        return [2 /*return*/, token];
                    }
                    catch (err) {
                        console.log(err);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.refreshToken = refreshToken;
function learnerForgetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var responseData, token, link, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/learner/forgetPassword', {
                            email: req.body.email
                        }, {
                        // headers:{
                        //     'Content-Type':'application/x-www-form-urlencoded'
                        // }
                        })];
                case 1:
                    responseData = _a.sent();
                    if (responseData.status == 201) {
                        if (responseData.data == 'USER_NOT_FOUND') {
                            res.render('forgot-password', {
                                error: 'this is not a recognised mail',
                                mode: 'learner'
                            });
                        }
                        else {
                            token = jsonwebtoken_1.default.sign({
                                email: req.body.email,
                            }, String(process.env.userId), {
                                expiresIn: 60 * 60
                            });
                            link = req.protocol + '://' + req.hostname + '/authentication/resetpassword/' + token;
                            mailSender.sendResetPasswordMailToLearner(req.body.email, link);
                            res.redirect('/authentication/resetPassword');
                        }
                    }
                    else {
                        res.render('forgot-password', {
                            error: responseData.data
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.learnerForgetPassword = learnerForgetPassword;
function getCreator(creatorId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = "https://authentication.cruspo.com/creator/getCreator/" + creatorId;
                    return [4 /*yield*/, axios_1.default({
                            url: url,
                            method: "GET",
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        return [2 /*return*/, response.data];
                    }
                    else {
                        console.log(response.data);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCreator = getCreator;
