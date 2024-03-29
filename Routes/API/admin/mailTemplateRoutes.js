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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mailTemplateController = __importStar(require("../../../controller/mail/templateControllerAPI"));
var mailTemplateRoutes = (0, express_1.default)();
/**
 * request Body:
 *  {
 *      "templateName":"",
 *      "subject":"",
 *      "body":""
 *  }
 *  response 201 if success else 401 with error message
 */
mailTemplateRoutes.post('/createTemplate', mailTemplateController.createTemplate);
/**
 *  request Body:
 *  {
 *      "templateName":"",
 *      "subject":"",
 *      "body":""
 *  }
 *  response 201 if success else 401 with error message

 */
mailTemplateRoutes.post('/updateTemplate/:templateId', mailTemplateController.updateTemplate);
/**
 * 201 if success else 401 with error message
 */
mailTemplateRoutes.delete('/deleteTemplate/:templateId', mailTemplateController.deleteTemplate);
module.exports = mailTemplateRoutes;
