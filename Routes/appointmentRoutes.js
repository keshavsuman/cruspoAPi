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
var appointmentController = __importStar(require("../controller/appointment/appointmentController"));
var appointment = express_1.Router();
appointment.get('/', appointmentController.getAppointments);
appointment.get('/edit/:appointmentID', appointmentController.getEditAppointment);
// appointment.get('/edit/:appointmentID',(req:Request,res:Response)=>{
//     res.sendFile(path.resolve(__dirname,'../views/admin/editAppointment.html'));
// });
appointment.post('/add', [appointmentController.uploadAppointmentThumbnail, appointmentController.insertAppointment]);
appointment.post('/edit/save/:appointmentID', appointmentController.saveAppointment);
appointment.post('/edit/saveAndPublish:appointmentID', appointmentController.saveAndPublishAppointment);
appointment.post('/edit/unpublish/:appointmentID', appointmentController.unpublishAppointment);
appointment.post('/bookappointment', appointmentController.bookAppointment);
module.exports = appointment;
