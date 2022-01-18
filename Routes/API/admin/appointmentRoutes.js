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
var appointmentController = __importStar(require("../../../controller/appointment/appointmentController"));
var sendMailController_1 = require("../../../controller/mail/sendMailController");
var appointmentRouter = express_1.default();
appointmentRouter.get('/:id', appointmentController.getAppointmentById);
appointmentRouter.post('/getAppointments', appointmentController.getAppointments);
appointmentRouter.post('/getPastAppointmentBookings', appointmentController.getPastAppointmentBookings);
appointmentRouter.post('/getUpcomingAppointmentBookings', appointmentController.getUpcomingAppointmentBookings);
appointmentRouter.delete('/:id', appointmentController.deleteAppointment);
appointmentRouter.post('/updateAppointment', appointmentController.updateAppointment);
appointmentRouter.post('/sendMail', sendMailController_1.sendAppointmentRemainderMail);
appointmentRouter.post('/createAppointment', appointmentController.createAppointments);
appointmentRouter.post('/bookAppointment/:appointmentId', appointmentController.bookAppointment);
/**
 *  request Method POST:
 *  body:{
 *      'appointmentTitle:string,
 *      'appointmentDescription':string,
 *      'appointmentThumbnail':string,
 *      'appointmentPrice':number,
 *      'currency':json,
 *      'status':string,
 *      'timeZone':string,
 *      'duration':{
 *              hours:number,
 *              minutes:number
 *          },
 *       'availableDates':[{
 *              availabilityType:string,  // Enums ['Once','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday']
 *               value:{
 *                   type:Date,
 *               },
 *               timings:[{
 *                        startDuration:Date,
 *                        endDuration:Date
 *                   }]
 *          }]
 *  }
 *
 *  if(success):
 *      return "appointment updated" statusCode 201
 *  if(failure):
 *      return "error.message" statusCode 401
 *
 */
module.exports = appointmentRouter;
