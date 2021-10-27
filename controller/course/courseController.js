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
exports.saveLiveCourse = exports.addTiming = exports.publishPreRecordedCourse = exports.savePreRecordedCourse = exports.videoUploadSignedURL = exports.editBatch = exports.createBatch = exports.uploadCourseThumbnail = exports.deleteCourse = exports.insertCourse = exports.getEditCourse = exports.getCourses = void 0;
var courseModel_1 = __importDefault(require("../../models/courseModel"));
var imageUploadCotroller_1 = require("../imageUploadCotroller");
var aws_sdk_1 = require("aws-sdk");
var courseCategoryModel_1 = __importDefault(require("../../models/courseCategoryModel"));
var batchModel_1 = __importDefault(require("../../models/batchModel"));
var uuid_1 = require("uuid");
var moduleModel_1 = __importDefault(require("../../models/moduleModel"));
var lessonModel_1 = __importDefault(require("../../models/lessonModel"));
var notificationModel_1 = __importDefault(require("../../models/notificationModel"));
var currencyModel_1 = __importDefault(require("../../models/currencyModel"));
var courseSubCategoryModel_1 = __importDefault(require("../../models/courseSubCategoryModel"));
var config_1 = require("../../config");
function getCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, currencies, notifications, courseCategory, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, courseModel_1.default.find({
                            status: {
                                $in: ['PUBLISHED', 'UNPUBLISHED', 'DRAFT', 'EXPIRED']
                            }
                        })];
                case 1:
                    courses = _a.sent();
                    return [4 /*yield*/, currencyModel_1.default.find()];
                case 2:
                    currencies = _a.sent();
                    return [4 /*yield*/, notificationModel_1.default.find()];
                case 3:
                    notifications = _a.sent();
                    return [4 /*yield*/, courseCategoryModel_1.default.find({})];
                case 4:
                    courseCategory = _a.sent();
                    res.render('admin/create-courses', {
                        courses: courses,
                        currencies: currencies,
                        notifications: notifications,
                        courseCategory: courseCategory,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getCourses = getCourses;
function getEditCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var notifications, course, courseCategory, currencies, courseSubCategories, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, notificationModel_1.default.find()];
                case 1:
                    notifications = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseID).populate({
                            path: 'batches',
                            match: { status: { $in: ['ACTIVE'] } }
                        })];
                case 2:
                    course = _a.sent();
                    return [4 /*yield*/, courseCategoryModel_1.default.find({})];
                case 3:
                    courseCategory = _a.sent();
                    return [4 /*yield*/, currencyModel_1.default.find()];
                case 4:
                    currencies = _a.sent();
                    return [4 /*yield*/, courseSubCategoryModel_1.default.find()];
                case 5:
                    courseSubCategories = _a.sent();
                    if ((course === null || course === void 0 ? void 0 : course.courseType) == 'liveProgram') {
                        res.render('admin/live-course', {
                            course: course,
                            notifications: notifications,
                            currencies: currencies,
                            courseCategory: courseCategory,
                            timeZones: config_1.TimeZones,
                            subCategories: courseSubCategories,
                        });
                    }
                    else if ((course === null || course === void 0 ? void 0 : course.courseType) == 'preRecordedProgram') {
                        res.render('admin/course-page', {
                            course: course,
                            notifications: notifications,
                            currencies: currencies,
                            courseCategory: courseCategory,
                            timeZones: config_1.TimeZones,
                            subCategories: courseSubCategories,
                        });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getEditCourse = getEditCourse;
function insertCourse(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var isPaid, category, course, createdCourse, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    isPaid = false;
                    category = void 0;
                    if (req.body.feeCollectionPeriod || req.body.coursePrice) {
                        isPaid = true;
                    }
                    category = req.body.courseCategory;
                    if (!(req.body.newCourseCategory != undefined && req.body.newCourseCategory != '')) return [3 /*break*/, 2];
                    return [4 /*yield*/, courseCategoryModel_1.default.create({
                            categoryName: req.body.newCourseCategory
                        })];
                case 1:
                    _c.sent();
                    category = req.body.newCourseCategory;
                    _c.label = 2;
                case 2:
                    course = new courseModel_1.default({
                        courseTitle: req.body.courseTitle,
                        courseDescription: req.body.courseDescription,
                        courseThumbnail: (_b = (_a = req) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.location,
                        courseCategory: category,
                        courseType: req.body.typeOfCourse,
                        isPaid: isPaid,
                        status: 'UNPUBLISHED',
                        feeDetails: {
                            price: req.body.coursePrice,
                            currency: JSON.parse(req.body.currency),
                            collectionPeriod: req.body.feeCollectionPeriod,
                            collectionDuration: req.body.courseFeeCustomPeriod,
                            collectionDurationUnit: req.body.courseFeeCustomUnit
                        },
                    });
                    return [4 /*yield*/, course.save()];
                case 3:
                    createdCourse = _c.sent();
                    if (req.body.typeOfCourse = 'liveCourse') {
                        res.redirect('/admin/courses/edit/live/' + createdCourse['_id']);
                    }
                    else {
                        res.redirect('/admin/courses/edit/' + createdCourse['_id']);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    console.log(e_3.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.insertCourse = insertCourse;
;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, courseModel_1.default.findByIdAndDelete()];
                case 1:
                    _a.sent();
                    res.send();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    res.status(400).send(e_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCourse = deleteCourse;
;
function uploadCourseThumbnail(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var upload;
        return __generator(this, function (_a) {
            upload = imageUploadCotroller_1.multerUpload.single('courseThumbnail');
            upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    next();
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.uploadCourseThumbnail = uploadCourseThumbnail;
function createBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var batch, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    batch = new batchModel_1.default();
                    batch.batchTitle = req.body.batchTitle;
                    batch.batchDescription = req.body.batchDescription;
                    return [4 /*yield*/, batch.save()];
                case 1:
                    batch = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findByIdAndUpdate(req.params.courseID, { $push: { batches: batch['_id'] } })];
                case 2:
                    _a.sent();
                    console.log(batch);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createBatch = createBatch;
function editBatch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.editBatch = editBatch;
function videoUploadSignedURL(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var key, s3, url, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = uuid_1.v4();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    s3 = new aws_sdk_1.S3({
                        accessKeyId: process.env.AWSAccessKeyId,
                        secretAccessKey: process.env.AWSSecretKey,
                        signatureVersion: 'v4',
                        region: 'ap-south-1',
                    });
                    return [4 /*yield*/, s3.getSignedUrl('putObject', {
                            Bucket: 'cruspo-video-archive',
                            ContentType: req.body.ContentType,
                            ACL: 'public-read',
                            Key: String(process.env.userId) + '/' + key
                        })];
                case 2:
                    url = _a.sent();
                    res.send(url);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    res.status(400).send(error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.videoUploadSignedURL = videoUploadSignedURL;
function savePreRecordedCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var modu, moduelIdList, course, updatedCourse, e_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    modu = req.body.modules;
                    moduelIdList = [];
                    modu.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                        var lessonIdList, less, newModule;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(element['_id'] == null || element['_id'] == undefined)) return [3 /*break*/, 2];
                                    lessonIdList = [];
                                    less = element['lessons'];
                                    less.forEach(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                        var lessonObject, newLesson;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    lessonObject = JSON.parse(e);
                                                    if (!(lessonObject['_id'] == null || lessonObject['_id'] == undefined)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, lessonModel_1.default.create({
                                                            lessonTitle: lessonObject['lessonTitle'],
                                                            lessonDescription: lessonObject['lessonDescription'],
                                                            lessontype: 'VIDEO',
                                                            moduleID: element['_id']
                                                        })];
                                                case 1:
                                                    newLesson = _a.sent();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    console.log('lessonID List' + lessonIdList);
                                    return [4 /*yield*/, moduleModel_1.default.create({
                                            moduleTitle: element['moduleTitle'],
                                            courseID: req.params.courseID,
                                            moduleDescription: element['moduleDescription'],
                                            moduleThumbnail: '',
                                            lessons: lessonIdList
                                        })];
                                case 1:
                                    newModule = _a.sent();
                                    // moduelIdList.push(newModule['_id']);
                                    console.log('new moduel' + newModule);
                                    return [3 /*break*/, 3];
                                case 2:
                                    moduelIdList.push(element['_id']);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseID)];
                case 1:
                    course = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findByIdAndUpdate(req.params.courseID, {
                            courseTitle: req.body.courseTitle,
                            courseExpiryDate: req.body.courseExpiryDate,
                            courseDescription: req.body.courseDescription,
                            courseThumbnail: req.body.courseThumbnail,
                            courseType: "preRecordedCourse",
                            isPaid: req.body.isPaid,
                            // modules:moduelIdList,
                            courseCategory: req.body.courseCategory,
                        })];
                case 2:
                    updatedCourse = _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log(e_5.message);
                    res.status(401).send(e_5.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.savePreRecordedCourse = savePreRecordedCourse;
function publishPreRecordedCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var course, updatedCourse, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseID)];
                case 1:
                    course = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findByIdAndUpdate(req.params.courseID, {
                            courseTitle: req.body.courseTitle,
                            courseExpiryDate: req.body.courseExpiryDate,
                            courseDescription: req.body.courseDescription,
                            courseThumbnail: req.body.courseThumbnail,
                            courseType: "preRecordedCourse",
                            courseCategory: req.body.courseCategory,
                            isPaid: req.body.isPaid,
                            status: req.body.status
                        })];
                case 2:
                    updatedCourse = _a.sent();
                    console.log(updatedCourse);
                    res.send();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    console.log(e_6.message);
                    res.status(400).send(e_6.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.publishPreRecordedCourse = publishPreRecordedCourse;
function addTiming(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // const timingDocument =;
                //     await batchModel.findByIdAndUpdate(req.params.batchID,{$push:{timings:{
                //         timingTitle:req.body.batchTimeTitle,
                //         // startDate:req.body.startDate,
                //         // startTime:req.body.startTime,
                //         timeZone:req.body.timeZone,
                //         // duration:{
                //                 // hours:req.body.hours,
                //                 // minutes:req.body.minutes
                //         // },
                //         seatLimit:req.body.seatLimit
                // }}});
                // courseRender.liveCourseEditRender(req,res,'','Batch timing added Succesfully');
            }
            catch (e) {
                console.log(e.message);
            }
            return [2 /*return*/];
        });
    });
}
exports.addTiming = addTiming;
// Live Course Functions 
function saveLiveCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var isPaid, category, updateDocument, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    isPaid = false;
                    category = void 0;
                    if (req.body.feeCollectionPeriod || req.body.coursePrice) {
                        isPaid = true;
                    }
                    category = req.body.courseCategory;
                    if (!(req.body.newCourseCategory != undefined && req.body.newCourseCategory != '')) return [3 /*break*/, 3];
                    return [4 /*yield*/, courseCategoryModel_1.default.create({
                            categoryName: req.body.newCourseCategory
                        })];
                case 2:
                    _a.sent();
                    category = req.body.newCourseCategory;
                    _a.label = 3;
                case 3:
                    updateDocument = {
                        courseTitle: req.body.courseTitle,
                        courseDescription: req.body.courseDescription,
                        // courseThumbnail: (req as unknown as MulterRequest)?.file?.location,
                        courseCategory: category,
                        courseType: req.body.courseType,
                        isPaid: isPaid,
                        feeDetails: {
                            price: req.body.coursePrice,
                            currency: JSON.parse(req.body.currency),
                            collectionPeriod: req.body.feeCollectionPeriod,
                            collectionDuration: req.body.courseFeeCustomPeriod,
                            collectionDurationUnit: req.body.courseFeeCustomUnit
                        },
                        courseExpiryDate: req.body.courseExpiryDate,
                        lastUpdate: Date(),
                        duration: {
                            durationValue: req.body.durationValue,
                            durationUnit: req.body.durationUnit
                        }
                    };
                    console.log(updateDocument);
                    // await courseModel.findByIdAndUpdate(req.params.courseID,updateDocument);
                    res.redirect('/admin/courses/edit/live/' + req.params.courseID);
                    return [3 /*break*/, 5];
                case 4:
                    e_7 = _a.sent();
                    console.log(e_7.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.saveLiveCourse = saveLiveCourse;
