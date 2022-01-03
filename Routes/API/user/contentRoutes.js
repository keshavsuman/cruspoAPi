"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contentRoutes = express_1.Router();
contentRoutes.post('/getContents');
module.exports = contentRoutes;
