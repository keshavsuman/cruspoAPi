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
exports.getCreator = exports.resetPassword = exports.forgetPassword = exports.updateProfile = exports.login = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var axios_1 = __importDefault(require("axios"));
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
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/getCreatorDetails', {
                            "select": {
                                "domainNames": {
                                    "$in": [req.headers.cruspohost]
                                },
                                "email": req.body.email
                            },
                            "project": {
                                "_id": 1,
                                "userName": 1
                            }
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    responseData = _a.sent();
                    // console.log(responseData.data);
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
                            // mailSender.sendResetPasswordMailToCreator(req.body.email, link);
                            // res.redirect('/authentication/resetPassword');
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
function getCreator(creatorId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = "https://authentication.cruspo.com/creator/getCreator/" + creatorId;
                    return [4 /*yield*/, (0, axios_1.default)({
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
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCreator = getCreator;
