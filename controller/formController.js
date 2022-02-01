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
exports.submitForm = exports.getSubmissions = exports.getForms = exports.updateForm = exports.createForm = void 0;
var formModel_1 = __importDefault(require("../models/form/formModel"));
var formSubmissionModel_1 = __importDefault(require("../models/form/formSubmissionModel"));
var axios_1 = __importDefault(require("axios"));
var mongoose_1 = __importDefault(require("mongoose"));
var sendMailController_1 = require("../controller/mail/sendMailController");
function createForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, formModel_1.default)(res.get('userName')).create({
                            formName: req.body.formName,
                            isPaid: req.body.isPaid,
                            price: req.body.price,
                            userMailTemplate: req.body.userMailTemplate,
                            creatorMailTemplate: req.body.creatorMailTemplate,
                            redirectTo: req.body.redirectTo
                        })];
                case 1:
                    _a.sent();
                    res.status(201).json({
                        status: 201,
                        message: 'Form created succesfully'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createForm = createForm;
function updateForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, formModel_1.default)(res.get('userName')).findByIdAndUpdate(req.params.id, {
                            formName: req.body.formName,
                            isPaid: req.body.isPaid,
                            mailTemplate: req.body.mailTemplate,
                        })];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Form updated succesfully'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateForm = updateForm;
function getForms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, forms, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, (0, formModel_1.default)(res.get('userName')).find(select, project).sort({ createdAt: -1 }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    forms = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Forms fetched succesfully',
                        data: forms
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    console.log(error_3);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getForms = getForms;
function getSubmissions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, limit, skip, formSubmissions, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, (0, formSubmissionModel_1.default)(res.get('userName')).find({ formId: req.params.id }).sort({ createdAt: -1 }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    formSubmissions = _b.sent();
                    res.status(200).json({
                        status: 200,
                        data: formSubmissions,
                        message: 'Form submissions fetched succesfully'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    console.log(error_4);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSubmissions = getSubmissions;
function submitForm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var creator, form, data, submission, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    console.log(req.headers.host);
                    return [4 /*yield*/, axios_1.default.post('https://authentication.cruspo.com/creator/getCreatorDetails', {
                            "select": {
                                "domainNames": {
                                    "$in": [req.headers.host]
                                }
                            },
                            "project": {
                                "_id": 1,
                                "userName": 1,
                                "email": 1,
                                "firstName": 1,
                                "lastName": 1,
                                "refreshToken": 1,
                                "accessToken": 1
                            }
                        })];
                case 1:
                    creator = _a.sent();
                    if (!(creator.status == 200)) return [3 /*break*/, 8];
                    console.log(creator.data.data);
                    return [4 /*yield*/, (0, formModel_1.default)(creator.data.data.userName).findById(mongoose_1.default.Types.ObjectId(req.params.formId.trim()))];
                case 2:
                    form = _a.sent();
                    if (!!form) return [3 /*break*/, 3];
                    res.status(404).json({
                        status: 404,
                        message: 'Form not found'
                    });
                    return [3 /*break*/, 7];
                case 3:
                    data = __assign({}, req.body);
                    data.formId = req.params.formId;
                    return [4 /*yield*/, (0, formSubmissionModel_1.default)(creator.data.data.userName).create(data)];
                case 4:
                    submission = _a.sent();
                    if (!form.userMailTemplate) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, sendMailController_1.sendMailOnFormResponse_user)(form.userMailTemplate, submission, creator.data.data)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    // if(form.creatorMailTemplate){
                    //     await sendMailOnFormResponse_creator(form.creatorMailTemplate,submission,creator.data.data);
                    // }
                    if (form.isPaid) {
                        if (form.price.currency) {
                            //     const currency = await formModel(res.get('userName')).findById(form.price.currency);
                            //     if(!currency){
                            //         res.status(404).json({
                            //             status:404,
                            //             message:'Currency not found'
                            //         });
                            //     }
                            //     else{
                            //         const price = form.price.amount * currency.rate;
                            //         await formSubmissionModel(res.get('userName')).findByIdAndUpdate(submission._id,{
                            //             price:price
                            //         });
                            //     }
                            // }
                        }
                        if (form.redirectTo) {
                            res.redirect(form.redirectTo);
                        }
                        else {
                            res.status(201).json({
                                status: 201,
                                message: 'Form submitted succesfully',
                                data: submission
                            });
                        }
                    }
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    res.status(500).json({
                        status: 500,
                        message: 'Invalid Request'
                    });
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.submitForm = submitForm;
