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
exports.deleteGroup = exports.getGroups = exports.updateGroup = exports.createGroup = exports.createSubscriber = exports.updateSubscriber = exports.deleteSubscriber = exports.getSubscribers = void 0;
var groupModel_1 = __importDefault(require("../../models/manageMember/groupModel"));
var subscriberModel_1 = __importStar(require("../../models/manageMember/subscriberModel"));
function getSubscribers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, sort, limit, learners, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, sort = _a.sort, limit = _a.limit;
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName'))
                            .find(__assign(__assign({}, select), { status: { $in: ['ACTIVE', 'DEACTIVE'] } }), project).sort(sort !== null && sort !== void 0 ? sort : {})
                            .limit(limit)];
                case 1:
                    learners = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Subscriber fetched successfully",
                        data: learners
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(500).json({
                        status: 500,
                        message: ""
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSubscribers = getSubscribers;
function deleteSubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.id, {
                            status: subscriberModel_1.learnerStatus.DELETED
                        })];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Subscriber deleted successfully",
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).json({
                        status: 500,
                        message: ""
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteSubscriber = deleteSubscriber;
function updateSubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var learner, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    learner = _a.sent();
                    if (!learner) return [3 /*break*/, 3];
                    delete req.body.password;
                    delete req.body.email;
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).findByIdAndUpdate(learner._id, req.body)];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Subscriber updated successfully",
                        data: null
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(200).json({
                        status: 404,
                        message: "Subscriber Not found",
                        data: null
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).json({
                        status: 500,
                        message: error_3,
                        data: null
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateSubscriber = updateSubscriber;
function createSubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var member, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).find({
                            email: req.body.email
                        })];
                case 1:
                    member = _a.sent();
                    if (!(member.length > 0)) return [3 /*break*/, 2];
                    res.status(200).send({
                        status: 200,
                        message: 'ALREADY_EXISTS'
                    });
                    return [2 /*return*/];
                case 2: 
                // const learnerResponse = await axios.post(process.env.authenticationURL+'/learner/get',{
                // select:{
                //     email:req.body.email
                // },
                // project:{
                //     firstName:1,
                //     lastName:1,
                //     email:1,
                //     password:1,
                //     }
                // },{
                //     headers:{
                //         'Content-type':'application/json'
                //     },
                // });
                // if(learnerResponse.data.length>0){
                //     await learnerModel(res.get('userName')).create({
                //         firstName:learnerResponse.data[0].firstName,
                //         lastName:learnerResponse.data[0].lastName,
                //         email:learnerResponse.data[0].email,
                //         password:learnerResponse.data[0].password,
                //         creatorId:res.get('_id'),
                //         learnerRefId:learnerResponse.data[0]._id
                //     })
                //     res.status(201).send({
                //         message:'USER_CREATED'
                //     });
                //     return 
                // }else{
                // const response = await axios.post(process.env.authenticationURL+'learner/signup',{
                //     firstName:req.body.fullName.split(' ')[0],
                //     lastName:req.body.fullName,
                //     email:req.body.email,
                //     password:req.body.password,
                //     creatorId:res.get('userName'),
                // },{
                //     headers:{
                //         'Content-type':'application/json'
                //     }
                // });
                // if(response.status===201){
                return [4 /*yield*/, subscriberModel_1.default(res.get('userName')).create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        contactDetails: req.body.contactDetails
                    })];
                case 3:
                    // const learnerResponse = await axios.post(process.env.authenticationURL+'/learner/get',{
                    // select:{
                    //     email:req.body.email
                    // },
                    // project:{
                    //     firstName:1,
                    //     lastName:1,
                    //     email:1,
                    //     password:1,
                    //     }
                    // },{
                    //     headers:{
                    //         'Content-type':'application/json'
                    //     },
                    // });
                    // if(learnerResponse.data.length>0){
                    //     await learnerModel(res.get('userName')).create({
                    //         firstName:learnerResponse.data[0].firstName,
                    //         lastName:learnerResponse.data[0].lastName,
                    //         email:learnerResponse.data[0].email,
                    //         password:learnerResponse.data[0].password,
                    //         creatorId:res.get('_id'),
                    //         learnerRefId:learnerResponse.data[0]._id
                    //     })
                    //     res.status(201).send({
                    //         message:'USER_CREATED'
                    //     });
                    //     return 
                    // }else{
                    // const response = await axios.post(process.env.authenticationURL+'learner/signup',{
                    //     firstName:req.body.fullName.split(' ')[0],
                    //     lastName:req.body.fullName,
                    //     email:req.body.email,
                    //     password:req.body.password,
                    //     creatorId:res.get('userName'),
                    // },{
                    //     headers:{
                    //         'Content-type':'application/json'
                    //     }
                    // });
                    // if(response.status===201){
                    _a.sent();
                    res.status(201).send({ status: 201, message: 'USER_CREATED' });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).json({
                        status: 500,
                        message: error_4
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createSubscriber = createSubscriber;
// Groups 
function createGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var group, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, groupModel_1.default(res.get('userName')).create({
                            groupName: req.body.groupName
                        })];
                case 1:
                    group = _a.sent();
                    // if(req.body.fromExistingGroup){
                    //     await learnerModel(res.get('userName')).updateMany({groupsJoined: {$elemMatch: req.body.fromExistingGroup}},{$addToSet:{groupsJoined:group._id}});
                    // }
                    res.status(201).json({
                        status: 201,
                        message: "Group created Successfully",
                        data: group
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(500).json({
                        status: 500,
                        message: error_5
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
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
                    return [4 /*yield*/, groupModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    group = _a.sent();
                    if (!group) return [3 /*break*/, 3];
                    return [4 /*yield*/, groupModel_1.default(res.get('userName')).findByIdAndUpdate(group._id, req.body)];
                case 2:
                    _a.sent();
                    res.status(200).send({
                        status: 200,
                        message: "Group Updated"
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(200).send({
                        status: 404,
                        message: "Group Not Found"
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(500).send({
                        status: 500,
                        message: error_6
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateGroup = updateGroup;
function getGroups(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, skip, limit, groups, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, skip = _a.skip, limit = _a.limit;
                    return [4 /*yield*/, groupModel_1.default(res.get('userName')).find(__assign(__assign({}, select), { status: { $nin: ['DELETED'] } }), project).skip(skip !== null && skip !== void 0 ? skip : 0).limit(limit !== null && limit !== void 0 ? limit : 20)];
                case 1:
                    groups = _b.sent();
                    res.send({
                        message: "Groups fetched successfully",
                        data: groups
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
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
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, groupModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.id, {
                            status: "DELETED"
                        })];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Group deleted successfully"
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    res.status(500).send({
                        status: 500,
                        message: error_8,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteGroup = deleteGroup;
