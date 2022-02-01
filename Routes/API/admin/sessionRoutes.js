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
var sessionController = __importStar(require("../../../controller/session/sessionController"));
var sessionRoutes = (0, express_1.Router)();
sessionRoutes.post('/getSessions', sessionController.getSessions);
sessionRoutes.post('/getUpcomingSessions', sessionController.getUpcomingSessions);
sessionRoutes.post('/getPastSessions', sessionController.getPastSessions);
sessionRoutes.get('/getSessionById/:id', sessionController.getSessionById);
sessionRoutes.post('/createSession', sessionController.createSession);
sessionRoutes.post('/updateSession/:sessionId', sessionController.updateSession);
sessionRoutes.delete('/deleteSession/:sessionId', sessionController.deleteSession);
module.exports = sessionRoutes;
