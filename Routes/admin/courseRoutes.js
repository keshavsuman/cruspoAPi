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
var programController = __importStar(require("../../controller/program/courseController"));
var program = express_1.Router();
program.get('/', programController.getCourses);
program.get('/edit/:courseID', programController.getEditCourse);
// program.get('/edit/live/:courseID',programController.getEditLiveCourse);
program.post('/add', programController.uploadCourseThumbnail, programController.insertCourse);
// Live course
program.post('/edit/live/:courseID/:batchID/addTiming', programController.addTiming);
program.post('/edit/live/saveLiveCourse/:courseID', programController.saveLiveCourse);
// course.post('/edit/live/publishLiveCourse/:courseID',courseController.publishLiveCourse);
// course.post('/edit/live/unpublishLiveCourse/:courseID',courseController.unpublishLiveCourse);
program.post('/edit/live/createBatch/:courseID', programController.createBatch);
// preRecordedCourse
program.post('/edit/savePreRecordedCourse/:courseID', programController.savePreRecordedCourse);
program.post('/edit/publishPreRecordedCourse/:courseID', programController.publishPreRecordedCourse);
// course.post('/edit/live/createModule/:courseID',courseController.createBatch);
// course.post('/edit/live/createLesson/:courseID/:moduleID',courseController.createBatch);
// helper api's
program.post('/getUploadingSignedURL', programController.videoUploadSignedURL);
module.exports = program;
