"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export async function dashboard(req:Request,res:Response){
//     try{
//         var learner = <learnerJWTInterface>jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
//         var learnerDocument:Learner|null = await learnerModel(res.get('userName')).findById(learner.learnerId).populate('programsPurchased');
//         res.render('learn/learner-dashboard',{
//             purchasedprograms:learnerDocument?.programsPurchased
//         });
//     }catch(error){
//         console.log(error);
//     }
// }
// export async function programPage(req:Request,res:Response){
//     try{
//         var isLogin = false;
//         if(req.cookies.authLearnerToken)
//         {
//             isLogin=true;
//         }
//         var creator = await authenticationController.getCreator(String(process.env.userId));
//         var program:Program|null = await programModel(res.get('userName')).findById(req.params.programId).populate({ 
//             path: 'modules',
//             populate: {
//               path: 'lessons',
//               model: 'lesson'
//             } 
//          });
//          if(!program)
//          {
//              res.send('error 404');
//          }
//         res.render('learn/view-program-page',{
//             program:program,
//             creator:creator,
//             isLogin:isLogin
//         });
//     }catch(error)
//     {
//         console.log(error);
//         res.send();
//     }
// }
// export async function programs(req:Request,res:Response){
//     try {
//         var programs = await programModel(res.get('userName')).find();
//         var learner = <learnerJWTInterface> jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
//         var learnerprograms:Learner|null = await learnerModel(res.get('userName')).findById(learner.learnerId).populate('programsPurchased');
//         res.render('learn/learner-programs',{
//             programs:programs,
//             purchasedprograms:learnerprograms?.programsPurchased            
//         });    
//     } catch (error) {
//         console.log(error);
//     }
// }
// // export async function purchaseprogram(req:Request,res:Response){
// //     try {
// //         var learner = <learnerJWTInterface>jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
// //         var program:Program|null = await programModel(res.get('userName')).findById(req.params.programId);
// //         var creator = await authenticationController.getCreator(learner.creatorId);
// //         var priceInSmallestUnit = program!.feeDetails!.price * 100;
// //         var metaData = new Map<String,any>();
// //         metaData.set('programId',program?._id);
// //         var kes:any = await razorpayController.createOrder(program!,
// //             'program',
// //             metaData,
// //             );
// //             var callbackURL = req.protocol+"//"+process.env.userWebsite+"/payment/razorpay/verifyPayment";
// //         res.render('payment',{
// //             key : process.env.KEYID,
// //             amount:priceInSmallestUnit,
// //             currency:(program?.feeDetails.currency as ICurrency).name,
// //             name:creator['firstName']+' '+creator['lastName'],
// //             description:program?.programTitle,
// //             image:"",
// //             orderId:kes.id,
// //             prefillName:"",
// //             prefillEmail:"",
// //             prefillContact:"",
// //             callbackURL:callbackURL
// //         });
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }
// export async function lesson(req:Request,res:Response){
//    var learner = <learnerJWTInterface>jsonwebtoken.verify(req.cookies.authLearnerToken,String(process.env.userId));
//    var purchasedprograms = await learnerModel(res.get('userName')).findById(learner.learnerId).select('programsPurchased');
//    console.log(purchasedprograms);
//    console.log(typeof req.params.programId);
//    if(purchasedprograms?.programsPurchased.includes(new mongoose.Types.ObjectId(req.params.programId))){
//        var lesson =  await lessonModel(res.get('userName')).findById(req.params.lessonId);
//        var program = await programModel(res.get('userName')).findById(req.params.programId).populate({ 
//            path: 'modules',
//            populate: {
//                path: 'lessons',
//                model: 'lesson'
//             } 
//         });
//         res.render('learn/video-lesson',{
//             lesson:lesson,
//             program:program
//         });   
//     }else{
//         res.redirect('/learn/purchaseprogram/'+req.params.programId)
//     }
// }
// // APIs
// export async function getPurchasedProgram(req:Request,res:Response){
//     try{
//         var programsPurchased = await learnerModel(res.get('userName')).findById(res.locals.get('user').userId,{programsPurchased:1}).populate('programsPurchased');
//         res.status(200).send(programsPurchased);
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
// export async function getPrograms(req:Request,res:Response){
//     try{
//         var programs:Program[] = await programModel(res.get('userName')).find({}).sort({_id:-1}).limit(20);
//         res.status(200).send(programs);
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
// export async function getProgramById(req:Request,res:Response){
//     try{    
//         var program:Program|null = await programModel(res.get('userName')).findById(req.params.programId);
//         if(program){
//             res.status(200).send(program);
//         }else{
//             res.status(404).send("program Not Found");
//         }
//     }catch(error){
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
// // export async function purchaseProgram(req:Request,res:Response){
// //     try{
// //         var program:Program|null = await programModel(res.get('userName')).findById(req.body.programId);
// //         await learnerModel(res.get('userName')).findByIdAndUpdate(res.locals.user.userId,{
// //             $addToSet:{programsPurchased:program?.id}
// //         });
// //         res.status(200).send();
// //     }catch(error){
// //         console.log(error);
// //         res.status(500).send(error);
// //     }
// // }
