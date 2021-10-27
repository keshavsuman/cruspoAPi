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
exports.purchaseProgram = exports.getProgramById = exports.getPrograms = exports.getPurchasedProgram = exports.lesson = exports.purchaseCourse = exports.courses = exports.coursePage = exports.dashboard = void 0;
var courseModel_1 = __importDefault(require("../../models/courseModel"));
var razorpayController = __importStar(require("../../controller/payment/razorpayController"));
var jsonwebtoken = __importStar(require("jsonwebtoken"));
var authenticationController = __importStar(require("../authenticationController"));
var learnerModel_1 = __importDefault(require("../../models/manageMember/learnerModel"));
var lessonModel_1 = __importDefault(require("../../models/lessonModel"));
var mongoose_1 = __importDefault(require("mongoose"));
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, learnerDocument, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, learnerModel_1.default.findById(learner.learnerId).populate('coursesPurchased')];
                case 1:
                    learnerDocument = _a.sent();
                    res.render('learn/learner-dashboard', {
                        purchasedCourses: learnerDocument === null || learnerDocument === void 0 ? void 0 : learnerDocument.coursesPurchased
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.dashboard = dashboard;
function coursePage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var isLogin, creator, course, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    isLogin = false;
                    if (req.cookies.authLearnerToken) {
                        isLogin = true;
                    }
                    return [4 /*yield*/, authenticationController.getCreator(String(process.env.userId))];
                case 1:
                    creator = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseId).populate({
                            path: 'modules',
                            populate: {
                                path: 'lessons',
                                model: 'lesson'
                            }
                        })];
                case 2:
                    course = _a.sent();
                    if (!course) {
                        res.send('error 404');
                    }
                    res.render('learn/view-course-page', {
                        course: course,
                        creator: creator,
                        isLogin: isLogin
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    res.send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.coursePage = coursePage;
function courses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, learner, learnerCourses, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, courseModel_1.default.find()];
                case 1:
                    courses = _a.sent();
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, learnerModel_1.default.findById(learner.learnerId).populate('coursesPurchased')];
                case 2:
                    learnerCourses = _a.sent();
                    res.render('learn/learner-courses', {
                        courses: courses,
                        purchasedCourses: learnerCourses === null || learnerCourses === void 0 ? void 0 : learnerCourses.coursesPurchased
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.courses = courses;
function purchaseCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, course, creator, priceInSmallestUnit, metaData, kes, callbackURL, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseId)];
                case 1:
                    course = _a.sent();
                    return [4 /*yield*/, authenticationController.getCreator(learner.creatorId)];
                case 2:
                    creator = _a.sent();
                    priceInSmallestUnit = course.feeDetails.price * 100;
                    metaData = new Map();
                    metaData.set('courseId', course === null || course === void 0 ? void 0 : course._id);
                    return [4 /*yield*/, razorpayController.createOrder(course, 'COURSE', metaData)];
                case 3:
                    kes = _a.sent();
                    callbackURL = req.protocol + "//" + process.env.userWebsite + "/payment/razorpay/verifyPayment";
                    res.render('payment', {
                        key: process.env.KEYID,
                        amount: priceInSmallestUnit,
                        currency: (course === null || course === void 0 ? void 0 : course.feeDetails.currency).name,
                        name: creator['firstName'] + ' ' + creator['lastName'],
                        description: course === null || course === void 0 ? void 0 : course.courseTitle,
                        image: "",
                        orderId: kes.id,
                        prefillName: "",
                        prefillEmail: "",
                        prefillContact: "",
                        callbackURL: callbackURL
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.log(error_4.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.purchaseCourse = purchaseCourse;
function lesson(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, purchasedCourses, lesson, course;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, learnerModel_1.default.findById(learner.learnerId).select('coursesPurchased')];
                case 1:
                    purchasedCourses = _a.sent();
                    console.log(purchasedCourses);
                    console.log(typeof req.params.courseId);
                    if (!(purchasedCourses === null || purchasedCourses === void 0 ? void 0 : purchasedCourses.coursesPurchased.includes(new mongoose_1.default.Types.ObjectId(req.params.courseId)))) return [3 /*break*/, 4];
                    return [4 /*yield*/, lessonModel_1.default.findById(req.params.lessonId)];
                case 2:
                    lesson = _a.sent();
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseId).populate({
                            path: 'modules',
                            populate: {
                                path: 'lessons',
                                model: 'lesson'
                            }
                        })];
                case 3:
                    course = _a.sent();
                    res.render('learn/video-lesson', {
                        lesson: lesson,
                        course: course
                    });
                    return [3 /*break*/, 5];
                case 4:
                    res.redirect('/learn/purchaseCourse/' + req.params.courseId);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.lesson = lesson;
// APIs
function getPurchasedProgram(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var coursesPurchased, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, learnerModel_1.default.findById(res.locals.get('user').userId, { coursesPurchased: 1 }).populate('coursesPurchased')];
                case 1:
                    coursesPurchased = _a.sent();
                    res.status(200).send(coursesPurchased);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5.message);
                    res.status(500).send(error_5.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPurchasedProgram = getPurchasedProgram;
function getPrograms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, courseModel_1.default.find({}).sort({ _id: -1 }).limit(20)];
                case 1:
                    courses = _a.sent();
                    res.status(200).send(courses);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6.message);
                    res.status(500).send(error_6.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPrograms = getPrograms;
function getProgramById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var course, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, courseModel_1.default.findById(req.params.courseId)];
                case 1:
                    course = _a.sent();
                    if (course) {
                        res.status(200).send(course);
                    }
                    else {
                        res.status(404).send("Course Not Found");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7.message);
                    res.status(500).send(error_7.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProgramById = getProgramById;
function purchaseProgram(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var course, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, courseModel_1.default.findById(req.body.courseId)];
                case 1:
                    course = _a.sent();
                    return [4 /*yield*/, learnerModel_1.default.findByIdAndUpdate(res.locals.user.userId, {
                            $addToSet: { coursesPurchased: course === null || course === void 0 ? void 0 : course.id }
                        })];
                case 2:
                    _a.sent();
                    res.status(200).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    console.log(error_8.message);
                    res.status(500).send(error_8.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.purchaseProgram = purchaseProgram;
