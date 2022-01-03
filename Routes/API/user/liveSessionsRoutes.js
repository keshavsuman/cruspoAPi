"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var liveSessionRoutes = express_1.Router();
liveSessionRoutes.post("/getLiveSessions");
module.exports = liveSessionRoutes;
