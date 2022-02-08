"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import * as memberControllerAPI from '../../../controller/member/memberControllerAPI';
var manageMemberRoutes = (0, express_1.default)();
// manageMemberRoutes.get('/getLearners',memberControllerAPI.getMembers);
// manageMemberRoutes.post('/addmember',memberControllerAPI.addLearner);
// manageMemberRoutes.get('/members',memberControllerAPI.getMembers);
// manageMemberRoutes.post('/createGroup',memberControllerAPI.createGroup);
// manageMemberRoutes.get('/getGroups',memberControllerAPI.getGroups); 
module.exports = manageMemberRoutes;
