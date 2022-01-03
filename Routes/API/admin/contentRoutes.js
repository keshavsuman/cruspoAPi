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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contentController = __importStar(require("../../../controller/content/contentController"));
var contentRoutes = express_1.Router();
contentRoutes.post('/getContents', contentController.getContents);
contentRoutes.post('/createContent', contentController.createContent);
contentRoutes.delete('/deleteContent/:contentId', contentController.deleteContent);
contentRoutes.delete('/deleteMultipleContent', contentController.deleteMultipleContent);
// contentRoutes.get('/getCategories',programController.getCategories);
// contentRoutes.get('/getSubCategories/:categoryId',programController.getSubCategories);
// contentRoutes.post('/createProgram',programController.createProgram);
// contentRoutes.post('/updateProgram/:programId',programController.updatedprogram);
// contentRoutes.delete('/deleteCourse/:programId',programController.deleteprogram);
// contentRoutes.post('/:programId/createBatch',programController.createBatch);
// contentRoutes.patch('/:programId/updateBatch/:batchId',programController.updateBatch);
// contentRoutes.delete('/:programId/deleteBatch/:batchId',programController.deleteBatch);
contentRoutes.get('/getFileUploadLink/:fileName', contentController.getFileUploadURL);
module.exports = contentRoutes;
