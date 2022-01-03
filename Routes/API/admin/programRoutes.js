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
var programController = __importStar(require("../../../controller/program/programControllerAPI"));
var programRoutes = express_1.Router();
programRoutes.post('/getPrograms', programController.getPrograms);
programRoutes.post('/createProgram', programController.createProgram);
programRoutes.post('/updateProgram/:programId', programController.updatedprogram);
programRoutes.delete('/deleteProgram/:programId', programController.deleteprogram);
programRoutes.post('/getCategories', programController.getCategories);
programRoutes.post('/:programId/getBatch', programController.getBatch);
programRoutes.post('/:programId/createBatch', programController.createBatch);
programRoutes.post('/:programId/updateBatch/:batchId', programController.updateBatch);
programRoutes.delete('/:programId/deleteBatch/:batchId', programController.deleteBatch);
module.exports = programRoutes;
