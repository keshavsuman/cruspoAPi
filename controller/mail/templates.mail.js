"use strict";
// declare module 'templatesMail'; 
var welcome_learner_mail_suject = function (learnerName) { return "Welcome " + learnerName + ",you\u2019re now a part of our community"; };
var welcome_learner_mail = function (creatorName, creatorEmail, creatorNumber) { return "thank you for becoming a part of our community \nWe\u2019ll keep you posted on daily updates, news and special offers.\n\nFor any further query: \nIf you have any questions or concerns, feel free to contact me " + creatorName + " at " + creatorEmail + " or " + creatorNumber + "\n\nBest,\n" + creatorName + "\n"; };
var learner_register_for_creator_subject = function () { return "[Cruspo Community] New member added to your community"; };
var learner_register_for_creator = function () { return "Congratulations a new member has been added to your community \n    \nCheck details in your dashboard\nVisit Dashboard (best view in desktop)\n\nFor any further query email us on:\nnamaste@cruspo.com\n"; };
var form_submission_mail = function (formName, website, data) { return "You just got a form submission!\n        \nForm\n" + formName + "\n\nSite\n" + website + "\n\nSubmitted content\nFirst Name: " + data.firstName + "\nLast Name: " + data.lastName + "\nEmail: " + data.email + "\nContact Phone Number: " + data.contactNumber + "\nMessage: " + data.query + "\n"; };
var form_submission_mail_subject = function () { return "[Cruspo] You have a new form submission on your Cruspo site!"; };
var subscribe_mail_subject = function () { return "[Cruspo] You have a new form submission on your Cruspo site!"; };
var subscribe_mail = function (formName, website, data) { return "You just got a form submission!\n        \nForm\n" + formName + "\n\nSite\n" + website + "\n\nSubmitted content\nEmail: " + data.email + "\n"; };
var downloadForm_mail = function (learnerName, creatorWebsite, link, creatorMail) { return "hello " + learnerName + ",\n\nthank you for subscribing " + creatorWebsite + " and becoming the part of my members community\n\nI will update you with high-quality resources regularly that will help you to grow as a person\n\nheres is the link to download your copy of The flight to spritual awakening(e-book)_:-\n" + link + "\n\nin case of any queries or concerns feel free to contact me at " + creatorMail + "\n\nbest,\nishpreet kay"; };
var downloadForm_mail_subject = function () { return "The flight to spritual awakening(e-book)"; };
module.exports = {
    welcome_learner_mail: welcome_learner_mail,
    welcome_learner_mail_suject: welcome_learner_mail_suject,
    learner_register_for_creator: learner_register_for_creator,
    learner_register_for_creator_subject: learner_register_for_creator_subject,
    form_submission_mail: form_submission_mail,
    form_submission_mail_subject: form_submission_mail_subject,
    subscribe_mail: subscribe_mail,
    subscribe_mail_subject: subscribe_mail_subject,
    downloadForm_mail: downloadForm_mail,
    downloadForm_mail_subject: downloadForm_mail_subject
};
