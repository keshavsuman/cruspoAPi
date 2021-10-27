"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require('validator');
var validateSignup = function (req) {
    var valid = false;
    if (validator.isAlpha(req.body.lastName)) {
        valid = true;
    }
    else {
        console.log('invalid lastname');
    }
    if (validator.isAlpha(req.body.userName)) {
        valid = true;
    }
    else {
        console.log('invalid username');
    }
    if (validator.isEmail(req.body.email)) {
        valid = true;
    }
    else {
        valid = false;
        console.log('invalid email');
    }
    if (validator.isAlpha(req.body.firstName)) {
        valid = true;
    }
    else {
        valid = false;
        console.log('invalid firstname');
    }
    if (req.body.password.length != 0) {
        valid = true;
    }
    else {
        valid = false;
        console.log('invalid password');
    }
    return valid;
};
var validateLogin = function (req) {
    if (req.body.userName.length != 0 && req.body.password.length != 0) {
        return true;
    }
    else {
        return false;
    }
};
module.exports = {
    validateSignup: validateSignup,
    validateLogin: validateLogin
};
