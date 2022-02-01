"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import * as RazorPayController from '../controller/payment/razorpayController';
var paymentRouter = (0, express_1.Router)();
// paymentRouter.get('/coursePayment/1999',async (req,res)=>{
//     var priceInSmallestUnit = 1999 * 100;
//         var metaData = new Map<String,any>();
//         metaData.set('paymentFor','Course');
//         var kes:any = await RazorPayController.createOrder(
//             priceInSmallestUnit,
//             'INR',
//             'MISCELLANEOUS',
//             // metaData,
//             );
//             var callbackURL = 'https://sapnashah.in/payment/razorpay/verifyPayment';
//         res.render('payment',{
//             key : process.env.KEYID,
//             amount:priceInSmallestUnit,
//             currency:'INR',
//             name:'',
//             description:'Exclusive 5 days communication workshop',
//             image:"",
//             orderId:kes.id,
//             prefillName:"",
//             prefillEmail:"",
//             prefillContact:"",
//             callbackURL:callbackURL
//         });
// });
// paymentRouter.post('/razorpay/verifyPayment',RazorPayController.verifySignature);
module.exports = paymentRouter;
