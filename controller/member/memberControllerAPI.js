"use strict";
// import axios from "axios";
// import { Request,Response } from "express";
// import Mongoose from "mongoose";
// import groupModel, { Group } from "../../models/manageMember/groupModel";
// // import learnerModel,{Learner} from "../../models/manageMember/userModel";
// export async function getMembers(req:Request,res:Response){
//     try {
//         var learners:Learner[] = await learnerModel(res.get('userName')).find().sort({_id:-1}).limit(50);
//         res.status(200).send(learners);
//     } catch (error) {
//         console.log(error);
//         res.status(401).send(error);
//     }
// }
// export async function deleteLearner(req:Request,res:Response){
//     try {
//         await learnerModel(res.get('userName')).findByIdAndDelete(req.params.learnerId);
//         res.status(200).send();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send();
//     }
// }
// export async function updateLearner(req:Request,res:Response){
//     try {
//         var learner:Learner|null = await learnerModel(res.get('userName')).findById(req.params.learnerId);
//         if(learner)
//         {
//             learner.set('firstName',req.body.firstName??learner.firstName);
//             learner.set('lastName',req.body.lastName??learner.lastName);
//             learner.set('email',req.body.email??learner.email);
//             learner.set('status',req.body.status??learner.status);
//             learner.set('programsPurchased',req.body.purchasedCourses??learner.programsPurchased);
//             await learner.save();
//         }
//         res.status(201).send();
//     } catch (error) {
//         console.log(error);
//         res.status(401).send(error);
//     }
// }
// export async function addLearner(req:Request,res:Response){
//     try {
//         var member = await learnerModel(res.get('userName')).find({
//             email:req.body.email
//         });
//         if(member.length>0){
//             res.status(200).send({
//                 message:'ALREADY_EXISTS'
//             });
//             return 
//         }else{
//             const learnerResponse = await axios.post('http://localhost:2020/learner/get',{
//             select:{
//                 email:req.body.email
//             },
//             project:{
//                 firstName:1,
//                 lastName:1,
//                 email:1,
//                 password:1,
//                 }
//             },{
//                 headers:{
//                     'Content-type':'application/json'
//                 },
//             });
//             if(learnerResponse.data.length>0){
//                 await learnerModel(res.get('userName')).create({
//                     firstName:learnerResponse.data[0].firstName,
//                     lastName:learnerResponse.data[0].lastName,
//                     email:learnerResponse.data[0].email,
//                     password:learnerResponse.data[0].password,
//                     creatorId:res.get('_id'),
//                     learnerRefId:learnerResponse.data[0]._id
//                 })
//                 res.status(201).send({
//                     message:'USER_CREATED'
//                 });
//                 return 
//             }else{
//                 const response = await axios.post('http://localhost:2020/learner/signup',{
//                     firstName:req.body.fullName.split(' ')[0],
//                     lastName:req.body.fullName,
//                     email:req.body.email,
//                     password:req.body.password,
//                     creatorId:res.get('userName'),
//                 },{
//                     headers:{
//                         'Content-type':'application/json'
//                     }
//                 });
//                 if(response.status===201){
//                     await learnerModel(response.data.creator.userName).create({
//                         firstName:response.data.learner.firstName,
//                         lastName:response.data.learner.lastName,
//                         email:response.data.learner.email,
//                         password:response.data.learner.password,
//                         creatorId:response.data.creator._id,
//                         learnerRefId:response.data.learner._id
//                     });
//                     res.status(201).send({message:'USER_CREATED'})
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
// // Groups 
// export async function createGroup(req:Request,res:Response) {
//     try {
//         const group = await groupModel(res.get('userName')).create({
//             groupName:req.body.groupName   
//         });
//         if(req.body.fromExistingGroup){
//             await learnerModel(res.get('userName')).updateMany({groupsJoined: {$elemMatch: req.body.fromExistingGroup}},{$addToSet:{groupsJoined:group._id}});
//         }
//         res.status(201).send();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// }
// export async function updateGroup(req:Request,res:Response){
//     try {
//         var group:Group|null = await groupModel(res.get('userName')).findById(req.params.groupId);
//         if(group){
//             group.groupName = req.body.groupName;
//             await group.save();
//             res.status(200).send({message:"Group Updated"});
//         }else{
//             res.status(404).send({message:"Group Not Found"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(403).send({message:error});
//     }
// }
// export async function getGroups(req:Request,res:Response){
//     try{
//         var groups = await groupModel(res.get('userName')).find({});
//         res.send({
//             message:"",
//             data:groups
//         });
//     }catch(error){
//         res.status(500).send({
//             status:500,
//             message:error,
//             data:{}
//         })
//     }
// }
