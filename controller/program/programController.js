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
exports.getUserPrograms = exports.getCategories = exports.deleteBatch = exports.updateBatch = exports.getBatch = exports.createBatch = exports.getProgramById = exports.getPrograms = exports.deleteprogram = exports.updatedprogram = exports.createProgram = void 0;
var batchModel_1 = __importDefault(require("../../models/batchModel"));
var programCategoryModel_1 = __importDefault(require("../../models/programCategoryModel"));
var programModel_1 = __importDefault(require("../../models/programModel"));
var errorModel_1 = __importDefault(require("../../models/errorModel"));
var subscriberModel_1 = __importDefault(require("../../models/manageMember/subscriberModel"));
var response_1 = require("../response");
function createProgram(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newCategory, program, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).create({
                            'programTitle': req.body.programTitle,
                            'programThumbnail': req.body.programThumbnail,
                            'programDescription': req.body.programDescription,
                            'programType': req.body.programType,
                            'isPaid': req.body.isPaid,
                            'status': 'UNPUBLISHED',
                            'feeDetails': req.body.isPaid === true ? {
                                price: req.body.programPrice,
                                currency: req.body.currency,
                                collectionPeriod: req.body.feeCollectionPeriod,
                                collectionDuration: req.body.programFeeCustomPeriod,
                                collectionDurationUnit: req.body.programFeeCustomUnit
                            } : null,
                        })];
                case 1:
                    program = _a.sent();
                    // if(req.body.newCategory)
                    // {
                    //     newCategory = await programCategoryModel(res.get('userName')).create({
                    //         categoryName:req.body.newCategory
                    //     });
                    //     program.programCategory = req.body.newCategory;
                    //     program.save();
                    // }else{
                    //     program.programCategory = req.body.programCategory;
                    //     program.save();
                    // }
                    res.status(201).json({
                        status: 201,
                        message: "Program created successfully",
                        data: program
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_1);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_1,
                            'errorStack': error_1,
                            'date': Date.now()
                        });
                    }
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
exports.createProgram = createProgram;
function updatedprogram(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function () {
        var program, error_2;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _m.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findById(req.params.programId)];
                case 1:
                    program = _m.sent();
                    if (!program) return [3 /*break*/, 3];
                    program.programTitle = (_a = req.body.programTitle) !== null && _a !== void 0 ? _a : program.programTitle;
                    program.programThumbnail = (_b = req.body.programThumbnail) !== null && _b !== void 0 ? _b : program.programThumbnail;
                    program.programDescription = (_c = req.body.programDescription) !== null && _c !== void 0 ? _c : program.programDescription;
                    program.programCategory = (_d = req.body.programCategory) !== null && _d !== void 0 ? _d : program.programCategory;
                    program.programSubCategory = (_e = req.body.programSubCategory) !== null && _e !== void 0 ? _e : program.programSubCategory;
                    program.isPaid = (_f = req.body.isPaid) !== null && _f !== void 0 ? _f : program.isPaid;
                    program.programExpiryDate = (_g = req.body.programValidTill) !== null && _g !== void 0 ? _g : program.programExpiryDate;
                    program.feeDetails.price = (_j = (_h = req.body.feeDetails) === null || _h === void 0 ? void 0 : _h.price) !== null && _j !== void 0 ? _j : program.feeDetails.price;
                    program.feeDetails.collectionPeriod = (_l = (_k = req.body.feeDetails) === null || _k === void 0 ? void 0 : _k.feeCollectionPeriod) !== null && _l !== void 0 ? _l : program.feeDetails.collectionPeriod;
                    // if(req.body.feeDetails?.feeCollectionPeriod=='custom')
                    // {
                    //     program.feeDetails.collectionDuration = req.body.feeDetails?.collectionDuration??program.feeDetails.collectionDuration;
                    //     program.feeDetails.collectionDurationUnit = req.body.feeDetails?.collectionDurationUnit??program.feeDetails.collectionDurationUnit;
                    // }
                    // if(program.duration)
                    // {
                    //     program.duration.durationValue = req.body.duration.durationValue??program.duration?.durationValue;
                    //     program.duration.durationUnit = req.body.duration.durationUnit??program.duration?.durationUnit;
                    // }else{
                    //     program.duration = {
                    //         durationValue:req.body.duration.durationValue,
                    //         durationUnit:req.body.duration.durationUnit
                    //     }
                    // }
                    // console.log(req.body.duration.durationUnit);
                    // program.feeDetails.currency = JSON.parse(req.body.feeDetails?.currency)??program.feeDetails.currency;
                    return [4 /*yield*/, program.save()];
                case 2:
                    // if(req.body.feeDetails?.feeCollectionPeriod=='custom')
                    // {
                    //     program.feeDetails.collectionDuration = req.body.feeDetails?.collectionDuration??program.feeDetails.collectionDuration;
                    //     program.feeDetails.collectionDurationUnit = req.body.feeDetails?.collectionDurationUnit??program.feeDetails.collectionDurationUnit;
                    // }
                    // if(program.duration)
                    // {
                    //     program.duration.durationValue = req.body.duration.durationValue??program.duration?.durationValue;
                    //     program.duration.durationUnit = req.body.duration.durationUnit??program.duration?.durationUnit;
                    // }else{
                    //     program.duration = {
                    //         durationValue:req.body.duration.durationValue,
                    //         durationUnit:req.body.duration.durationUnit
                    //     }
                    // }
                    // console.log(req.body.duration.durationUnit);
                    // program.feeDetails.currency = JSON.parse(req.body.feeDetails?.currency)??program.feeDetails.currency;
                    _m.sent();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    res.status(406).send("There is no any program with this programId");
                    _m.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _m.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_2);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_2,
                            'errorStack': error_2,
                            'date': Date.now()
                        });
                    }
                    res.status(500).send(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updatedprogram = updatedprogram;
function deleteprogram(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.programId, {
                            status: "DELETED"
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_3);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_3,
                            'errorStack': error_3,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteprogram = deleteprogram;
function getPrograms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var programs, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).find({
                            status: { $in: ['PUBLISHED', 'UNPUBLISHED', 'DRAFT', 'EXPIRED'] }
                        })];
                case 1:
                    programs = _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Programs fetched successfully",
                        data: programs
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_4);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_4,
                            'errorStack': error_4,
                            'date': Date.now()
                        });
                    }
                    res.status(500).send(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPrograms = getPrograms;
function getProgramById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var program, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    program = _a.sent();
                    response_1.userResponse(res, 200, {
                        status: 200,
                        message: "Progam Fetched Successfully",
                        data: program
                    }, true);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    if (error_5.name === 'MissingSchemaError') {
                        batchModel_1.default(res.get('userName')).createCollection();
                        // moduleModel(res.get('userName')).createCollection();
                    }
                    response_1.userResponse(res, 200, {
                        status: 500,
                        message: error_5,
                        data: null
                    }, false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProgramById = getProgramById;
// Batch Functions
function createBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var batch, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, batchModel_1.default(res.get('userName')).create({
                            batchTitle: req.body.batchTitle,
                            batchDescription: req.body.batchDescription,
                            // timingTitle:'',
                            // startTime:req.body.startTime,
                            // endTime:req.body.endTime,
                            // startDate:req.body.startDate,
                            // timeZone:req.body.timeZone,
                            status: 'ACTIVE',
                            // seatLimit:req.body.number
                        })];
                case 1:
                    batch = _a.sent();
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.programId, {
                            $addToSet: { 'batches': batch._id }
                        })];
                case 2:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_6);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_6,
                            'errorStack': error_6,
                            'date': Date.now()
                        });
                    }
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error',
                        data: null
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createBatch = createBatch;
function getBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.getBatch = getBatch;
function updateBatch(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var batch, newTimings, error_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, batchModel_1.default(res.get('userName')).findById(req.params.batchId)];
                case 1:
                    batch = _c.sent();
                    if (batch) {
                        newTimings = {
                            timingTitle: req.body.timingTitle,
                            timeZone: "sgfsg",
                            // startDate:
                        };
                        batch.batchTitle = (_a = req.body.batchTitle) !== null && _a !== void 0 ? _a : batch.batchTitle;
                        batch.batchDescription = (_b = req.body.batchDescription) !== null && _b !== void 0 ? _b : batch.batchDescription;
                        batch.timings.push(newTimings);
                        // batch.startTime = req.body.startTime??batch.st,
                        // batch.endTime = req.body.endTime??batch.endTime,
                        // batch.startDate = req.body.startDate??batch.startDate,
                        // batch.timeZone = req.body.timeZone??batch.timeZone,
                        // batch.seatLimit = req.body.seatLimit??batch.seatLimit,
                        console.log(batch);
                        batch.save();
                        res.status(201).send();
                    }
                    else {
                        res.status(403).send("Batch doesn't exits with this Id");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _c.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_7);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_7,
                            'errorStack': error_7,
                            'date': Date.now()
                        });
                    }
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error',
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateBatch = updateBatch;
function deleteBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, batchModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.batchId, { status: "DELETED" })];
                case 1:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_8);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_8,
                            'errorStack': error_8,
                            'date': Date.now()
                        });
                    }
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error',
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBatch = deleteBatch;
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categories, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programCategoryModel_1.default(res.get('userName')).find()];
                case 1:
                    categories = _a.sent();
                    res.status(200).send(categories);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error',
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCategories = getCategories;
function getUserPrograms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var myPrograms, programsPurchasedId, programs, error_9, myPrograms, programsPurchasedId, programs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 9]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(res.get('_id'), { programsPurchased: 1 }).populate({
                            path: 'programsPurchased'
                        })];
                case 1:
                    myPrograms = _a.sent();
                    programsPurchasedId = myPrograms.programsPurchased.map(function (p) { return p._id; });
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).find({
                            status: 'PUBLISHED',
                            _id: { $nin: programsPurchasedId }
                        }).limit(20)];
                case 2:
                    programs = _a.sent();
                    response_1.userResponse(res, 200, {
                        status: 200,
                        message: "My Programs fetched successfully",
                        data: {
                            myPrograms: myPrograms,
                            programs: programs
                        }
                    }, true);
                    return [3 /*break*/, 9];
                case 3:
                    error_9 = _a.sent();
                    if (!(error_9.name === 'MissingSchemaError')) return [3 /*break*/, 7];
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).createCollection()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(res.get('_id'), { programsPurchased: 1 }).populate({
                            path: 'programsPurchased'
                        })];
                case 5:
                    myPrograms = _a.sent();
                    programsPurchasedId = myPrograms.programsPurchased.map(function (p) { return p._id; });
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).find({
                            status: 'PUBLISHED',
                            _id: { $nin: programsPurchasedId }
                        }).limit(20)];
                case 6:
                    programs = _a.sent();
                    response_1.userResponse(res, 200, {
                        status: 200,
                        message: "My Programs fetched successfully",
                        data: {
                            myPrograms: myPrograms,
                            programs: programs
                        }
                    }, true);
                    return [3 /*break*/, 8];
                case 7:
                    console.log(error_9);
                    response_1.userResponse(res, 500, {
                        status: 500,
                        message: error_9,
                        data: null
                    }, false);
                    _a.label = 8;
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getUserPrograms = getUserPrograms;
