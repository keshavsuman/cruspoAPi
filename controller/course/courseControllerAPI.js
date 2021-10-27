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
exports.deleteBatch = exports.updateBatch = exports.createBatch = exports.getCourses = exports.deleteCourse = exports.updatedCourse = exports.insertCourse = void 0;
var batchModel_1 = __importDefault(require("../../models/batchModel"));
var courseCategoryModel_1 = __importDefault(require("../../models/courseCategoryModel"));
var courseModel_1 = __importDefault(require("../../models/courseModel"));
var errorModel_1 = __importDefault(require("../../models/errorModel"));
function insertCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newCategory, course, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    course = new courseModel_1.default({
                        'courseTitle': req.body.courseTitle,
                        'courseThumbnail': req.body.courseThumbnail,
                        'courseDescription': req.body.courseDescription,
                        'courseType': req.body.typeOfCourse,
                        'isPaid': req.body.isPaid,
                        'status': 'UNPUBLISHED',
                        'feeDetails': req.body.isPaid == 'true' ? {
                            price: req.body.coursePrice,
                            currency: req.body.currency,
                            collectionPeriod: req.body.feeCollectionPeriod,
                            collectionDuration: req.body.courseFeeCustomPeriod,
                            collectionDurationUnit: req.body.courseFeeCustomUnit
                        } : null,
                    });
                    if (!req.body.newCategory) return [3 /*break*/, 2];
                    return [4 /*yield*/, courseCategoryModel_1.default.create({
                            categoryName: req.body.newCategory
                        })];
                case 1:
                    newCategory = _a.sent();
                    course.courseCategory = req.body.newCategory;
                    return [3 /*break*/, 3];
                case 2:
                    course.courseCategory = req.body.courseCategory;
                    _a.label = 3;
                case 3: return [4 /*yield*/, course.save()];
                case 4:
                    _a.sent();
                    res.status(201).send({ courseId: course.id, courseType: course.courseType });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_1.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_1.message,
                            'errorStack': error_1,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_1.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.insertCourse = insertCourse;
function updatedCourse(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return __awaiter(this, void 0, void 0, function () {
        var course, error_2;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0:
                    _y.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseId)];
                case 1:
                    course = _y.sent();
                    if (!course) return [3 /*break*/, 3];
                    course.courseTitle = (_a = req.body.courseTitle) !== null && _a !== void 0 ? _a : course.courseTitle;
                    course.courseThumbnail = (_b = req.body.courseThumbnail) !== null && _b !== void 0 ? _b : course.courseThumbnail;
                    course.courseDescription = (_c = req.body.courseDescription) !== null && _c !== void 0 ? _c : course.courseDescription;
                    course.courseCategory = (_d = req.body.courseCategory) !== null && _d !== void 0 ? _d : course.courseCategory;
                    course.isPaid = (_e = req.body.isPaid) !== null && _e !== void 0 ? _e : course.isPaid;
                    course.status = (_f = req.body.status) !== null && _f !== void 0 ? _f : course.status;
                    course.courseExpiryDate = (_g = req.body.courseValidTill) !== null && _g !== void 0 ? _g : course.courseExpiryDate;
                    course.feeDetails.price = (_j = (_h = req.body.feeDetails) === null || _h === void 0 ? void 0 : _h.price) !== null && _j !== void 0 ? _j : course.feeDetails.price;
                    course.feeDetails.collectionPeriod = (_l = (_k = req.body.feeDetails) === null || _k === void 0 ? void 0 : _k.feeCollectionPeriod) !== null && _l !== void 0 ? _l : course.feeDetails.collectionPeriod;
                    if (((_m = req.body.feeDetails) === null || _m === void 0 ? void 0 : _m.feeCollectionPeriod) == 'custom') {
                        course.feeDetails.collectionDuration = (_p = (_o = req.body.feeDetails) === null || _o === void 0 ? void 0 : _o.collectionDuration) !== null && _p !== void 0 ? _p : course.feeDetails.collectionDuration;
                        course.feeDetails.collectionDurationUnit = (_r = (_q = req.body.feeDetails) === null || _q === void 0 ? void 0 : _q.collectionDurationUnit) !== null && _r !== void 0 ? _r : course.feeDetails.collectionDurationUnit;
                    }
                    if (course.duration) {
                        course.duration.durationValue = (_s = req.body.duration.durationValue) !== null && _s !== void 0 ? _s : (_t = course.duration) === null || _t === void 0 ? void 0 : _t.durationValue;
                        course.duration.durationUnit = (_u = req.body.duration.durationUnit) !== null && _u !== void 0 ? _u : (_v = course.duration) === null || _v === void 0 ? void 0 : _v.durationUnit;
                    }
                    else {
                        course.duration = {
                            durationValue: req.body.duration.durationValue,
                            durationUnit: req.body.duration.durationUnit
                        };
                    }
                    console.log(req.body.duration.durationUnit);
                    course.feeDetails.currency = (_x = JSON.parse((_w = req.body.feeDetails) === null || _w === void 0 ? void 0 : _w.currency)) !== null && _x !== void 0 ? _x : course.feeDetails.currency;
                    return [4 /*yield*/, course.save()];
                case 2:
                    _y.sent();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    res.status(200).send("There is no any course with this courseId");
                    _y.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _y.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_2.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_2.message,
                            'errorStack': error_2,
                            'date': Date.now()
                        });
                    }
                    res.status(200).send(error_2.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updatedCourse = updatedCourse;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, courseModel_1.default.findByIdAndUpdate(req.params.courseId, {
                            status: "DELETED"
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_3.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_3.message,
                            'errorStack': error_3,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCourse = deleteCourse;
function getCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, courseModel_1.default.find({
                            status: { $in: ['PUBLISHED', 'UNPUBLISHED', 'DRAFT', 'EXPIRED'] }
                        })];
                case 1:
                    courses = _a.sent();
                    res.status(200).send(courses);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_4.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_4.message,
                            'errorStack': error_4,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCourses = getCourses;
// Batch Functions
function createBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var batch, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, batchModel_1.default.create({
                            batchTitle: req.body.batchTitle,
                            batchDescription: req.body.batchDescription,
                            timingTitle: '',
                            startTime: req.body.startTime,
                            endTime: req.body.endTime,
                            startDate: req.body.startDate,
                            timeZone: req.body.timeZone,
                            status: 'ACTIVE',
                            seatLimit: req.body.number
                        })];
                case 1:
                    batch = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findByIdAndUpdate(req.params.courseId, {
                            $addToSet: { 'batches': batch._id }
                        })];
                case 2:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_5.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_5.message,
                            'errorStack': error_5,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_5.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createBatch = createBatch;
function updateBatch(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var batch, newTimings, error_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, batchModel_1.default.findById(req.params.batchId)];
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
                    error_6 = _c.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_6.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_6.message,
                            'errorStack': error_6,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send(error_6.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateBatch = updateBatch;
function deleteBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, batchModel_1.default.findByIdAndUpdate(req.params.batchId, { status: "DELETED" })];
                case 1:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    if (process.env.ENVIORMENT == 'development') {
                        console.log(error_7.message);
                    }
                    else {
                        errorModel_1.default.create({
                            'errorMessage': error_7.message,
                            'errorStack': error_7,
                            'date': Date.now()
                        });
                    }
                    res.status(403).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBatch = deleteBatch;
