"use strict";
// import razorpay from 'razorpay';
// import {Request,Response} from 'express';
// import crypto from 'crypto';
// import jsonwebtoken from 'jsonwebtoken';
// import paymentLogModel,{PaymentStatus} from '../../models/paymentLogModel';
// import learnerModel from '../../models/manageMember/learnerModel';
// import { RazorpayOrderInterface } from '../../interfaces/payment/razorpayOrderInterface';
// import { learnerJWTInterface } from '../../interfaces/jsonwebtokenInterface';
// import {Program} from '../../models/programModel';
// const instance = new razorpay({
//         key_id: process.env.RAZORPAYKEYID,
//         key_secret: process.env.RAZORPAYKEYSECRET
//     });
// export async function createOrder(course:Program,paymentFor:string,metaData:Map<String,any>){
//   try{
//     var price = course.feeDetails.price;
//     var currency = course.feeDetails.currency;
//     var order:RazorpayOrderInterface = await instance.orders.create({
//       amount: price,  // amount in the smallest currency unit
//       currency: currency,
//       notes:{
//       }
//     });
//     await paymentLogModel.create({
//       razorpayOrderId:order.id,
//       paymentFor:paymentFor,
//       amount:price,
//       currency:currency,
//       createdAt:Date(),
//       metaData:{
//         programId:metaData.get('courseId'),
//       }
//     });
//   return order;
//   }catch(error){
//     console.log(error);
//     return null;
//   }
// }
// export async function verifySignature(req:Request,res:Response){    
//   try{
//       var update = await isSignatureVerified(req.body.razorpay_order_id,req.body.razorpay_payment_id,req.body.razorpay_signature);
//       if(update){
//         switch(update['paymentFor']){
//           case 'COURSE':
//             var learner:learnerJWTInterface = <learnerJWTInterface>jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
//             await learnerModel(res.get('userName')).findByIdAndUpdate(learner.learnerId,{
//               $addToSet:{'coursesPurchased':update['metaData'].get('courseId')}
//             });
//             res.redirect('/learn/course/'+update['metaData'].get('courseId'));
//             break;
//           case 'ASSETDOWNLOAD':
//             res.redirect('https://'+process.env.userWebsite);
//               break;
//           case 'APPOINTMENT':
//               res.redirect('https://'+process.env.userWebsite);
//               break;
//           case 'MISCELLANEOUS':    
//                 res.redirect('https://'+process.env.userWebsite);
//               break;
//           default:
//             res.redirect('https://'+process.env.userWebsite);
//             console.log('Nothing happened');
//         }
//       }   
//     }catch(error)
//     {
//       console.log(error);
//       res.send('failed to verify your payment please contact to site Owner');
//     }
// };
// async function isSignatureVerified(razorpay_order_id:string,razorpay_payment_id:string,razorpay_signature:string) {
//   try{
//     var body = razorpay_order_id+'|'+razorpay_payment_id;
//     var expectedSignature = crypto.
//     createHmac("sha256",String(process.env.KEYSECRET)).
//     update(body.toString())
//     .digest('hex');
//     if(razorpay_signature===expectedSignature)
//     {
//       var update = await paymentLogModel.findOneAndUpdate({razorpayOrderId:razorpay_order_id},{
//         razorpayPaymentID:razorpay_payment_id,
//         razorpaySignature:razorpay_signature,
//         paymentStatus:PaymentStatus.SUCCESS
//       },{new:true});
//      return update;
//     }else{
//       return false;
//     }
//   }catch(error)
//   {
//     console.log(error);
//     return false;
//   }
// }
// async function createPaymentLink(req:Request,res:Response){
//   try {
//     var params = {
//       "amount": req.body.amount,
//       "currency": "INR",
//       "accept_partial": true,
//       "first_min_partial_amount": 100,
//       "expire_by": 1691097057,
//       "reference_id": "TS1989",
//       "description": "Payment for policy no #23456",
//       "customer": {
//         "name": "keshav suman",
//         "contact": "+919602514096",
//         "email": "keshavsuman96@gmail.com"
//       },
//       "notify": {
//         "sms": false,
//         "email": false
//       },
//       "reminder_enable": true,
//       "notes": {
//         "policy_name": "Jeevan Bima"
//       },
//       "callback_url": "https://"+process.env.userWebsite+".com/",
//       "callback_method": "get"
//     };
//     var link =  instance.invoices.create(params);
//     } catch (error) {
//     console.log(error);
//   }
// } 
