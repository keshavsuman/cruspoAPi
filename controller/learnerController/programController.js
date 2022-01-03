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
exports.getProgramById = exports.getPrograms = exports.getPurchasedProgram = exports.lesson = exports.programs = exports.programPage = exports.dashboard = void 0;
var programModel_1 = __importDefault(require("../../models/programModel"));
var jsonwebtoken = __importStar(require("jsonwebtoken"));
var authenticationController = __importStar(require("../authenticationController"));
var subscriberModel_1 = __importDefault(require("../../models/manageMember/subscriberModel"));
var mongoose_1 = __importDefault(require("mongoose"));
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, learnerDocument, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(learner.learnerId).populate('programsPurchased')];
                case 1:
                    learnerDocument = _a.sent();
                    res.render('learn/learner-dashboard', {
                        purchasedprograms: learnerDocument === null || learnerDocument === void 0 ? void 0 : learnerDocument.programsPurchased
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.dashboard = dashboard;
function programPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var isLogin, creator, program, error_2;
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
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findById(req.params.programId).populate({
                            path: 'modules',
                            populate: {
                                path: 'lessons',
                                model: 'lesson'
                            }
                        })];
                case 2:
                    program = _a.sent();
                    if (!program) {
                        res.send('error 404');
                    }
                    res.render('learn/view-program-page', {
                        program: program,
                        creator: creator,
                        isLogin: isLogin
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.programPage = programPage;
function programs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var programs, learner, learnerprograms, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).find()];
                case 1:
                    programs = _a.sent();
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(learner.learnerId).populate('programsPurchased')];
                case 2:
                    learnerprograms = _a.sent();
                    res.render('learn/learner-programs', {
                        programs: programs,
                        purchasedprograms: learnerprograms === null || learnerprograms === void 0 ? void 0 : learnerprograms.programsPurchased
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.programs = programs;
// export async function purchaseprogram(req:Request,res:Response){
//     try {
//         var learner = <learnerJWTInterface>jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
//         var program:Program|null = await programModel(res.get('userName')).findById(req.params.programId);
//         var creator = await authenticationController.getCreator(learner.creatorId);
//         var priceInSmallestUnit = program!.feeDetails!.price * 100;
//         var metaData = new Map<String,any>();
//         metaData.set('programId',program?._id);
//         var kes:any = await razorpayController.createOrder(program!,
//             'program',
//             metaData,
//             );
//             var callbackURL = req.protocol+"//"+process.env.userWebsite+"/payment/razorpay/verifyPayment";
//         res.render('payment',{
//             key : process.env.KEYID,
//             amount:priceInSmallestUnit,
//             currency:(program?.feeDetails.currency as ICurrency).name,
//             name:creator['firstName']+' '+creator['lastName'],
//             description:program?.programTitle,
//             image:"",
//             orderId:kes.id,
//             prefillName:"",
//             prefillEmail:"",
//             prefillContact:"",
//             callbackURL:callbackURL
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
function lesson(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, purchasedprograms, program;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    learner = jsonwebtoken.verify(req.cookies.authLearnerToken, String(process.env.userId));
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(learner.learnerId).select('programsPurchased')];
                case 1:
                    purchasedprograms = _a.sent();
                    console.log(purchasedprograms);
                    console.log(typeof req.params.programId);
                    if (!(purchasedprograms === null || purchasedprograms === void 0 ? void 0 : purchasedprograms.programsPurchased.includes(new mongoose_1.default.Types.ObjectId(req.params.programId)))) return [3 /*break*/, 3];
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findById(req.params.programId).populate({
                            path: 'modules',
                            populate: {
                                path: 'lessons',
                                model: 'lesson'
                            }
                        })];
                case 2:
                    program = _a.sent();
                    res.render('learn/video-lesson', {
                        lesson: lesson,
                        program: program
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.redirect('/learn/purchaseprogram/' + req.params.programId);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.lesson = lesson;
// APIs
function getPurchasedProgram(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var programsPurchased, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(res.locals.get('user').userId, { programsPurchased: 1 }).populate('programsPurchased')];
                case 1:
                    programsPurchased = _a.sent();
                    res.status(200).send(programsPurchased);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPurchasedProgram = getPurchasedProgram;
function getPrograms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var programs, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).find({}).sort({ _id: -1 }).limit(20)];
                case 1:
                    programs = _a.sent();
                    res.status(200).send(programs);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(500).send(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPrograms = getPrograms;
function getProgramById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var program, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, programModel_1.default(res.get('userName')).findById(req.params.programId)];
                case 1:
                    program = _a.sent();
                    if (program) {
                        res.status(200).send(program);
                    }
                    else {
                        res.status(404).send("program Not Found");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(500).send(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProgramById = getProgramById;
// export async function purchaseProgram(req:Request,res:Response){
//     try{
//         var program:Program|null = await programModel(res.get('userName')).findById(req.body.programId);
//         await learnerModel(res.get('userName')).findByIdAndUpdate(res.locals.user.userId,{
//             $addToSet:{programsPurchased:program?.id}
//         });
//         res.status(200).send();
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
