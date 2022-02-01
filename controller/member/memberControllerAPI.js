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
exports.getGroups = exports.updateGroup = exports.createGroup = exports.addLearner = exports.updateLearner = exports.deleteLearner = exports.getMembers = void 0;
var axios_1 = __importDefault(require("axios"));
var groupModel_1 = __importDefault(require("../../models/manageMember/groupModel"));
var learnerModel_1 = __importDefault(require("../../models/manageMember/learnerModel"));
function getMembers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learners, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).find().sort({ _id: -1 }).limit(50)];
                case 1:
                    learners = _a.sent();
                    res.status(200).send(learners);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(401).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMembers = getMembers;
function deleteLearner(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).findByIdAndDelete(req.params.learnerId)];
                case 1:
                    _a.sent();
                    res.status(200).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteLearner = deleteLearner;
function updateLearner(req, res) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var learner, error_3;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).findById(req.params.learnerId)];
                case 1:
                    learner = _f.sent();
                    if (!learner) return [3 /*break*/, 3];
                    learner.set('firstName', (_a = req.body.firstName) !== null && _a !== void 0 ? _a : learner.firstName);
                    learner.set('lastName', (_b = req.body.lastName) !== null && _b !== void 0 ? _b : learner.lastName);
                    learner.set('email', (_c = req.body.email) !== null && _c !== void 0 ? _c : learner.email);
                    learner.set('status', (_d = req.body.status) !== null && _d !== void 0 ? _d : learner.status);
                    learner.set('programsPurchased', (_e = req.body.purchasedCourses) !== null && _e !== void 0 ? _e : learner.programsPurchased);
                    return [4 /*yield*/, learner.save()];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    res.status(201).send();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _f.sent();
                    console.log(error_3);
                    res.status(401).send(error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateLearner = updateLearner;
function addLearner(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var member, learnerResponse, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).find({
                            email: req.body.email
                        })];
                case 1:
                    member = _a.sent();
                    if (!(member.length > 0)) return [3 /*break*/, 2];
                    res.status(200).send({
                        message: 'ALREADY_EXISTS'
                    });
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, axios_1.default.post('http://localhost:2020/learner/get', {
                        select: {
                            email: req.body.email
                        },
                        project: {
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            password: 1,
                        }
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        },
                    })];
                case 3:
                    learnerResponse = _a.sent();
                    if (!(learnerResponse.data.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).create({
                            firstName: learnerResponse.data[0].firstName,
                            lastName: learnerResponse.data[0].lastName,
                            email: learnerResponse.data[0].email,
                            password: learnerResponse.data[0].password,
                            creatorId: res.get('_id'),
                            learnerRefId: learnerResponse.data[0]._id
                        })];
                case 4:
                    _a.sent();
                    res.status(201).send({
                        message: 'USER_CREATED'
                    });
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, axios_1.default.post('http://localhost:2020/learner/signup', {
                        firstName: req.body.fullName.split(' ')[0],
                        lastName: req.body.fullName,
                        email: req.body.email,
                        password: req.body.password,
                        creatorId: res.get('userName'),
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })];
                case 6:
                    response = _a.sent();
                    if (!(response.status === 201)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, learnerModel_1.default)(response.data.creator.userName).create({
                            firstName: response.data.learner.firstName,
                            lastName: response.data.learner.lastName,
                            email: response.data.learner.email,
                            password: response.data.learner.password,
                            creatorId: response.data.creator._id,
                            learnerRefId: response.data.learner._id
                        })];
                case 7:
                    _a.sent();
                    res.status(201).send({ message: 'USER_CREATED' });
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send(error_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.addLearner = addLearner;
// Groups 
function createGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var group, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, groupModel_1.default)(res.get('userName')).create({
                            groupName: req.body.groupName
                        })];
                case 1:
                    group = _a.sent();
                    if (!req.body.fromExistingGroup) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, learnerModel_1.default)(res.get('userName')).updateMany({ groupsJoined: { $elemMatch: req.body.fromExistingGroup } }, { $addToSet: { groupsJoined: group._id } })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    res.status(201).send();
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(500).send(error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createGroup = createGroup;
function updateGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var group, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, groupModel_1.default)(res.get('userName')).findById(req.params.groupId)];
                case 1:
                    group = _a.sent();
                    if (!group) return [3 /*break*/, 3];
                    group.groupName = req.body.groupName;
                    return [4 /*yield*/, group.save()];
                case 2:
                    _a.sent();
                    res.status(200).send({ message: "Group Updated" });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).send({ message: "Group Not Found" });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(403).send({ message: error_6 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateGroup = updateGroup;
function getGroups(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groups, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, groupModel_1.default)(res.get('userName')).find({})];
                case 1:
                    groups = _a.sent();
                    res.send({
                        message: "",
                        data: groups
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    res.status(500).send({
                        status: 500,
                        message: error_7,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getGroups = getGroups;
