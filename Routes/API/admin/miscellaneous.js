"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sendMailController_1 = require("../../../controller/mail/sendMailController");
var miscellaneous = (0, express_1.Router)();
miscellaneous.post('/websiteRequest', function (req, res) {
    try {
        (0, sendMailController_1.sendMailForWebsiteRequest)(req.body.domainName);
        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
});
module.exports.miscellaneous;
