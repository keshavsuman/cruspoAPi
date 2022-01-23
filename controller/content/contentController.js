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
exports.getContentsByUser = exports.getCollectionById = exports.deleteCollection = exports.updateCollection = exports.createCollection = exports.getCollection = exports.deleteMultipleContent = exports.deleteContent = exports.getFileUploadURL = exports.updateContent = exports.createContent = exports.getContentById = exports.getContents = void 0;
var contentModel_1 = __importDefault(require("../../models/content/contentModel"));
var collectionModel_1 = __importDefault(require("../../models/collectionModel"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var response_1 = require("../response");
function getContents(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, contentType, search, match, contents, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip, contentType = _a.contentType, search = _a.search;
                    match = new Map();
                    match.set('status', { $in: ['PUBLISHED', 'UNPUBLISHED', 'DRAFT'] });
                    if (contentType) {
                        match.set('contentType', contentType);
                    }
                    if (search) {
                        match.set('$or', [{ contentTitle: { $regex: search, $options: 'i' } }, { contentDescription: { $regex: search, $options: 'i' } }]);
                    }
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).aggregate([
                            {
                                $match: match
                            }, {
                                $sort: {
                                    '_id': 1
                                }
                            },
                            {
                                $limit: limit !== null && limit !== void 0 ? limit : 20
                            },
                            {
                                $skip: skip !== null && skip !== void 0 ? skip : 0
                            },
                            // {
                            //     $project:project
                            // }
                        ])];
                case 1:
                    contents = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Contents fetched successfully",
                        data: contents
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
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
exports.getContents = getContents;
function getContentById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var content, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.params.id) return [3 /*break*/, 2];
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    content = _a.sent();
                    res.status(200).send({
                        status: 200,
                        data: content
                    });
                    return [3 /*break*/, 3];
                case 2:
                    res.status(200).json({
                        status: 400,
                        message: "Content id is required",
                        data: null
                    });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error',
                        data: null
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getContentById = getContentById;
function createContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var content, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).create({
                            contentTitle: req.body.contentTitle,
                            contentDescription: req.body.contentDescription,
                            contentThumbnail: req.body.contentThumbnail,
                            contentType: req.body.contentType,
                            contentURL: req.body.contentURL,
                            isPaid: false
                        })];
                case 1:
                    content = _a.sent();
                    res.status(201).send({
                        status: 201,
                        message: 'Content Registered Successfully',
                        data: content
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send({
                        status: 500,
                        error: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createContent = createContent;
function updateContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var content, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.id, {
                            contentTitle: req.body.contentTitle,
                            contentDescription: req.body.contentDescription,
                            contentThumbnail: req.body.contentThumbnail,
                            isPaid: false,
                            status: req.body.status,
                            collection: req.body.collection
                        }, { new: true })];
                case 1:
                    content = _a.sent();
                    res.status(200).send({
                        status: 200,
                        message: 'Content Updated Successfully',
                        data: content
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send({
                        status: 500,
                        error: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateContent = updateContent;
function getFileUploadURL(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var s3, url, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    s3 = new aws_sdk_1.default.S3({
                        accessKeyId: process.env.AWSAccessKeyId,
                        secretAccessKey: process.env.AWSSecretKey,
                        signatureVersion: 'v4',
                        region: 'ap-south-1',
                    });
                    return [4 /*yield*/, s3.getSignedUrl('putObject', {
                            Bucket: 'cruspostorage',
                            ContentType: req.body.fileType,
                            ACL: 'public-read',
                            Key: req.body.fileName
                        })];
                case 1:
                    url = _a.sent();
                    res.status(200).send({ url: url });
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
exports.getFileUploadURL = getFileUploadURL;
function deleteContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).findByIdAndUpdate(req.params.contentId, {
                            status: 'DELETED'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send({
                        status: 200,
                        message: 'Content Deleted Successfully'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    res.status(500).send({
                        error: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteContent = deleteContent;
function deleteMultipleContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).updateMany({
                            _id: { $in: req.body.contentIds }
                        }, {
                            contentStatus: 'deleted'
                        })];
                case 1:
                    _a.sent();
                    res.status(200).send({
                        status: 200,
                        message: 'Contents Deleted Successfully',
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    res.status(500).send({
                        error: 'Internal Server Error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleContent = deleteMultipleContent;
function getCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, skip, limit, collections, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, skip = _a.skip, limit = _a.limit;
                    return [4 /*yield*/, collectionModel_1.default(res.get('userName')).find(select, project).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    collections = _b.sent();
                    res.status(200).send({
                        status: 200,
                        message: "Collection fetched successfully",
                        data: collections
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    console.log(error_8);
                    res.status(500).json({
                        status: 500,
                        message: error_8,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCollection = getCollection;
function createCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, collectionModel_1.default(res.get('userName')).create({
                            collectionName: req.body.collectionName,
                            collectionDescription: req.body.collectionDescription,
                            price: {
                                currency: req.body.currency,
                                amount: req.body.amount
                            },
                            status: req.body.status,
                        })];
                case 1:
                    collection = _a.sent();
                    res.status(201).send({
                        status: 201,
                        message: "Collection Created successfully",
                        data: collection
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.log(error_9);
                    res.status(500).json({
                        status: 500,
                        message: error_9,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createCollection = createCollection;
function updateCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, collectionModel_1.default(res.get('userName')).create({})];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    console.log(error_10);
                    res.status(500).json({
                        status: 500,
                        message: error_10,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateCollection = updateCollection;
function deleteCollection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, collectionModel_1.default(res.get('userName')).create({})];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    console.log(error_11);
                    res.status(500).json({
                        status: 500,
                        message: error_11,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCollection = deleteCollection;
function getCollectionById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, collectionModel_1.default(res.get('userName')).findById(req.params.id)];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        status: 200,
                        message: "Collection fetched",
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _a.sent();
                    console.log(error_12);
                    res.status(500).json({
                        status: 500,
                        message: error_12,
                        data: null
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCollectionById = getCollectionById;
function getContentsByUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, skip, limit, contents, error_13;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, skip = _a.skip, limit = _a.limit;
                    return [4 /*yield*/, contentModel_1.default(res.get('userName')).find(select, project).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    contents = _b.sent();
                    response_1.userResponse(res, 200, {
                        status: 200,
                        message: "Contents fetched",
                        data: contents
                    }, true);
                    return [3 /*break*/, 3];
                case 2:
                    error_13 = _b.sent();
                    console.log(error_13);
                    response_1.userResponse(res, 500, {
                        status: 500,
                        message: error_13,
                        data: null
                    }, false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getContentsByUser = getContentsByUser;
