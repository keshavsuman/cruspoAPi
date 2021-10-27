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
var appointmentAPI = __importStar(require("../../../controller/appointment/appointmentAPI"));
var sendMailController_1 = require("../../../controller/mail/sendMailController");
var appointmentRouter = express_1.default();
appointmentRouter.get('/allAppointments', appointmentAPI.allAppointment);
appointmentRouter.get('/:id', appointmentAPI.getAppointment);
/**
 *
    request:
    month : single digit month index,
    year: four digit year
    
    response:
    [
        {
            "appointmentId": "678a32cwuehc7247r92t",
            "timings": {
                "startTime": "2021-06-11T13:07:31.351Z",
                "endTime": "2021-06-11T13:07:31.351Z"
                },
                "bookedDate": "2021-04-30T18:30:00.000Z",
            }
        ]
*/
appointmentRouter.get('/getBookedAppointments/:type', appointmentAPI.getBookedAppointments);
/**
 *  request Method:- POST
 *  request body:
 *  {
 *   "firstName":"keshav",
 *   "lastName":"suman",
 *   "bookedDate":"2021-04-30T18:30:00.000Z",
 *   "email":"keshavsuan96@gmail.com",
 *   "appointmentId":"aerb",
 *   "timings":{
 *           "startTime":"1623416851351",
 *           "endTime":"1623416851351"
 *       }
 *   }
 *
 *   if(success):
 *         return "appointment created"; statusCode 201
 *   if(failure):
 *         return "error.message" statusCode 401
 */
appointmentRouter.post('/bookAppointment/:appointmentId', appointmentAPI.bookAppointment);
/**
 *  Request
 *  @method POST
 *  Body:{
 *          'appointmentTitle':string,
 *          'appointmentDescription':string,
 *          'appointmentThumbnail':string,
 *          'appointmentPrice':Number,
 *          'currency':JSON,
 *          'timeZone':string,
 *          'creatorId':string,
 *  }
 *
 *  if(Success):
 *  @returns
 *      "appointment created" 201
 *  @returns
 *  if(failure):
 *      "error.message" 401
 *
 */
appointmentRouter.post('/createAppointment', appointmentAPI.createAppointments);
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
appointmentRouter.post('/updateAppointment', appointmentAPI.updateAppointment);
/**
 *
 * if(success):
 *      return "appointment deleted" statusCode 201
 * if(failure):
 *      return "error.message" statusCode 401
 *
 */
appointmentRouter.delete('/:id', appointmentAPI.deleteAppointment);
appointmentRouter.post('/sendMail', sendMailController_1.sendAppointmentRemainderMail);
module.exports = appointmentRouter;
