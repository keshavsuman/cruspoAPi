"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorization_1 = require("../controller/google/authorization");
var authenticationRouter = express_1.Router();
authenticationRouter.get('/google', authorization_1.getAccessToken);
module.exports = authenticationRouter;
