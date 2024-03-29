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
exports.getMailTemplates = exports.updateTemplate = exports.deleteTemplate = exports.createTemplate = void 0;
var mailTemplateModel_1 = __importDefault(require("../../models/mail/mailTemplateModel"));
function createTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var template, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).create({
                            templateName: req.body.templateName,
                            subject: req.body.subject,
                            body: req.body.body,
                        })];
                case 1:
                    template = _a.sent();
                    res.status(201).json({
                        status: 201,
                        message: 'Template created succesfully',
                        data: template
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
exports.createTemplate = createTemplate;
function deleteTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).findByIdAndDelete(req.params.templateId)];
                case 1:
                    _a.sent();
                    res.status(201).json({
                        status: 201,
                        message: 'Template deleted succesfully',
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
exports.deleteTemplate = deleteTemplate;
function updateTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var template, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).findById(req.params.templateId)];
                case 1:
                    template = _a.sent();
                    if (!template) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).findByIdAndUpdate(req.params.templateId, req.body)];
                case 2:
                    _a.sent();
                    // template.set('templateName',req.body.templateName);
                    // template.set('subject',req.body.subject);
                    // template.set('body',req.body.body);
                    // await template.save();
                    res.status(201).json({
                        status: 200,
                        message: 'Template updated succesfully',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(401).json({
                        status: 401,
                        message: 'Template not found',
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res.status(500).json({
                        status: 500,
                        message: 'Internal Server Error'
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateTemplate = updateTemplate;
function getMailTemplates(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, select, project, limit, skip, templates, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, select = _a.select, project = _a.project, limit = _a.limit, skip = _a.skip;
                    return [4 /*yield*/, (0, mailTemplateModel_1.default)(res.get('userName')).find(select, project).sort({ createdAt: -1 }).limit(limit !== null && limit !== void 0 ? limit : 20).skip(skip !== null && skip !== void 0 ? skip : 0)];
                case 1:
                    templates = _b.sent();
                    res.status(200).json({
                        status: 200,
                        message: 'Templates fetched succesfully',
                        data: templates
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
exports.getMailTemplates = getMailTemplates;
