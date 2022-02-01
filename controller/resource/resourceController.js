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
exports.createFileEntry = exports.createFolder = exports.getFolders = exports.getFiles = exports.getFileUploadURL = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var folderModel_1 = __importDefault(require("../../models/folderModel"));
var fileModel_1 = __importDefault(require("../../models/fileModel"));
function getFileUploadURL(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var s3, url, error_1;
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
                            // ContentType: type,   
                            ACL: 'public-read',
                            Key: req.params.fileName
                        })];
                case 1:
                    url = _a.sent();
                    res.status(200).send({ url: url });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFileUploadURL = getFileUploadURL;
// Remove
function getFiles(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var files, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, fileModel_1.default)(res.get('userName')).find().sort({ _id: -1 }).limit(50)];
                case 1:
                    files = _a.sent();
                    res.status(200).send({
                        files: files
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).send({
                        status: 500,
                        message: error_2,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFiles = getFiles;
function getFolders(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var folders, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, folderModel_1.default)(res.get('userName')).find().sort({ _id: -1 })];
                case 1:
                    folders = _a.sent();
                    res.send({
                        status: 200,
                        message: "",
                        data: folders
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).send({
                        status: 500,
                        message: error_3,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFolders = getFolders;
function createFolder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var folder, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, folderModel_1.default)(res.get('userName')).create({
                            folderName: req.body.folderName,
                            createdBy: res.get('_id'),
                        })];
                case 1:
                    folder = _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createFolder = createFolder;
function createFileEntry(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var file, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    file = new ((0, fileModel_1.default)(res.get('userName')))();
                    file.fileName = req.body.fileName,
                        file.fileSize = req.body.size,
                        file.fileType = req.body.fileType,
                        file.fileURL = req.body.fileUrl,
                        file.lastModified = new Date(Date.now());
                    return [4 /*yield*/, file.save()];
                case 1:
                    _a.sent();
                    res.status(201).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    res.status(403).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createFileEntry = createFileEntry;
